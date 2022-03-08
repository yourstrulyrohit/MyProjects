const GB =require("../middleware.js/Auth.js");

const express = require('express');
const router = express.Router();
const userController= require("../controllers/userController")
router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.post("/users", userController.createUser  )

router.post("/login", userController.loginUser)

router.get("/users/:userId",GB.GB, userController.getUserData)

router.put("/users/:userId",GB.GB, userController.updateUser)
router.delete("/users/:userId",GB.GB, userController.deleteUser)

module.exports = router;