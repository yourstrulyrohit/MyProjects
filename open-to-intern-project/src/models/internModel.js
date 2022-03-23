const mongoose = require('mongoose');
const validator = require('validator')
const ObjectId = mongoose.Schema.Types.ObjectId

const internSchema = new mongoose.Schema({
    name: {
        type:String,
        required:true,
        trim:true
    },
    email: {
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true,
        validate: {
            validator: validator.isEmail,
            message: '{VALUE} is not a valid email',
            isAsync: false
         },
         match:/[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/
    },
        mobile: {
            type:String,
            required:true, 
            unique:true,
            minlength:[10, "Mobile number should be of 10 digits"],
            maxlength:[10, "Mobile number should be of 10 digits"],
            match:/^([+]\d{2})?\d{10}$/
            
        },
        collegeId: {
           type: ObjectId, 
            ref : "College"
        },
        isDeleted: {
            type:Boolean,
             default: false}

}, { timestamps: true });

module.exports = mongoose.model('Intern', internSchema) //interns


     
       