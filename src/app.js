const express=require("express");
const connectDB=require("./config/database");
const app=express(); 
const User=require("./models/user")
app.post("/signup",async(req,res)=>{ 
    const userObj={
        firstName:"ashish",
        lastName:"pandey",
        emailId :"aashishpandey@gmail.com",
        password:"Ashish06",
    }
    const user= new User(userObj);// creating an new  instance of a user module

    try {
        await user.save();// it will be save on a db and returns a promise
    res.send("user Added succesfully");

        
    } catch (error) {
        console.log("user does not have added succesfully");
        res.status(400).send("Error saving");
        
        
    }
    


});

connectDB().then(()=>{
    console.log("Database connectted successfully");
    app.listen("7777",()=>{
console.log("sever is listening to the port ");

});
/// we are first connecting to the DB then only we are connecting to the server;    
    

}).catch((err)=>{
console.log("Database is not connected successfully ");

})


