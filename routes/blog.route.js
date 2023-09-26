const express = require("express")
const router = express.Router()
const blogController = require("../controllers/blog.control")
const blogUpload = require("../middleware/blogMiddleware")
const auth = require("../middleware/authMiddleware")


router.route("/")
        .post( auth.authentication , blogUpload.single("image") , blogController.createBlog) 
        .get(auth.authentication ,blogController.getBlog)
        .patch(auth.authentication , blogUpload.single("image") , blogController.updateBlog)
        

router.delete("/:id" , auth.authentication , blogController.deleteBlog)

router.get("/allblogs" ,auth.adminAuthorization , blogController.getAllblogs)

module.exports = router   