const CaseStudy = require("../models/case.study.model");

const slugify = require("slugify");

const getAllCaseStudies = async ( req, res ) => {
    try{
        const studies = await CaseStudy.find({
            status : 'published'
        }).sort({ createdAt: -1 }).select('-implementationProcess');
        return res.status(200).json({studies});
    }catch(err){
        console.log("casestudy fetch error : ", err);
        return res.status(500).json({message:"server error"})
    }
}

const getCaseStudyBySlug = async (req, res) => {
    try{
        const study = await CaseStudy.findOne({
            slug: req.params.slug, status: 'published'
        })

        if( !study )return res.status(404).json({
            message:"Case study not found"
        })

        return res.status(200).json({
            study
        }
        );
    }catch(err){
        console.log("case fetch by slug error : ", err);
        return res.status(500).json({
            message:"Server error"
        });
    }
}

const createCaseStudy = async (req,res) => {
    try{
        const slug = slugify( req.body.title, {
            lower:true
        }) 
        const exists = await CaseStudy.findOne({
            slug 
        });

        if( exists )return res.status(409).json({
            message:"title exists"
        })

        const study = await CaseStudy.create({
            ...req.body, slug
        });

        return res.status(201).json({
            message:"Case study created", study
        })
    }catch(err){
        console.log("Creation cs error : ", err);
        return res.status(500).json({
            message:"Server error"
        })
    }
}

const updateCaseStudy = async(req,res) => {
    try{
        const study = await CaseStudy.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true});
        if( !study )return res.status(404).json({
            message:"not found"
        })

        return res.status(200).json({
            message:"Updated", study
        })
    }catch(err){
        console.log("casestudyUpdation error : ", err);
        return res.status(500).json({
            mesage:"Server error"
        })
    }
}

const deleteCaseStudy = async (req, res) => {
    try{
        const study = await CaseStudy.findByIdAndDelete(req.params.id);
        if(!study) return res.status(404).json({
            message : "not found"
        })

        return res.status(200).json({
            message:"deleted"
        })
    }catch(err){
        console.log("cs deletion error : ", err);
        return res.status(500).json({
            message:"Server error"
        })
    }
}

const adminGetAllCaseStudies = async ( req, res ) => {
    try{
        const studies = await CaseStudy.find().sort({
            createdAt: -1
        });
        return res.status(200).json({
            studies
        })
    }catch(err){
        console.log("admin cs fetch error : ", err);
        return res.status(500).json({
            message:"Server error"
        })
    }
}

module.exports = { getAllCaseStudies, getCaseStudyBySlug, createCaseStudy, updateCaseStudy, deleteCaseStudy, adminGetAllCaseStudies };