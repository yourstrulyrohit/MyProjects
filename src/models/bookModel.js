const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId

const bookSchema = new mongoose.Schema( {
    name: String,
    author: {
        type: ObjectId,
        ref: "NewAuthor"
    },
    price: Number,
    ratings: Number,
    publisher:{
        type: ObjectId,
        ref:"NewPublisher",
        ishardcover:{type:Boolean,default:false}
    }


}, { timestamps: true });


module.exports = mongoose.model('NewBook', bookSchema)
