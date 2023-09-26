const express = require("express")
const router = express.Router()
const authController = require("../controllers/auth.control")
const {newUserValidator , loginValidator} = require("../middleware/userValidatorMiddleware")


router.post("/login" , loginValidator, authController.login) 

router.post("/signup" , newUserValidator , authController.newUser)


module.exports = router