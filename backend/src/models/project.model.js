const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    name:{
        type: String,
        requied:true,
    },
    description:{
        type:String,
        required:true,
    },
    features:{
        type:String,
        required:true,
    },techstack:{
        type:String,
        required:true,
        GithubURL: true
    }
})

module.exports = mongoose.model("projects", projectSchema);