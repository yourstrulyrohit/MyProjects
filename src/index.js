const express= require('express')
const redis=require("redis")
const bodyParser = require('body-parser')
const route = require("./route/route.js");
const mongoose = require('mongoose');
const { connect } = require('http2');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// const redisClient=redis.createClient(
//   11584,
//   "redis-11584.c264.ap-south-1-1.ec2.cloud.redislabs.com",
//   {
//     no_ready_check:true
//   }
// )
// redisClient.auth("NTiaDgpqUiW8DwvHHI3baDY992E5at21",function(err){
// if (err) throw(err)

// })
// redisClient.on("connect",async function(){
//   console.log("connected to redis...")

// })


mongoose.connect("mongodb+srv://yourstrulyrohit:rohit123@cluster0.6iuya.mongodb.net/group18Database?authSource=admin&replicaSet=atlas-w5j1a7-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true", {
    useNewUrlParser: true
})

  .then(() => console.log("MongoDb is connected"))
  .catch((err) => console.log(err));

app.use("/", route);

app.listen(process.env.PORT || 3000, function () {
  console.log("Express app running on port " + (process.env.PORT || 3000));
});
