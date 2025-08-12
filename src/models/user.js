const mongoose = require("mongoose");
const { default: isURL } = require("validator/lib/isURL");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    uppercase: true,
  },
  lastName: {
    type: String,
    lowercase: true,
  },
  emailId: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    validate(value) {
      const alowedomains = ["@gmail.com", "@yahoo.com", "@facebook.com"];
      if (!alowedomains.some(domain => value.endsWith(domain))) {
        throw new Error("Email domain not allowed"); // fixed message
      }
    },
  },
  age: {
    type: Number,
    min:18,
    required: true,
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
    maxlength: 200,
  },
  about: {
    type: String,
    default: "there is no about section about him",
  },
  skills: {
    type: [String],
    default: ["this does not have default skills"],
  },
  profilePic: {
    type: String,
    validate(value) {
      // ✅ Allow empty profilePic, only validate if present
      if (value && !validator.isURL(value)) {
        throw new Error("not a valid photo");
      }
    }
  },
}, {
  timestamps: true,
});

const User = mongoose.model("User", userSchema);
module.exports = User;
