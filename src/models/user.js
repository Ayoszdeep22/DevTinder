const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    uppercase: true,
  },
  lastName: {
    type: String,
  },
  emailId: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  age: {
    type: Number,
    min: 18,
  },
  gender: {
    type: String,
    validate(value) {
      if (!["male", "female", "others"].includes(value)) {
        throw new Error("gender not known");
      }
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 20,
  },
  about: {
    type: String,
    default: "there is no about section about him",
  },
  skills: {
    type: [String],
    default: ["this does not have default skills"], 
  },
},
{
   timestamps:true,
}


);

const User = mongoose.model("User", userSchema);
module.exports = User;
