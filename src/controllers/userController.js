const userModel = require("../models/userModel")
const validator = require("../validator/validator")
// CREATEUSER----------------
const createUser = async (req, res) => {
    try {
        const data = req.body;
// VALIDATIONS
        if (Object.keys(data)==0) { return res.status(400).send({ status: false, msg: "Bad request, No data provided." }) };
        if (!validator.isValid(data.title)) { return res.status(400).send({ status: false, msg: "title is required" }) }
        if (!validator.isValid(data.name)) { return res.status(400).send({ status: false, msg: "name is required" }) }
        if (!validator.isValid(data.phone)) { return res.status(400).send({ status: false, msg: "phone is required" }) }
        if (!validator.isValid(data.email)) { return res.status(400).send({ status: false, msg: "email is required" }) }
        if (!validator.isValid(data.password)) { return res.status(400).send({ status: false, msg: "password is required" }) }

        let arr = ["Mr", "Miss", "Mrs"]
        if (!arr.includes(data.title.trim())) return res.status(400).send({ status: false, msg: 'title should be Mr,Miss or Mrs' })


        if (!(/^([+]\d{2})?\d{10}$/.test(data.phone.trim()))) {return res.status(400).send({ status: false, msg: "please provide a valid moblie Number" })};
        if (!(/^\w+([\.-]?\w+)@\w+([\. -]?\w+)(\.\w{2,3})+$/.test(data.email.trim()))) {return res.status(400).send({ status: false, msg: "Please provide a valid email" })};
        if (!(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,15}$/.test(data.password.trim()))) { return res.status(400).send({ status: false, msg: "password should contain one uppercase letter ,one lowercase, one character and one number " }) }

        // DUPLICACY
        let duplicateNumber = await userModel.findOne({ phone: data.phone })
        if (duplicateNumber) return res.status(400).send({ status: false, msg: 'number already exist' })

        let duplicateEmail = await userModel.findOne({ email: data.email })
        if (duplicateEmail) return res.status(400).send({ status: false, msg: 'email already exist' })

        let userCreated = await userModel.create(data);
        res.status(201).send({ status: true, message: "User created successfully", data: userCreated })
    }
    catch (error) {
        return res.status(500).send({ msg: error.message })
    }

}

module.exports.createUser = createUser