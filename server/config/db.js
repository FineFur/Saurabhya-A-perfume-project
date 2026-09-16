const mongoose = require("mongoose");

async function connectDB(){
    try{
        await mongoose.connect(
            "mongodb://localhost:27017/saurabhya"
        );
     console.log("MongoDB connected successfully !");
    }catch(err){
        console.err("MongoDB connected successfully");
        console.err(err.message);
        process.exit(1);
    }
}
module.exports = connectDB;