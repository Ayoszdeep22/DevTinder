const express=require("express");
const request=express.Router();

const  {profileauth}=require("../middleware/auth");

request.get("/connectionReq",profileauth,(req,res)=>{
    console.log("Profileauth is succesfulul authenticated");
    const user =req.user;
    res.send(user.firstName  +  "this is how to use jwt token");
    
})
module.exports=request;
