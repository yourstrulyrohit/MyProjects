

const collegeModel = require("../models/collegeModel")
const internModel = require("../models/internModel")





/// college creation
const createCollege = async function (req, res) {
    try {
        let data = req.body
        let {name, fullName, logoLink, isDeleted } = req.body

        // validation //
        if(!name) res.status(400).send({status:false, msg:"name is required"})
        if(!fullName) res.status(400).send({status:false, msg:"fullName is required"})
        if(!logoLink) res.status(400).send({status:false, msg:"logoLink is required"})


        // duplicacy //
        let collegeExist = await collegeModel.findOne({name:name})
        if(collegeExist) { return res.status(422).send({ status: false, error: `ERROR! : ${name} this college name already exist` }) }
        
        let collegeExist2 = await collegeModel.findOne({fullName:fullName})
        if(collegeExist2) { return res.status(422).send({ status: false, error: `ERROR! : ${fullName} this college fullName already exist` }) }

        let collegeExist3 = await collegeModel.findOne({logoLink:logoLink})
        if(collegeExist3) { return res.status(422).send({ status: false, error: `ERROR! : ${logoLinke} this college logolink already exist` }) }

        let savedData = await collegeModel.create(data)
        if(savedData.isDeleted!==false) res.status(400).send({status:false,msg:"isDeleted must be false"})
        res.status(201).send({status:true, data:data})

    }
    catch (err) {
        return res.status(500).send({status:false,msg: err.message})
    }
}

// get college details
const getCollegeDetails = async function(req, res){
    try{
        

        let collegeName = req.query.collegeName
        
        if(!collegeName)  res.status(400).send({status:false,msg:"collegeName required"})

        let college = await collegeModel.findOne({name:collegeName,isDeleted : false})
        if(!college)    res.status(404).send({status:false,msg:"College not found "})

        let data = {
            name: college.name,
            fullName : college.fullName,
            logoLink:college.logoLink
        }
        let id = college._id
        let interestedIntern = await internModel.find({collegeId:id,isDeleted:false}).select({name:1,email:1,mobile:1})
        if(interestedIntern.length ==0){
            data.interest = "no intern found"
            return res.status(200).send({status:false,msg:data})
        }
        data.interest = interestedIntern
        return res.status(200).send({status:true,data:data})
        
    }
    catch(err){
        return res.status(500).send({status:false,msg: err.message})
    }
}








module.exports.createCollage = createCollege
module.exports.getCollegeDetails = getCollegeDetails

