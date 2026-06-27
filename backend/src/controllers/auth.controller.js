const jwt = require('jsonwebtoken');
const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');

async function registerUser(req, res){
    try{
    const { email, password, username, name } = req.body;

    const exist = await userModel.findOne({
        email
    })

    if(exist){
        return res.status(401).json({
            message:"Already registred"
        })
    }

    const hash = await bcrypt.hash(password, 10);

    const user = await userModel.create({ 
        name, email, password: hash, username    
    })

    const token = jwt.sign({
        id : user._id,
        role:user.role
    },process.env.JWT_SECRET_KEY, {
        expiresIn: '7d'
    });

    res.cookie('token', token, {
        httpOnly: true,
        secure: false,
        sameSite: 'lax'
    });

    return res.status(200).json({
        message:"User registered successfully",

         accessToken : token,

        user:{
            _id: user._id,
            name: user.name,
            username: user.username,
            email: user.email,
            role: user.role
        }
    })
    }catch(err){
    console.error(err);
    return res.status(500).json({
        message:"Internal server error"
    })
}
}

async function loginUser(req, res){
    try{
    const{ email, password } = req.body;

    const user = await userModel.findOne({
        email
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
        id: user._id,
        role: user.role
    },process.env.JWT_SECRET_KEY, {
        expiresIn: '7d'
    });
    
    res.cookie("token", token, {
        httpOnly: true,
        secure: false,
        sameSite: 'lax'
    });

    return res.status(200).json({
        message: "Login successful",

        accessToken : token,

        user:{
            _id: user._id,
            name: user.name,
            username: user.username,
            email: user.email,
            role: user.role
        }
    });
}catch(err){
    console.error(err);
    return res.status(500).json("Internal server error")
}

}
async function logoutUser(req, res) {
    res.clearCookie('token');
    return res.status(200).json({
        message: "Logged out successfully"
    })
}

module.exports= { registerUser, loginUser, logoutUser };