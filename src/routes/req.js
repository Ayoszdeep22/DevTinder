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


request.post("/request/review/:status/:requestId",profileauth, async(req,res)=>{
    try {
        const LoggedInUser=req.user;
        const{status,requestId}=req.params;
        const isAllowedStatus=["accepted","rejected"];
        if(!isAllowedStatus.includes(status)){
           if (!isAllowedStatus.includes(status)) {
  return res.status(400).json({ message: "Invalid status. Use 'accepted' or 'rejected'." });
}

        };
        const connectionRequests=await connectionRequest.findOne({
            _id:requestId,// checking wheteher the reuqest is valid or not 
            RecieverConnection:LoggedInUser._id,
            status:"interested",

        });
        if(!connectionRequests){
            return res.status(404).json({message:"connection request is not valid "});
        };
        connectionRequests.status=status;
        const data=await connectionRequests.save(); 
        res.status(200).json({ message: "successful data", data });









        
    }  catch(error) {
  console.error("REVIEW ERR:", error);
  return res.status(500).json({ message: "Unable to review request", error: error.message });
}




});


module.exports=request;
