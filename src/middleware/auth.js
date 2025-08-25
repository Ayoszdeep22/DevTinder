// earlier lec

// const User = require("../models/user");

// const Adminauth=(req,res,next)=>{
//     console.log("Admin auth is checking");
    
//     const token ="xyz";
//     const ifauthorized=token==="xyz";
//     if(!ifauthorized){
//         res.status(401).send("unuthorized acess");

//     }
//     else{
//         next();
//     }

// };

const jwt = require("jsonwebtoken");

const Useer=require("../models/user");

const profileauth= async (req,res,next)=>{
    //read the token from the user 
       // validate the token
    //find the username
    try {
        const readcookie=req.cookies;
    const {token}=readcookie;
    if(!token){
        throw new Error("token not found");
        

    }
    const verifyToken= await jwt.verify(token,"DEVtinder@123");
    const {_id}=verifyToken;
    const user= await Useer.findById(_id);
    if(!user){
        throw new Error("user not found");
        
    }
    req.user=user; 
    next();

        
    } catch (error) {
        res.status(404).send("error is there");
        
    }
    





 

 

};
module.exports={
    profileauth
}