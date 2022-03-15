const mongoose = require("mongoose")
const { default: isEmail } = require("validator/lib/isEmail")


const authorSchema = new mongoose.Schema({
    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true
    },
    title:{
        type:String,
        enum:["Mr","Mrs","Miss"]
    },
    email:{
        type:String,
        unique:true,
        validate:[isEmail,'Enter a Valid Email']
        
    },
    password:{
        type:String,
        required:true
    }
},{timestamps:true})


module.exports = mongoose.model("Project_authors", authorSchema)