const urlModel = require("../model/urlModel");
const validUrl = require("valid-url");
const shortid = require("shortid");
const { promisify } = require("util");
const redis = require("redis")
const redisClient=redis.createClient(
    11584,
    "redis-11584.c264.ap-south-1-1.ec2.cloud.redislabs.com",
    {
      no_ready_check:true
    }
  )
  redisClient.auth("NTiaDgpqUiW8DwvHHI3baDY992E5at21",function(err){
  if (err) throw(err)
  
  })
  redisClient.on("connect",async function(){
    console.log("connected to redis...")
  
  })
  
const SET_ASYNC = promisify(redisClient.SET).bind(redisClient);
const GET_ASYNC = promisify(redisClient.GET).bind(redisClient);


const shortenUrl = async (req, res) => {
    try {
        const baseUrl = "http://localhost:3000";
        if (!validUrl.isUri(baseUrl)) {
            return res.status(400).send({ status: false, Message: "invalid Base Url" });
        }

        const { longUrl } = req.body;
       
        if (Object.entries(req.body).length == 0) {
            return res.status(400).send({ status: false, Message: "BAD REQUEST" });
        }

       
        if (!validUrl.isUri(longUrl)) {
            return res.status(400).send({ status: false, Message: "Invalid Long Url" });
        }
        // short id generation
        const urlCode = shortid.generate().toLowerCase();

        

        let isUrlExist = await urlModel.findOne({ longUrl });


        if (isUrlExist) {
            const cahcedUrlData = await GET_ASYNC(`${longUrl}`)
            return res.status(201).send({ status: true, Message: "Success", url: cahcedUrlData });
        }
    //   generation of base url with urlcode and creating data
        const shortUrl = baseUrl + "/" + urlCode;

        shortUrl.toLowerCase();

        const urlData = {
            longUrl,
            shortUrl,
            urlCode,
        };

    

        let newUrl = await urlModel.create(urlData);
        await SET_ASYNC(`${longUrl}`, JSON.stringify(urlData))
        return res.status(201).send({ status: true, Message: "success", url: urlData });
        

    } catch (error) {
        res.status(500).send({ status: false, Err: error.message });
    }
};



//redirectToOriginalUrl....................................................................

const getUrl = async (req, res) => {
// try {
//     const urlCode = req.params.urlCode.trim();


    // if (Object.entries(urlCode)== 0||(urlCode)==null) {
    //     return res.status(400).send({ status: false, Message: "BAD REQUEST" });
    // }

    // const isUrlExist = await urlModel.findOne({ urlCode:req.params.urlCode.trim() });

    // if (isUrlExist) {
    //     if (urlCodes !== isUrlExist.urlCode) {
    //     return res.status(404).send({ status: false, Message: "No Url Found, Please Check Url Code",});
    //     }
    //     return res.status(302).redirect(isUrlExist.longUrl);
    // }
//         let getUrlCode= await GET_ASYNC(`${req.params.urlCode}`)
//         // if(!getUrlCode){res.send({msg:"enter valid url code"})}


//         if(getUrlCode){
//             res.send(getUrlCode)
//             console.log(getUrlCode)
//             // if(!getUrlCode){res.send({msg:"enter valid url code"})}
//         }else{
//             let seturlCode=await urlModel.findOne({urlCode:urlCode})
//             await SET_ASYNC((`${req.params.urlCode}`),JSON.stringify(seturlCode))
//             res.send({data:seturlCode})
// console.log(seturlCode)
//     } 
// } catch (error) {
//     res.status(500).send({ status: false, Message: error.message });
// }
// };
try {
    const urlCode = req.params.urlCode

    // if (!validUrl.isUri(urlCode)) {
    //     return res.status(400).send({ status: false, message: "please provide urlcode" })
    // }
    if(!urlCode){
    if (typeof value == undefined || value == null || value == 0) return false
    if (typeof value === 'string' && value.trim().length === 0) return false
    return true
    }

    const cahcedOrginalUrl = await GET_ASYNC(`${urlCode}`)
    if (cahcedOrginalUrl) {

        let redirectingData = JSON.parse(cahcedOrginalUrl)

        return res.status(302).redirect(redirectingData)
    } else { 

        const urlData = await urlModel.findOne({ urlCode: urlCode })
        if (!urlData) {
            return res.status(404).send({ status: false, message: "url not found" })
    }

        await SET_ASYNC(`${urlCode}`, JSON.stringify(urlData.longUrl))

        return res.status(302).redirect(urlData.longUrl)

    }
} catch (err) {
    return res.status(500).send({ status: false, message: err.message })
}
}
// module.exports.cachedCode=cachedCode
module.exports.shortenUrl = shortenUrl;

module.exports.getUrl = getUrl;