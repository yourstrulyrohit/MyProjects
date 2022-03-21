const jwt = require("jsonwebtoken")



const authentication = function (req, res, next) {
    try {
        let token = req.headers["x-api-key"]
        if (!token) {
            res.status(404).send({ status: false, msg: 'Token Mandatory' })
        }

        let decodedToken = jwt.verify(token, "functionUp")
        if (!decodedToken) {
            res.status(400).send({ status: false, msg: 'Invalid Token' })
        }

        req.authorId = decodedToken.authorId;
        next()
    }
    catch (error) {
        res.status(500).send({ status: false, data: error.message })
    }

}


// const authorization = function (req, res, next) {
//     try {
//         let token = req.headers["x-api-key"]
//         let decodedToken = jwt.verify(token, "functionUp")

//         let data2 = decodedToken.authorId;
//         console.log(data2)
//         data1 = req.params.blogId;
//         if(!data1){
//             res.status(404).send({status:false,msg:"authorId is required"})
//         }
//         console.log(data1);
//         if (data1 !== data2) {
//             return res.status(401).send({ status: false, msg: 'Unauthorized "Cannot be access Other"s Data' })
//         }
//         next()
//     }

//     catch (error) {
//         res.status(500).send({ status: false, error: error.message })
//     }
// }




module.exports.authentication = authentication;
// module.exports.authorization = authorization;