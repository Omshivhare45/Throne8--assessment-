const Blog = require('../models/blog.model');
const slugify = require('slugify');

const getAllBlogs = async (req, res) => {
  try {
    const { page = 1, limit = 10, tag, category, search } = req.query;
    const query = { status: 'published' };
 
    if (tag)      query.tags = tag;
    if (category) query.category = category;
    if (search)   query.title = { $regex: search, $options: 'i' };
 
    const total = await Blog.countDocuments(query);
    const blogs = await Blog.find(query)
      .populate('author', 'name')
      .sort({ publishedAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .select('-content');
 
    return res.status(200).json({
      blogs,
      pagination: { total, page: Number(page), pages: Math.ceil(total / limit) },
    });
  } catch (err) {
    return res.status(500).json({ message: 'Server error' });
  }
};


const getBlogBySlug = async (req, res) => {
    try{
        const blog = await Blog.findOne({ 
            slug: req.params.slug,
            status: 'published'
        }).populate('author', 'name');

        if( !blog ){
            return res.status(404).json({
                mesage:"NO posts found"
            })
        }

        blog.views += 1;
        await blog.save();
        
        return res.status(200).json({
            blog
        })
    }catch(err){
        console.log("BLog error : ", err );
    }
}

 const createBlog = async (req, res) => {
        try{

        
              const { title, content, thumbnail, tags, category, description , status} = req.body;

              if( !title || !content ){
                return res.status(400).json({
                    message:"Title and content required"
                })
              }

              const slug = slugify(title, { 
                    lower: true, strict: true
                })

            const exists = await Blog.findOne({ slug });
                 if (exists) return res.status(409).json({ message: 'A post with this title already exists' });
                
                 console.log(req.user);

            const blog = await Blog.create({
                title, content, thumbnail, slug ,tags, category, status, description ,
                author: req.user.id,
     });

     return res.status(201).json({
        message:"Blog created", blog
     });
        }catch(err){
            console.log("Blog creation error : ", err );
        }
    }

const adminGetAllBlogs = async (req, res) => {
    try{
        const blogd = await Blog.find()
        .populate('author', 'name')
        .sort({ createdAt: -1 });

        return res.status(200).json({ blogs });
    }catch(err){
        console.log("admin blog fetch error : ", err);
        return res.status(500).json({ message:" Internal server error "});
    }
}

const updateBlog = async ( req, res ) => {
    try{
        const blog= await Blog.findById(req.params.id);
        if( !blog ){
            return res.status(404).json({
                message:"Blog not found"
            });
        }

        const { title, content, thumbnail, tags, category, status } = req.body;
        
        if (title && title !== blog.title) {
            const newSlug = slugify(title, { lower: true, strict: true });
            const clash = await Blog.findOne({ slug: newSlug, _id: { $ne: blog._id } });
                if (clash) return res.status(409).json({ message: 'A post with this title already exists' });
                    blog.slug = newSlug;
                    blog.title = title;
        }

        if (content)  blog.content = content;
        if (thumbnail !== undefined) blog.thumbnail = thumbnail;
        if (tags)     blog.tags = tags;
        if (category) blog.category = category;

        if( status && status !== blog.status ){
            blog.status = status;
            if( status === 'published' && !blog.publishedAt){
                blog.publishedAt = new Date();
            }
        }

        await blog.save();

        return res.status(200).json({
            message:"Blog updated", blog
        });
    }catch(err){
        console.log("Blog update error : ", err)
            return res.status(500).json({
                message:"Server error"
            });
        
    }
}

const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) return res.status(404).json({ message: 'Blog not found' });
    return res.status(200).json({ message: 'Blog deleted' });
  } catch (err) {
    return res.status(500).json({ message: 'Server error' });
  }
};


module.exports = { getAllBlogs, getBlogBySlug, createBlog, adminGetAllBlogs, updateBlog, deleteBlog };
