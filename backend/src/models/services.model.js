const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim: true
    },
    slug:{
        type:String,
        required:true
    },
    description:{
        type:String
    },
    icon :String,

    image:String,

    features:{
        type:[String]
    },
}, { timestamps: true }
)

module.exports = mongoose.model("services", serviceSchema);