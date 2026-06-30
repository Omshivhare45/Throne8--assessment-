const Career = require("../models/career.model");
const Application = require('../models/application.model');

const getAllCareers = async (req, res) => {
    try{
        const{ department, type } = req.query;
        const query = { status: 'open' };

        if( department )query.department = department;
        if( type ) query.type = type;

        const careers = await Career.find(query).sort({ createdAt: -1 });

        return res.status(200).json({
            careers
        });
    }catch(err){
        console.log("getcareer error : ", err);
        return res.status(500).json({
            message: "server error"
        });
    };
}

const adminGetAllCareers = async (req, res) => {
    try {
        const { department, type, status } = req.query;
        const query = {};

        if (department) query.department = department;
        if (type)       query.type = type;
        if (status)     query.status = status;

        const careers = await Career.find(query).sort({ createdAt: -1 });

        return res.status(200).json({ careers });
    } catch (err) {
        console.error("adminGetAllCareers error : ", err);
        return res.status(500).json({ message: "Server error" });
    }
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

        const { resumeUrl } = req.body;
            if (!resumeUrl) {
                return res.status(400).json({ message: 'Resume is required' });
            }      
            
        const duplicate = await Application.findOne({ career: career._id, email });
            if (duplicate) {
            return res.status(409).json({ message: 'You have already applied for this position' });
        }
        console.log("Career ID:", req.params.id);
    console.log("Request Body:", req.body);

        const application = await Application.create({
            career: career._id, name, email, phone, resumeUrl, coverLetter, portfolioUrl, linkedinUrl,
        });
        console.log("Saved Application:", application);

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

const updateCareer = async (req, res) => {
  try {
    const career = await Career.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!career) return res.status(404).json({ message: 'Career not found' });
    return res.status(200).json({ message: 'Career updated', career });
  } catch (err) {
    return res.status(500).json({ message: 'Server error' });
  }
};

const deleteCareer = async (req, res) => {
  try {
    const career = await Career.findByIdAndDelete(req.params.id);
    if (!career) return res.status(404).json({ message: 'Career not found' });
    // Also delete all related applications
    await Application.deleteMany({ career: req.params.id });
    return res.status(200).json({ message: 'Career and its applications deleted' });
  } catch (err) {
    return res.status(500).json({ message: 'Server error' });
  }
};

const getApplicationsByCareer = async (req, res) => {
  try {
    const { status } = req.query;
    const query = { career: req.params.id };
    if (status) query.status = status;
 
    const applications = await Application.find(query).sort({ createdAt: -1 }).populate('career');
    return res.status(200).json({ applications });
  } catch (err) {
    return res.status(500).json({ message: 'Server error' });
  }
};

const updateApplicationStatus = async (req, res) => {
  try {
    const { status, adminNote } = req.body;
    const application = await Application.findByIdAndUpdate(
      req.params.id,
      { status, adminNote },
      { new: true, runValidators: true }
    );
    if (!application) return res.status(404).json({ message: 'Application not found' });
    return res.status(200).json({ message: 'Status updated', application });
  } catch (err) {
    return res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { applyForCareer, getAllCareers, adminGetAllCareers, createCareer, getCareerById, updateCareer, deleteCareer, getApplicationsByCareer, updateApplicationStatus };