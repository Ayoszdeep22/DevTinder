const express = require("express");
const app = express();

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


// ======================
// Route Matching Order
// ======================


// Always put more specific routes first such as '/profile/use'
// This prevents it from being overridden by less specific routes

app.use("/profile/use", (req, res) => {
    res.send("You have logged into profile data");
    // We are using an API call here
});

// This will match /profile, /profile/anything if above isn't matched
app.use("/profile", (req, res) => {
    res.send("Hello from the profile route");
});


// This is the catch-all fallback for the base route "/"
// Useful to send responses to general requests to your server
app.use("/", (req, res) => {
    res.send("Hello from the server on the base route");
});
