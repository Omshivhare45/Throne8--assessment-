const mongoose = require('mongoose');

async function connectDB(){
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Successfully connected to Database");
    }catch(err){
        console.log("DB connection Error : ", err);
        process.exit(1);
    }
}

module.exports = connectDB;