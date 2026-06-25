const Testtimonial = require('../models/testimonial.model');

const getAllTestimonials = async( req, res ) => {
    try{
        const query = { approved : true };
        if( req.query.featured === 'true' ) query.featured = true;
        const testimonilas = await testimonialModel.find(query).sort({
            createdAt: -1
        });
        return res.status(200).json({
            testimonilas
        });
    }catch(err){
        console.log("testimonial error : ", err);
        return res.status(500).json({
            messag:"Server error"
        })
    }
}


const adminGetAllTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find().sort({ createdAt: -1 });
    return res.status(200).json({ testimonials });
  } catch (err) { return res.status(500).json({ message: 'Server error' }); }
};