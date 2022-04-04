const express = require('express');
const router = express.Router();

const userController = require("../controllers/userController")
const loginController = require("../controllers/loginController");
const bookController = require("../controllers/bookController")
const reviewController = require("../controllers/reviewController")
const middleware = require('../middleware/middleware')

// USERs
router.post("/register", userController.createUser)
router.post("/login", loginController.login)
// BOOKs
router.post("/book", middleware.authentication, bookController.createBook)
router.get("/books", middleware.authentication, bookController.getBook)
router.get("/books/:bookId", middleware.authentication, bookController.getBooksById)
router.put("/books/:bookId", middleware.authentication, middleware.authorization, bookController.updateBooks)
router.delete("/books/:bookId", middleware.authentication, middleware.authorization, bookController.deleteBook)
// REVIEWs
router.post("/books/:bookId/review",middleware.authentication, reviewController.createReview)
router.put("/books/:bookId/review/:reviewId",middleware.authentication, reviewController.updateReviews)
router.delete("/books/:bookId/review/:reviewId",middleware.authentication,reviewController.deleteReview)



module.exports = router;
