const express=require("express");
const request=express.Router();
const  {profileauth}=require("../middleware/auth");
const connectionRequest = require("../models/connectionRequest");
const User = require("../models/user"); // add this at top




request.post("/request/send/:status/:touserId",profileauth,async(req,res)=>{
    try {
        const SenderConnection=req.user._id;
        const RecieverConnection =req.params.touserId;
        const status=req.params.status;
        const isAllowed=["interested","ignored"];
        if(!isAllowed.includes(status)){
            return res.status(400).json({
                message:`send right status`
            });
        };
        const touser=await User.findById(RecieverConnection);
        if(!touser){
            return res.status(400).send("not user there");
        };

        // check if connection already exists
    const existingOne = await connectionRequest.findOne({
      $or: [
        { SenderConnection, RecieverConnection },
        { SenderConnection: RecieverConnection, RecieverConnection: SenderConnection },
      ],
    });

    // 🔹 CHANGED: block only if it already exists
    if (existingOne) {
      return res.status(400).send({
        message: "connection already exists",
      });

    
        }
        const coonnectionRequest=new connectionRequest({
            SenderConnection,
            RecieverConnection,
            status
        });
        const data= await coonnectionRequest.save();
        res.json({
            message:`the data has been send`,
            data

        })
        



        
    }
    catch (error) {
        res.status(400).send("ERROR THERE")
        
    }
    
});
module.exports=request;
