const express=require("express");
const authRouter=express.Router();
const {validatorcheck} = require("../utils/validator");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const validator = require("validator");

authRouter.post("/signup", async (req, res) => {
    console.log(req.body);



    try {
        const postvalidation = ["firstName", "lastName", "emailId", "password"];
        const hasAllFields = postvalidation.every(field => field in req.body);

        if (!hasAllFields) {
            throw new Error("Please include firstName, lastName, emailId, and password");
        }

       
        const { firstName, lastName, emailId, password,age } = req.body;
        const passwordHash = bcrypt.hashSync(password, 10);

        const user = new User({
            firstName,
            lastName,
            emailId: emailId.trim().toLowerCase(),
            password: passwordHash, 
            age
}); 
        validatorcheck(req);

        await user.save();
        res.send("user Added succesfully");

    } catch (error) {
        console.log("user does not have added succesfully");
      
        res.status(400).send("Error: " + error.message);
    }
});


authRouter.post("/login", async (req, res) => {
  try {
    const { password, emailId } = req.body;
 
    if (!validator.isEmail(emailId)) {
      return res.status(400).send("Invalid email format");
    }
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      return res.status(400).send("Email id not found");
    }
    const passwordcheck= await user.validatePassword(password);
    if (passwordcheck) {
        const token = await user.getJWT();
        res.cookie("token",token);
        res.send("login successful"); 
    } else {
      res.status(400).send("Incorrect password");
    }
} catch (error) {
    console.error(error);
    res.status(400).send("Error: " + error.message);
  }
});

authRouter.post("/logout",async (req,res)=>{
    res.cookie("token",null,{expires:new Date(Date.now())});
    res.send("logout succesful");

})
module.exports = authRouter;