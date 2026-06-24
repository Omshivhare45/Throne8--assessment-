const jwt = require('jsonwebtoken');
const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');

async function registerUser(req, res){
    try{
        console.log(req.body);
    const { email, password, username, name } = req.body;

    const exist = await userModel.findOne({
        $or:[
            {email},
            {username}
        ]
    })

    if(exist){
        return res.status(401).json({
            message:"Already registred"
        })
    }

    const hash = await bcrypt.hash(password, 10);

    const user = await userModel.create({ 
        email, password: hash, username    
    })

    const token = jwt.sign({
        id : user._id
    },process.env.JWT_SECRET_KEY);

    res.cookie('token', token);

    return res.status(200).json({
        message:"User registered successfully"
    })
    }catch(err){
    console.log("Registration error", err);
    return res.status(500).json({
        message:"Internal server error"
    })
}
}

async function loginUser(req, res){
    try{
    const{ email, password, username, name } = req.body;

    const user = await userModel.findOne({
        $or:[
            {email},
            {username}
        ]
    })

    if(!user){
        return res.status(401).json({
            message:"Invalid credentials"
        })
    }

    const ispasswordValid = await bcrypt.compare(password, user.password);

    if( !ispasswordValid){
        return res.status(401).json({
            message:"Inavlid email or password"
        })
    }

    const token = jwt.sign({
        id: user._id
    },process.env.JWT_SECRET_KEY);
    
    res.cookie("token", token);

    return res.status(200).json({
        message: "Login successful"
    });
}catch(err){
    console.log("login error: ", err);
    return res.status(500).json("Internal server error")
}

}
async function logoutUser(req, res) {
    res.clearCookie('token', token);
    return res.status(200).json({
        message: "Logged out successfully"
    })
}

module.exports= { registerUser, loginUser, logoutUser };