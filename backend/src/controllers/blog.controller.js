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
            return res.status(401).json({
                mesage:"NO posts found"
            })
        }

        blog.view += 1;
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

    





module.exports = { getAllBlogs, getBlogBySlug, createBlog };
