const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, 
  },
  slug:{
    type:String,
    required:true,
    unique: true,
    lowercase: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
  },
  businessproblem:{
    type:String,
    required: true,

  },
  features: {
    type: [String],
    default:[]
  },
  techStack: {
    type: [String],  
    required: true,
  },
  results:{
    type:String,
  },
  githubUrl: {       
    type: String,
    required:true,
  },
  liveurl:{
    type:String,
  },
  screenshots:{
    type:String
  },
  solution:{
    type:String,
    required: true,
  },industry:{
    type: String,
    enum:[ "Healthcare", "Education", "FinTech", "E-Commerce", "Logistics", "Real Estates", "Saas", "startups", "Enterprise business"],
  },
  status:{
    type:String,
    enum:['published', 'draft'],
    default: 'draft'
  },completedAt:{
    type:Date,
  }
}, { timestamps: true });


projectSchema.index({ featured: 1, status: 1 });
projectSchema.index({ industry: 1 });

module.exports = mongoose.model('project', projectSchema);