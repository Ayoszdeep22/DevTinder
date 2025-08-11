const express=require("express");
const connectDB=require("./config/database");
const app=express(); 
const User=require("./models/user");
app.use(express.json());



app.post("/signup",async(req,res)=>{ 
    console.log(req.body);
    
    // const userObj={
    //     firstName:"ashish",
    //     lastName:"pandey",
    //     emailId :"aashishpandey@gmail.com",
    //     password:"Ashish06",
    // }
    // const user= new User(userobj);// creating an new  instance of a user module

    // earlier now but we can

    const user= new User(req.body)// instace of a user module 

    try {
        await user.save();// it will be save on a db and returns a promise
    res.send("user Added succesfully");

        
    } catch (error) {
        console.log("user does not have added succesfully");
        res.status(400).send("Error saving");
        
        
    }
});


///find user api if there are duplicates
app.get("/user", async (req,res)=>{
    const users=req.body.emailId;
try {
    const userget= await User.findOne({emailId:users});
    if (!userget) {
     throw new Error("Something went wrong");

        
    } else {
        res.send(userget);
    }

    
} catch (error) {
    res.status(404).send("Something went wrong");
    
}
// this i harcoated data we basically not use this we find by id type we haveti write inbody specifically

});

// Feed api get all the users from the db
app.get("/feed",async (req,res)=>{
    try {
        const feed= await User.find({});
        res.send(feed);
        
    } catch (error) {
        res.status(400).send("could not able to get user data");
    }




});



app.get("/findbyid",async (req,res)=>{
    const id = req.query.id; // /findbyid?id=66b9f73a12de1223d8c223ce

    try {
       const adventure = await User.findById(id,'firstName emailId');
  if (!adventure) {
            return res.status(404).send("Document not found");
        }

        res.json(adventure); // .json() best for sending objects

    } catch (error) {
        res.status(404).send("Document not found");

        
    }

});

app.delete("/user",async (req,res)=>{
    const userId=req.body.userId;
    try {
        const userdel= await User.findByIdAndDelete(userId);
        res.send("user deleted succesfully");
        
    } catch (error) {
           res.status(400).send("could not able to delete user data");
        
    }
});

app.patch("/user",async (req,res)=>{
    const data=req.body;
    const userdata=req.body.userId;
    
    try {
        const usera= await User.findByIdAndUpdate(userdata,data,{returnDocument:"after",});
        console.log(usera);
        
        res.send(" updated succesfullyl");
        
    } catch (error) {
        res.status(404).send("Document not found");
        
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


