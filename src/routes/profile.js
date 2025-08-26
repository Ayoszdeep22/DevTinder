const express=require("express");
const profileRouter=express.Router();
const {ValidateprofileEditData}=require("../utils/validator")


const  {profileauth}=require("../middleware/auth");

profileRouter.get("/profile/view",profileauth, async (req, res) => {
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



profileRouter.patch("/profile/edit",profileauth,async(req,res)=>{
try {
    if(!ValidateprofileEditData(req)){
        throw new Error("u want more user data to edit ");
        
    }
   const loggedInUser=req.user;
    // changing the values
    Object.keys(req.body).forEach(j=>loggedInUser[j]=req.body[j]);
   await loggedInUser.save();
    
    res.send(`${loggedInUser.firstName},  user updated succesfully`);


    
} catch (error) {
    res.status(404).send("ERROR : "+error.message);
    
}

});


module.exports=profileRouter;
    
