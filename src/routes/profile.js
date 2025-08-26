const express=require("express");
const profileRouter=express.Router();


const  {profileauth}=require("../middleware/auth");

profileRouter.get("/profile",profileauth, async (req, res) => {
try{ 
    const user =req.user;
if (!user) {
    throw new Error("user not found");}
    res.send(user);

}
 catch (error) {
    console.error(error);
    res.status(400).send("Error: " + error.message);
  }

});





module.exports=profileRouter;
