const express=require("express");
const app = express(); 
// This calls the express function and **returns an instance** of an Express application.
// Think of it like creating a new branch of a restaurant based on the original blueprint.
// This instance (`app`) is an **object** with its own properties and methods
// (like `app.get()`, `app.listen()`, etc.) that let you build and run your server independently.
// we actually created a new web server on a port 3000 which is listening 
app.listen(3000,function(){
    console.log("Sever is listening at port 3000");
});
app.use("/", (req, res) => {
    res.send("hello from the server this side");
});
app.use("/profile",(req,res)=>{
    res.send("u have login into profile data");
}); 

/// this is done so we can send response from the server  for incoming request and we can check in local host:3000