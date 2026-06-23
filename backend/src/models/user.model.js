const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        // required:true,
    },
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minlength: 6,
    },
    role:{
        type:String,
        enum:["user", "admin"],
        default:"user",
        required:true
    }
})

module.exports = mongoose.model("user", userSchema);