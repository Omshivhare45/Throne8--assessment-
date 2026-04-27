import dotenv from 'dotenv';
import connectDB from './db/db.js';

dotenv.config({
    path: './.env'
})

 

 connectDB();


//  ( async () => {
//     try{
//         await mongoose.connect(`${process.env.MONGODB_URI}/{DB_NAME}`)
//         app.on("error", (error) => {
//             console.log("err", error);
            
//         })

//         app.listen(process.env.PORT, () => {
//             console.log(`server started on port ${process.env.PORT}`);
//         })

//     } catch(e){
//         console.log("mama error hai n ", e);
//         throw e;
//     }
//  })(); 