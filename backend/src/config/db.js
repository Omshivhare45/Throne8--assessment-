const mongoose = require('mongoose');

async function connectDB(){
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Cuccesssfully connected to Database");
    }catch(err){
        console.log("DB connection Error : ", err);
    }
}

module.exports = connectDB;