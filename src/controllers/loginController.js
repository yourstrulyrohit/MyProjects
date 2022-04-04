const jwt = require("jsonwebtoken")
const userModel = require("../models/userModel")
const validator = require("../validator/validator")

// USERLOGIN-------------------------
const login = async function (req, res) {
    try {
        const data = req.body
// validations
        if (Object.keys(data) == 0) return res.status(400).send({ status: false, msg: "Bad Request, No data provided" })
     
        if (!validator.isValid(data.email)) { return res.status(400).send({ status: false, msg: "Email is required" }) }
        if (!validator.isValid(data.password)) { return res.status(400).send({ status: false, msg: "Password is required" }) };;
        
        if (!(/^\w+([\.-]?\w+)@\w+([\. -]?\w+)(\.\w{2,3})+$/.test(data.email.trim()))){return res.status(400).send({ status:false, msg: "Please enter a valid Email."})};
        if (!(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,15}$/.test(data.password))) { return res.status(400).send({ status: false, msg: "password should contain one uppercase letter ,one lowercase, one character and one number " }) }

        const userMatch = await userModel.findOne({ email: data.email, password: data.password })
        if (!userMatch) return res.status(400).send({ status: false, msg: "Email or Password is incorrect" })

        const token = jwt.sign({
            userId: userMatch._id,
            batch:"Thorium",
            groupNo:"19"
        }, "Group-19", {expiresIn: "30m" })
        return res.status(200).send({ status: true, msg: "You are successfully logged in", token })
    }
    catch (error) {
        return res.status(500).send({ msg: error.message })
    }
}

module.exports.login = login