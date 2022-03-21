const jwt = require("jsonwebtoken");
const authorModel = require("../models/authorModel")


const createAuthor = async function (req, res) {
    try {
        let data = req.body;
        let savedata = await authorModel.create(data);
        res.status(201).send({ status: true,msg:'Author is created successfully',msg: savedata })
    }
    catch (err) {
        res.status(500).send({ status: false, msg: err.message })
    }
}


const authorLogIn = async function (req, res) {
    let data1 = req.body.email;
    let data2 = req.body.password;
    if (!data1) {
        res.status(401).send({ status: false, msg: "email is required" })
    }

    if (!data2) {
        res.status(401).send({ status: false, msg: "password is required" })
    }

    let checkData = await authorModel.findOne({ email: data1, password: data2 });
    if (!checkData) {
        res.status(404).send({ status: false, msg: 'Invalid Credential' });
    }
    else {
        let geneToken = jwt.sign({ authorId: checkData._id.toString() }, "functionUp");;
        res.status(200).send({ status: true, Token: geneToken });
    }
}


module.exports.createAuthor = createAuthor;
module.exports.authorLogIn = authorLogIn;