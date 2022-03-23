const mongoose = require('mongoose');


const collegeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase:true,
        match:/^[a-z]*$/
    },
    fullName: {
        type: String,
        required: true,
        trim: true
    },
    logoLink: {
        type: String,
        required: true,
        trim: true
    },
    
    isDeleted: {
        type: Boolean,
        dafault:false
    },
    
},
    { timestamps: true });



module.exports = mongoose.model('College', collegeSchema) //colleges
