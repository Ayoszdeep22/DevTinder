const express = require("express");
const { profileauth } = require("../middleware/auth");
const connectionRequest = require("../models/connectionRequest");
const User = require("../models/user");
const userRouter = express.Router();

// Get all pending connection requests for logged in user
userRouter.get("/user/request/received", profileauth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    
    const connectionRequests = await connectionRequest.find({
      RecieverConnection: loggedInUser._id,
      status: "interested"
    }).populate("SenderConnection", ["firstName", "lastName"]);
    
    res.status(200).json({ 
      message: "Data fetched successfully", 
      data: connectionRequests 
    });
  } catch (error) {
    console.error("GET /user/request/received ERR:", error);
    res.status(500).json({ 
      message: "Internal server error",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});
  
// Get people who are connected to me
userRouter.get("/user/connections", profileauth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    
    const connectionRequests = await connectionRequest.find({
      $or: [
        { RecieverConnection: loggedInUser._id, status: "accepted" },
        { SenderConnection: loggedInUser._id, status: "accepted" }
      ]
    }).populate("SenderConnection", ["firstName", "lastName", "age"])
      .populate("RecieverConnection", ["firstName", "lastName", "age"]);

    // FIX: The logic was inverted - return the OTHER person, not yourself
    const data = connectionRequests.map((row) => {
      // If I'm the sender, return the receiver
      if (row.SenderConnection._id.toString() === loggedInUser._id.toString()) {
        return row.RecieverConnection;
      }
      // If I'm the receiver, return the sender
      return row.SenderConnection;
    });

    res.status(200).json({ data });
  } catch (error) {
    console.error("GET /user/connections ERR:", error);
    res.status(500).json({ message: error.message });
  }
});

// Feed API - get users to potentially connect with
userRouter.get("/feed", profileauth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    
    // Get all connection requests involving the logged-in user
    const connectionRequests = await connectionRequest.find({
      $or: [
        { SenderConnection: loggedInUser._id },
        { RecieverConnection: loggedInUser._id }
      ]
    }).select("SenderConnection RecieverConnection");

    // Build set of user IDs to exclude (people already connected/requested)
    const excludeUsers = new Set();
    connectionRequests.forEach(request => {
      excludeUsers.add(request.SenderConnection.toString());
      excludeUsers.add(request.RecieverConnection.toString());
    });

    // Find users not in the exclude list and not the logged-in user
    const users = await User.find({
      $and: [
        { _id: { $nin: Array.from(excludeUsers) } },
        { _id: { $ne: loggedInUser._id } }
      ]
    }).select("firstName lastName age skills about");

    res.status(200).json({ 
      message: "Feed data fetched successfully",
      data: users 
    });
  } catch (error) {
    console.error("GET /feed ERR:", error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = userRouter;