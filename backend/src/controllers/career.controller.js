const Career = require("../models/career.model");

const getAllCareers = async (req, res) => {
    try{
        const{ department, type } = req.query;
        const query = { status: 'open' };

        if( department )query.department = department;
        if( type ) query.type = type;

        const careers = (await Career.find(query)).toSorted({ createdAt: -1 });

        return res.status(200).json({
            careers
        });
    }catch(err){
        return res.status(500).json({
            message: "server error"
        });
    };
}

const getCareerById = async (req, res) => {
    try {
        const career = await Career.findOne({ _id: req.params.id, status: 'open' });
        if (!career) return res.status(404).json({ message: 'Position not found or closed' });
        return res.status(200).json({ career });
    } catch (err) {
        return res.status(500).json({ message: 'Server error' });
    }
};

const applyForCareer = async (req, res) => {
    try{
        const career = await Career.findOne({
            _id : req.params.id, status: 'open'
        });

        if( !career ){
            return res.status(404).json({
                message:"No more hiring for this position"
            })
        }

        const { name, email, phone, coverLetter, portfolioUrl, linkedinUrl } = req.body;

        if( !name || !email ){
            return res.status(400).json({
                message:"Name and email are required"
            })
        }

        const resumeUrl = req.file?.location;
            if (!resumeUrl) {
                return res.status(400).json({ message: 'Resume is required' });
            }      
            
        const duplicate = await Application.findOne({ career: career._id, email });
            if (duplicate) {
            return res.status(409).json({ message: 'You have already applied for this position' });
        }

        const application = await Application.create({
            career: career._id, name, email, phone, resumeUrl, coverLetter, portfolioUrl, linkedinUrl,
        });

        return res.status(201).json({ message: 'Application submitted successfully!', application });
    }catch(err){
        console.log("Career Applcation error : ", err);
        return res.status(500).json({
            message:"Internal server error"
        })
    }
}

const createCareer = async (req, res) => {
        try {
            const career = await Career.create(req.body);
            return res.status(201).json({ message: 'Career listing created', career });
        } catch (err) {
            console.log("Job creation error : ", err);
            return res.status(500).json({ message: 'Server error' });
        }
};

module.exports = { applyForCareer, getAllCareers, createCareer, getCareerById };