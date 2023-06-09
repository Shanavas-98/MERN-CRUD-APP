const mongoose = require('mongoose');
require('dotenv').config()

const connectDB = async()=>{
    try{
        mongoose.set('strictQuery', false);
        const db = await mongoose.connect(process.env.MONGO_URI,{
            useUnifiedTopology:true,
            useNewUrlParser:true
        })
        console.log("mongoDB connected:",db.connection.host);
    }catch(err){
        console.error(`Error:${err.message}`);
        process.exit();
    }
}

module.exports = connectDB