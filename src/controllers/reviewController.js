const booksModel = require("../models/booksModel");
const reviewModel = require("../models/reviewModel")
const validator = require("../validator/validator")


//CREATE REVIEW----------------------------------------

const createReview = async function (req, res) {
    try {
        if (!(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/.test(req.params.bookId))) { return res.status(400).send({ status: false, message: "You should have put correct book Id in params" }) }
        let data = req.body;
        if (Object.keys(data) == 0) { return res.status(400).send({ status: false, message: "Enter data to create a review" }) }

        if (!validator.isValid(data.bookId)) { return res.status(400).send({ status: false, message: "BookId is required" }) }
        if (!validator.isValid(data.rating)) { return res.status(400).send({ status: false, message: "Rating is required" }) }
        if (!(data.rating >= 1 && data.rating <= 5)) { return res.status(400).send({ status: false, message: "Rating value should be between 1 to 5" }) }

        if (!(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/.test(data.bookId))) { return res.status(400).send({ status: false, message: "You should have put correct book Id in body" }) }

        if (!(data.bookId == req.params.bookId)) { return res.status(400).send({ status: false, message: "Id inside body and Id inside params should be same" }) }

        let book = await booksModel.findOne({ _id: data.bookId, isDeleted: false })
        if (!book) { return res.status(400).send({ status: false, message: "No book exist with this id" }) }

        let createData = await reviewModel.create(data);
        return res.status(201).send({ status: true, message: "Review successfully created", data: createData })
    }
    catch (error) {
        return res.status(500).send({ status: false, error: error.message })
    }
}


//UPDATE REVIEW BY BOOK ID AND REVIEW ID----------------------------------------

const updateReviews = async (req, res) => {
    try {
        let bookId = req.params.bookId;
        let reviewId = req.params.reviewId;
        if (!(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/.test(bookId))) { return res.status(400).send({ status: false, message: "You should have put correct book Id in params" }) }
        if (!(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/.test(reviewId))) { return res.status(400).send({ status: false, message: "You should have put correct review Id in params" }) }
        let data = req.body;
        if(Object.keys(data)==0){return res.status(400).send({status: false, message: "Enter some data for update"})}
        if (!(data.rating >= 1 && data.rating <= 5)) { return res.status(400).send({ status: false, message: "Rating value should be between 1 to 5" }) }

        let book = await booksModel.findOne({ _id: bookId, isDeleted: false })
        if (!book) { return res.status(400).send({ status: false, message: "No book exist with this id" }) }

        let checkReviewId = await reviewModel.findOne({ _id: reviewId, isDeleted: false })
        if (!checkReviewId) { return res.status(400).send({ status: false, message: "No review exist with this id" }) }

        let updateReview = await reviewModel.findOneAndUpdate({ _id: reviewId, bookId: bookId },
            { $set: { review: data.review, rating: data.rating, reviewedBy: data.reviewedBy, reviewedAt: data.reviewAt } }, { new: true })

        let result = {
            bookId: book._id,
            title: book.title,
            excerpt: book.excerpt,
            userId: book.userId,
            category: book.category,
            reviews: book.review,
            releasedAt: book.releasedAt,
            reviewsData: updateReview
        };
        return res.status(200).send({ status: true, message: "Review updated successfully", bookDetailsWithReview: result })
    }
    catch (error) {
        return res.status(500).send({ status: false, error: error.message })
    }
}


//DELETE REVIEW BY REVIEW ID AND BOOK ID----------------------------------------

const deleteReview = async (req, res) => {
    try {
        let reviewId = req.params.reviewId
        let bookId = req.params.bookId
        if (!(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/.test(bookId))) { return res.status(400).send({ status: false, message: "You should have put correct book Id in params" }) }
        if (!(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/.test(reviewId))) { return res.status(400).send({ status: false, message: "You should have put correct review Id in params" }) }

        let book = await booksModel.findOne({ _id: bookId, isDeleted: false });
        if (!book) { return res.status(404).send({ status: false, message: "No book exist with this id" }) }

        let review = await reviewModel.findOne({ _id: reviewId, bookId: bookId });
        if (!review) { return res.status(400).send({ status: false, msg: "Review id should be checked, id is not from this book." }) }
        if (review.isDeleted == true) { return res.status(400).send({ status: false, msg: "Review has already been deleted" }) }

        let deleteRev = await reviewModel.findOneAndUpdate({ _id: review._id, bookId: review.bookId, isDeleted: false },
            { $set: { isDeleted: true } })
        let deleteReview = await booksModel.findOneAndUpdate({ _id: book._id }, { $inc: { review: -1 } })
        return res.status(200).send({ status: true, message: "Review deleted successfully"})
    }
    catch (error) {
        return res.status(500).send({ status: false, error: error.message })
    }
}

module.exports = {
    createReview,
    updateReviews,
    deleteReview
}