const express = require('express');
const router = express.Router();
const authorContoller = require("../controllers/authorController");
const blogControllers = require("../controllers/blogControllers");
const authentication = require("../middleWare/auth");
// const authorization = require("../middleWare/auth");


router.post("/author", authorContoller.createAuthor);

router.post("/logIn", authorContoller.authorLogIn);


router.post("/createblogs", authentication.authentication, blogControllers.createBlog);

router.get("/getblogs", authentication.authentication, blogControllers.getBlogs);

router.put("/updateblogs/:blogId", authentication.authentication, blogControllers.updateBlogs);

router.delete("/deleteblogs/:blogId", authentication.authentication, blogControllers.deleteBlogs);

router.delete("/deleteByQuery", authentication.authentication, blogControllers.deleteByQuery);




module.exports = router;