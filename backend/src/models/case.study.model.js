const mongoose = require('mongoos');

const caseeStudySchema = new mongoose.Schema(
    {
        title: {
            type:String,
            required: [true, 'Title is required'],
            trim: true
        },
        industry: {
            type:String,
            trim: true
        },
        clientName:  {
            type:String,
            trim: true
        },challenge: {
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
    },
        
    { timestamps: true }

    
)

module.exports = mongoose.model('casestudy', caseeStudySchema);