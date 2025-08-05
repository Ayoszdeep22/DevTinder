const express = require("express");
const app = express();
//calling express() returns an object with many methods and properties for
 //handling HTTP requests, defining routes, applying middleware, and starting the server.//


// Create an instance of the Express application.
// This instance (`app`) has methods to define routes, start the server, etc.


// Start the server on port 7777
// This means your server will listen for incoming requests on port 7777
app.listen(7777, function () {
    console.log("Server is listening at port 7777");
});


// ======================
// Main API Routes
// ======================


// GET /user → returns basic user info
app.get("/user", (req, res) => {
    console.log(req.query);
    // http://localhost:7777/user?username="ayoszdeep" this will show ayoszdeep in terminal 
    //it is called query params
    
    res.send({ firstname: "Ayoszdeep", lastname: "Mishra" });
});


// POST /user → simulate saving user data
app.post("/user", (req, res) => {
    
    res.send("This will push data into the database"); 
});

// PATCH /user → simulate fixing/updating user data
app.patch("/user", (req, res) => {
    res.send("this has fixed some of patches");
});

// DELETE /user → simulate deleting user data
app.delete("/user", (req, res) => {
    res.send("data has been deleted");
});
// this is dynamic routing 
app.get("/user/:username/:name",(req,res)=>{    
    console.log(req.params);    
})
 

/// =========================
/// 🧠 Advanced Route Patterns
/// =========================

/**
 * Matches: /abc, /abbc, /abbbc, etc.
 * The "+" means one or more of the character before it (i.e., 'b')
 */
app.get(/ab+c/, (req, res) => {
    res.send("Matched route with one or more 'b': /ab+c");
});

/**
 * Matches: /abc or /ac
 * The "?" means the character before it ('b') is optional
 */
app.get(/ab?c/, (req, res) => {
    res.send("Matched route with optional 'b': /ab?c");
});

/**
 * Matches: /ac, /abc, /abbbc, etc.
 * The "*" matches zero or more characters (can be empty or many 'b's or any other)
 */
app.get(/ab*c/, (req, res) => {
    res.send("Matched route with zero or more 'b': /ab*c");
});

/**
 * Matches exactly "/a/"
 * This route is NOT pattern-based — literal match only.
 */
app.get(/ab/, (req, res) => {
    res.send("Matched route /a/");
});

/**
 * Matches any path that ends in "fly", like:
 * /butterfly, /dragonfly, /some/fly
 * This uses a RegExp object!
 */
app.get(/.*fly$/, (req, res) => {
    res.send("Matched route ending with 'fly'");
});


///// Middleware concept

const {Adminauth,profileauth}=require("./middleware/auth")
app.use("/admin",Adminauth)

app.get("/admin/getalldata",(req,res,next)=>{
    res.send("authorized data");}
  
);
app.get("/admin/deletealldata",(req,res,next)=>{
    res.send("deleted data");}
    );




// ======================
// Route Matching Order
// ======================


// Always put more specific routes first such as '/profile/use'
// This prevents it from being overridden by less specific routes



/// ROute handling//

app.use("/profile/use",profileauth, [(req, res,next) => {
    // res.send("You have logged into profile data");
    console.log("the terminal output 1");
    
    // We are using an API call here
    next();
},
 function (req,res,next){
    console.log("the  terminal output 2");
    // res.send("the res 2");
    next();
},
function (req,res,next){
    console.log("the  terminal output 3");
    // res.send("the res 3");
    next();

}],
function (req,res){
    console.log("the  terminal output 4");
    res.send("the res 4");},
);




// This will match /profile, /profile/anything if above isn't matched
app.use("/profile", (req, res) => {
    res.send("Hello from the profile route");
});
app.use("/getdataerror",(req,res)=>{
throw new err("error sent");
res.send("the error is here")
});


// This is the catch-all fallback for the base route "/"
// Useful to send responses to general requests to your server


///ERROR Handling??


app.use("/", (err,req, res,next) => {
    if(err){
        console.log("the error is here");
        
        res.status(500).send("unuthorized error");
    }
    else{
    res.send("Hello from the server on the base route");
}});


