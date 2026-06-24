const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
    career:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Career',
        required:true,
    },
    name:{
        type:String,
        required:true,
        trim: true
    },email:{
        type:String,
        unique:true,
        lowercase:true,
        trim:true,
        match:[/^\S+@\S+\.\S+$/, 'Please enter a valid email'],
        required:true
    },phone:{
        type:String,
        trim:true,
    },
    resumeUrl:{
        type:String,
        required:[true, 'Resume is required'],
    },portfolioUrl:{
        type:String,
        trim: true,
    },linkedinUrl:{
        type:String,
        trim: true,
    },status:{
        type:String,
        enum:['received', 'reviewing', 'shortlisted', 'rejected', 'hired'],
        default: 'received',
    }
},{timestamps: true});

module.exports = mongoose.model("Application", applicationSchema);