const express = require('express');
const bodyParser = require('body-parser');
const route = require('./routes/route.js');
const moment = require("moment");
const { default: mongoose } = require('mongoose');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


mongoose.connect("mongodb+srv://yourstrulyrohit:rohit123@cluster0.6iuya.mongodb.net/rohit98?authSource=admin&replicaSet=atlas-w5j1a7-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true", {
    useNewUrlParser: true
})
.then( () => console.log("MongoDb is connected"))
.catch ( err => console.log(err) )



app.use('/', route);




app.listen(process.env.PORT || 3000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});
