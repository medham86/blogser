const User = require("../models/userModel");
const EventLogger = require("../services/logger.service");
const logger = EventLogger("auth");
const bcrypt = require("bcryptjs");

const userController = {
  deleteUser: async (req, res) => {
    try {
      const { id } = req.params;

      await User.findByIdAndDelete(id);

      res.status(200).send("account deleted");
    } catch (err) {
      logger.error(err.message);
      res.status(500).send({ message: err.message });
    }
  },
  updateUser: async (req, res) => {
    try {
      if (req.file) {
        var image = `/api/user/${req.file.filename}`;
      }

      const user = await User.findByIdAndUpdate(
        req.user._id,
        { ...req.body, image },
        { new: true }
      );
      res.send(user);
    } catch (err) {
      logger.error(err.message);
      res.status(500).send({ message: err.message });
    }
  },
  updatePassword: async (req, res) => {
    try {
      const { oldPassword, newPassword } = req.body;

      const user = await User.findById(req.user._id);

      const validPassword = await bcrypt.compare(oldPassword, user.password);

      if (!validPassword) {
        return res.status(403).send({ message: "invalid old password" });
      }

      user.password = newPassword;

      await user.save();
      res.status(201).send("Password updated !");
    } catch (err) {
      logger.error(err.message);
      res.status(500).send({ message: err.message });
    }
  },
  getUser: async (req, res) => {
    try {
      const user =await User.findById(req.user._id);
      res.send(user);
    } catch (err) {
      logger.error(err.message);
      res.status(500).send({ message: err.message });
    }
  },
  logOut: async (req, res) => {
    try {
      const user =await User.findById(req.user._id);
      user.tokens =await user.tokens.filter((item)=> item !== req.token)
      await user.save()
      res.cookie("access_token","",{
        httpOnly : true ,
        maxAge : 1000 *  60 * 60 * 24 * 2
      } )
     
    } catch (err) {
      logger.error(err.message);
      res.status(500).send({ message: err.message });
    }
  },
};

module.exports = userController;
