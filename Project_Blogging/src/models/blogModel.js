const mongoose = require("mongoose")
const ObjectId = mongoose.Schema.Types.ObjectId;

const blogSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    body:{
        type:String,
        required:true
    },
    authorId :{
        required:true,
        type:ObjectId,
        ref:"authors"
    },
    tags:{
        type:[String],
        required:true
    },
    category:{
        type:String,
        required:true
    },
    subcategory:{
        type:[String],
        required:true
    },
    isPublished:{
        type:Boolean,
        default:false,
    },
    publishedAt:{
        type:Date,
    },
    isDeleted:{
        type:Boolean,
        default:false
    },
    deletedAt:{
        type:Date,
    }
},{timestamps:true})


module.exports = mongoose.model("Blogs", blogSchema)