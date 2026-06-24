const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, 
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
    required: true,
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
  }
}, { timestamps: true });

module.exports = mongoose.model('project', projectSchema);