const mongoose = require('mongoose');

const caseeStudySchema = new mongoose.Schema(
    {
        title: {
            type:String,
            required: [true, 'Title is required'],
            trim: true
        },
        challenge: {
            type: String,
            required: [true, 'Challenge description is required'],
        },
        solution: {
            type: String,
            required: [true, 'Solution description is required'],
        },
        implementationProcess: {
            type: String,
        },
        technologies: {
            type: [String],
            default: [],
        },
        businessImpact: {
            type: String,
        },
        thumbnail: {
            type: String,
        },
        status: {
            type: String,
            enum: ['draft', 'published'],
            default: 'draft',
        },
        performanceMetrics: {
            revenueGrowth: Number,
            userRetention: Number,
            conversionRate: Number,
            customerSatisfaction: Number,
            responseTime: Number,
            uptime: Number
  }
    },
        
    { timestamps: true }

    
)

module.exports = mongoose.model('casestudy', caseeStudySchema);