const express = require("express")
const router = express.Router()
const userctl = require("../controllers/user.control")
const {adminAuthorization ,authentication} = require("../middleware/authMiddleware")

router.route("/:id")
    .delete( adminAuthorization , userctl.deleteUser )

router.post('/logout',authentication, userctl.logOut)

router.route("/")
    .get(authentication ,userctl.getUser )
    .patch(authentication ,userctl.updateUser)

router.post("/changepassword" ,authentication ,userctl.updatePassword )



module.exports = router