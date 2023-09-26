const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const blogSchema = mongoose.Schema({

    title: {
        type: String,
        trim: true,
        required: true,

    },

    content: {
        type: String,
        trim: true,
        required: true,

    },

    image: {

        type: String,
        trim: true,
        

    },

    date: {

        type: String,
        required: true,
        trim: true,
        
    },
    owner : {
      type : mongoose.Types.ObjectId,
      ref : "user", 
      required : true
    }
});

blogSchema.pre("save", async function (next) {
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

const Blog = mongoose.model("blog", blogSchema);

module.exports = Blog;
