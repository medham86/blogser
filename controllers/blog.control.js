const { log } = require("winston");
const Blog = require("../models/blogModel");
const EventLogger = require("../services/logger.service");
const logger = EventLogger("auth");
const fs = require("fs");
const blogController = {
  createBlog: async (req, res) => {
    try {
      let date = new Date().toISOString();

      let newBlog = new Blog({ ...req.body, owner: req.user._id, date });
      if (req.file) {
        newBlog.image = `/api/blog/${req.file.filename}`;
      }
      
      await newBlog.save();
      res.status(201).send("blog created");
    } catch (err) {
      logger.error(err.message);
      res.status(401).send({ message: err.message });
    }
  },

  getBlog: async (req, res) => {
    try {
      const blogs = await Blog.find({ owner: req.user._id }).populate("owner");
      res.send(blogs);
    } catch (err) {
      logger.error(err.message);
      res.status(401).send({ message: err.message });
    }
  },

  updateBlog: async (req, res) => {
    try {
      let blog = await Blog.findById(req.body._id);
      
        if(req.file){ 
            let imageName = blog.image?.split("/")[3];
            
            let deletePath = `./uploads/${imageName}`;
            
            fs.unlinkSync(deletePath);
            var imagePath = `/api/blog/${req.file.filename}`;
        }
      
      
      await Blog.findByIdAndUpdate(
        req.body._id,
        { ...req.body, image: imagePath },
        { new: true }
      );
      res.send();
    } catch (err) {
      logger.error(err.message);
      res.status(401).send({ message: err.message });
    }
  },

  deleteBlog: async (req, res) => {
    try {
      const { id } = req.params;

      await Blog.findByIdAndDelete(id);

      res.send();
    } catch (err) {
      logger.error(err.message);
      res.status(401).send({ message: err.message });
    }
  },
  getAllblogs: async (req, res) => {
    try {
      const blog = await Blog.find({}).populate("owner");
      res.status(201).send(blog);
    } catch (err) {
      logger.error(err.message);
      res.status(401).send({ message: err.message });
    }
  },
};

module.exports = blogController;
