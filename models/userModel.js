const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema({
  fname: {
    type: String,
    trim: true,
    required: true,
    minlength: [3, "Too short first name"],
    maxlength: [32, "Too long first name"],
  },
  lname: {
    type: String,
    trim: true,
    required: true,
    minlength: [3, "Too short first name"],
    maxlength: [32, "Too long first name"],
  },
  email: {
    type: String,
    trim: true,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: [8, "Too short first name"],
  },
 
  isAdmin: {
    type: Boolean,
    default: false,
  },
  tokens: [
    {
      type: String,
      trim: true,
      expires: "2d",
    },
  ],
  image : {
    type : String ,
    trim : true
  }
});

userSchema.pre("save", async function (next) {
  try {
    if (!this.isModified("password")) {
      return next();
    }
    this.password = await bcrypt.hash(this.password, 12);
    next();
  } catch (err) {
    return next(err);
  }
});

const User = mongoose.model("user", userSchema);

module.exports = User;
