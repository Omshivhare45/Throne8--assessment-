const Testimonials = require('../models/testimonial.model');

const getAllTestimonials = async (req, res) => {
    try{
        const query = { approved: true };
        if( req.query.feature === 'true' ) query.featured = true;
        const testimonials = await Testimonials.find(query).sort({
            createdAt: -1
        });
        return res.status(200).json({ testimonials });
    }catch(err){
        console.log("fetch testimonial error : ", err);
        return res.status(500).json({
            message:"Server error"
        })
    }
}

const adminGetAllTestimonials = async (req, res) => {
    try{
        const testimonials  =await Testimonials.find().sort({
            createdAt : -1
        });
        return res.status(200).json({
            testimonials
        });
    }catch(err){
        console.log("admin fetch testimonial error : ", err);
        return res.status(500).json({
            message:"server error"
        })
    }
}

const createTestimonial = async (req, res) => {
    try{
        const testimonial = await Testimonials.create(req.body);
        return  res.status(201).json({
            message:"testimonial created", testimonial
        });
    }catch(err){
        console.log("testimonial creation error : ", err);
        return res.status(500).json({
            message:"Server error"
        })
    }
}

const updateTestimonial = async (req, res) => {
    try{
        const testimonial = await Testimonials.findByIdAndUpdate(req.params.id, req.body);
        if(!testimonial){
            return res.status(200).json({
                message:"NOt found"
            })
        }
        return res.status(200).json({
            message:"Updated", testimonial
        })
    }catch(err){
        console.log("updation testimonial error : ", err);
        return res.status(500).json({
            message:"server error"
        });
    }
}

const approveTestimonial = async (req, res) => {
    try{
        const testimonial = await Testimonials.findByIdAndUpdate(req.params.id, req.body, {new: true});
        if( !testimonial ){
            return res.status(200).json({
                message:"not found"
            })
        }
        return res.status(200).json({
            message:"Approved", testimonial
        })
    }catch(err){
        console.log("Approve error : ", err);
        return res.status(500).json({
            message:"Server error"
        })
    }
}

const deleteTestimonial = async (req, res) => {
    try{
        const t = await Testimonials.findByIdAndDelete(req.params.id);
        if( !t ) return res.status(404).json({
            messagee:"Not found"
        });
        return res.status(500).json({
            message:"Server error"
        })
    }catch(err){
        console.log("Deletion testimonial error : ", err);
        return res.status(500).json({
            message:"Server error"
        })
    }
}

module.exports = { getAllTestimonials, adminGetAllTestimonials, createTestimonial, updateTestimonial, approveTestimonial, deleteTestimonial};
