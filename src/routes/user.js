const express = require("express");
const { profileauth } = require("../middleware/auth");
const connectionRequest = require("../models/connectionRequest");
const userRouter = express.Router();

// get all the pending connections request for logged in user
userRouter.get("/user/request/recieved", profileauth, async (req, res) => {
  try {
    const LoggedInUser = req.user;
    // find is used to return result in an array
    const connectionRequests = await connectionRequest.find({
      RecieverConnection: LoggedInUser._id,
      status:"interested"
    }).populate("SenderConnection",["firstName","lastName"]);
    // use 200 for success
    res.status(200).json({ message: "data fetched successfully", data: connectionRequests });
  } catch (error) {
    console.error("GET /user/request ERR:", error);
    // 500 internal server error is appropriate here
    res.status(500).send("error found");
  }
});

// people who are connected to me
userRouter.get("/user/connections", profileauth, async(req,res)=>{
  try {
    const LoggedInUser=req.user;
    const connectionRequests= await  connectionRequest.find({
      $or:[
        {RecieverConnection:LoggedInUser._id,status:"accepted"},
         {SenderConnection:LoggedInUser._id,status:"accepted"},

      ]
    

    });
      res.json({data:connectionRequests});
  } catch (error) {
    res.status(404).send({message:error.message});
  }
});

module.exports = userRouter;
