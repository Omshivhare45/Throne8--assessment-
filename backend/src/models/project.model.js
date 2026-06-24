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
  features: {
    type: [String],
    required: true,
  },
  techStack: {
    type: [String],  
    required: true,
  },
  githubUrl: {       
    type: String,
  },
  
}, { timestamps: true });

module.exports = mongoose.model('project', projectSchema);