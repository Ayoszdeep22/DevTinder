const mongoose= require("mongoose");
const connectDB=async()=>{
await mongoose.connect("mongodb+srv://DEVtinder:Ayosz2204@devtinder.tlpzngp.mongodb.net/devtinder");
};

module.exports=connectDB; 


                