const express = require("express")
const router = express.Router()
const authRoute = require("./auth.route")
const userRoute = require("./user.route")
const blogRoute = require("./blog.route")

router.use("/auth" , authRoute)
router.use("/user" , userRoute)
router.use("/blog" , blogRoute)

module.exports = router