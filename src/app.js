const express = require("express");
const connectDB = require("./config/database");
const cors=require("cors");
const app = express();
const cookieParser = require("cookie-parser");

app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

const auth    = require("./routes/auth");    // ✅ correct
const profile = require("./routes/profile"); // ✅ correct
const req     = require("./routes/req");     // ✅ correct
const user =require("./routes/user");


app.use("/",auth);
app.use("/",profile);
app.use("/",req);
app.use("/",user);
connectDB().then(() => {
    console.log("Database connectted successfully");
    app.listen("7777", () => {
        console.log("sever is listening to the port ");
    });
    /// we are first connecting to the DB then only we are connecting to the server;    

}).catch((err) => {
    console.log("Database is not connected successfully ");
});
