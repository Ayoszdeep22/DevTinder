const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");
const validatorcheck = require("./utils/validator");
const bcrypt = require("bcrypt");
const validator = require("validator");
const cookieParser = require("cookie-parser");
app.use(cookieParser());



app.use(express.json());

app.post("/signup", async (req, res) => {
    console.log(req.body);

    // const userObj={
    //     firstName:"ashish",
    //     lastName:"pandey",
    //     emailId :"aashishpandey@gmail.com",
    //     password:"Ashish06",
    // }
    // const user= new User(userobj);// creating an new  instance of a user module

    // earlier now but we can

    try {
        const postvalidation = ["firstName", "lastName", "emailId", "password"];
        const hasAllFields = postvalidation.every(field => field in req.body);

        if (!hasAllFields) {
            throw new Error("Please include firstName, lastName, emailId, and password");
        }

        // ✅ moved up from below so variables exist before creating the User
        const { firstName, lastName, emailId, password,age } = req.body;
        const passwordHash = bcrypt.hashSync(password, 10);

        const user = new User({
            firstName,
            lastName,
            emailId: emailId.trim().toLowerCase(),
            password: passwordHash, 
            age
}); // instace of a user module fierst we have used like rew.body here 

        /// vlaidation of data is the first thing we have to 
        validatorcheck(req);

        await user.save();// it will be save on a db and returns a promise
        res.send("user Added succesfully");

    } catch (error) {
        console.log("user does not have added succesfully");
        // During development, show full error
        res.status(400).send("Error: " + error.message);
    }
});

///find user api if there are duplicates
app.get("/user", async (req, res) => {
    const users = req.body.emailId;
    try {
        const userget = await User.findOne({ emailId: users });
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
app.get("/feed", async (req, res) => {
    try {
        const feed = await User.find({});
        res.send(feed);
    } catch (error) {
        res.status(400).send("could not able to get user data");
    }
});

app.get("/findbyid", async (req, res) => {
    const id = req.query.id; // /findbyid?id=66b9f73a12de1223d8c223ce
    try {
        const adventure = await User.findById(id, 'firstName emailId');
        if (!adventure) {
            return res.status(404).send("Document not found");
        }
        res.json(adventure); // .json() best for sending objects
    } catch (error) {
        res.status(404).send("Document not found");
    }
});

app.delete("/user", async (req, res) => {
    const userId = req.body.userId;
    try {
        await User.findByIdAndDelete(userId);
        res.send("user deleted succesfully");
    } catch (error) {
        res.status(400).send("could not able to delete user data");
    }
});

app.patch("/user/:userId", async (req, res) => {
    const data = req.body;
    const userdata = req.params?.userId;

    try {
        const allowedschema = ["age", "gender", "about", "skills", "firstName"];
        const allowupdates = Object.keys(data).every((k) => allowedschema.includes(k));
        if (data?.skills.length >= 10) {
            throw new Error("skills are over");
        }
        if (!allowupdates) {
            throw new Error("Update not allowed");
        }
        // aboce is validating the api so we can update somethings not all things..
        const usera = await User.findByIdAndUpdate(userdata, data, { returnDocument: "after", runValidators: true });
        console.log(usera);

        res.send(" updated succesfullyl");

    } catch (err) {
        res.status(404).send("Update Failed : " + err.message);
    }
});
//lec 10
app.get("/profile", async (req, res) => {
  const getcookie = req.cookies;
  const { token } = getcookie;

  if (!token) {
    return res.status(401).send("Access denied. No token provided.");
  }

  // If token exists, proceed
  console.log("Token found:", token);
  res.send("cookie sent");
});





// at lec 9 we have created login api
app.post("/login", async (req, res) => {
  try {
    const { password, emailId } = req.body;
  // Validate email format first  
    if (!validator.isEmail(emailId)) {
      return res.status(400).send("Invalid email format");
    }

    // Find user in DB
    const user = await User.findOne({ emailId: emailId });
    if (!user) {
      return res.status(400).send("Email id not found");
    }

    // bcrypt.compare is async, await the result!
    const passwordcheck = await bcrypt.compare(password, user.password);

    if (passwordcheck) {
        // creating a token



        //sending a token by adding in cookie
        res.cookie("token","dhdsjfhsfsdflssdjdfkjslffjsfjlsljfsjlkffjlksk");
    


      res.send("login successful");
    } else {
      res.status(400).send("Incorrect password");
    }

  } catch (error) {
    console.error(error);
    res.status(400).send("Error: " + error.message);
  }
});



connectDB().then(() => {
    console.log("Database connectted successfully");
    app.listen("7777", () => {
        console.log("sever is listening to the port ");
    });
    /// we are first connecting to the DB then only we are connecting to the server;    

}).catch((err) => {
    console.log("Database is not connected successfully ");
});
