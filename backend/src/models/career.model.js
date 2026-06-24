const mongoose = require('mongoose');
const careerSchema = new mongoose.Schema(
    {
    title: {
      type: String,
      required: [true, 'Job title is required'],
      trim: true,
    },
    department: {
      type: String,
      required: [true, 'Department is required'],
      enum: ['Engineering', 'Design', 'Marketing', 'Sales', 'HR', 'Operations'],
    },
    type: {
      type: String,
      required: true,
      enum: ['Full-Time', 'Part-Time', 'Contract', 'Internship', 'Freelancing'],
    },
    location: {
      type: String,
      default: 'On-site',
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Job description is required'],
    },
    requirements: {
      type: [String], 
      default: [],
    },
    responsibilities: {
      type: [String],
      default: [],
    },
    skills: {
      type: [String], 
      default: [],
    },
    salaryRange: {
      type: String, 
      trim: true,
    },
    status: {
      type: String,
      enum: ['open', 'closed', 'paused'],
      default: 'open',
    },
    applicationDeadline: {
      type: Date,
    },

 
}, { timestamps: true }
);

careerSchema.index({ status: 1, department: 1 });

module.exports = mongoose.model("Career", careerSchema);