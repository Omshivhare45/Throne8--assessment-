const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  name:{ 
    type: String, 
    required: true },
  slug:{ 
    type: String, 
    required: true, 
    unique: true, 
    lowercase: true, 
    trim: true 
  },
  description:{ 
    type: String, 
    required: true 
  },
  businessproblem:{ 
    type: String, 
    required: true 
  },
  solution:{ 
    type: String, 
    required: true 
  },
  features:{ 
    type: [String], 
    default: [] 
  },
  techStack:{ 
    type: [String], 
    required: true 
  },
  screenshots:{ 
    type: [String], 
    default: [] 
  }, 
  results:{ type: String },
  githubUrl:{ type: String },
  liveurl: { type: String },
  industry: {
    type: String,
    enum: ['Healthcare','Education','FinTech','E-Commerce','Logistics','Real Estate','SaaS','Startup','Enterprise','Other'],
  },
  featured: { type: Boolean, default: false }, 
  status:   { type: String, enum: ['published','draft'], default: 'draft' },
  completedAt: { type: Date },
}, { timestamps: true });

projectSchema.index({ featured: 1, status: 1 });
projectSchema.index({ industry: 1 });

module.exports = mongoose.model('Project', projectSchema);