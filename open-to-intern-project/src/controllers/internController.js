

const internModel = require("../models/internModel")





// intern creation
const createIntern = async function (req, res) {
    try {
        let data = req.body
let{name, email, mobile, collegeId} = req.body

// validation //
if(Object.keys(req.body).length==0) res.status(400).send({status:false, msg:"Bad request"})

if(!name) res.status(400).send({status:false, msg:"name is required"})

if(!email) res.status(400).send({status:false, msg:"email is required"})
if(!(/[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/.test(data.email))){
    return res.status(400).send({status:false,msg:"invalid email id"})
 }

if(!mobile) res.status(400).send({status:false, msg:"mobile is required"})
if(!(/^([+]\d{2})?\d{10}$/.test(data.mobile))){
    return res.status(400).send({status:false,msg:"invalid mobile number"})
 }

if(!collegeId) res.status(400).send({status:false, msg:"collegeId is required"})

// duplicacy//
let internExist = await internModel.findOne({ email: email })
if (internExist) { return res.status(422).send({ status: false, error: `ERROR! : ${email} this Email already exist` }) }


let internExist2 = await internModel.findOne({ mobile: mobile })
if (internExist2) { return res.status(422).send({ status: false, error: `ERROR! : ${mobile} this number already exist` }) }


let savedData =await internModel.create(req.body)
if(savedData.isDeleted!==false) res.status(400).send({status:false,msg:"isDeleted must be false"})
res.status(201).send({status:true, data:req.body})

       


    }
    catch (err) {
        return res.status(500).send({status:false,msg: err.message})

    }
}








module.exports.createIntern = createIntern


