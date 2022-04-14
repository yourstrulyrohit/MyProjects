const express = require('express');
var bodyParser = require('body-parser');

const route = require('./routes/route.js');
const { default: mongoose } = require('mongoose');
const app = express();

var multer = require('multer');
app.use(multer().any())

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));




mongoose.connect("mongodb+srv://yourstrulyrohit:rohit123@cluster0.6iuya.mongodb.net/group27Database?authSource=admin&replicaSet=atlas-w5j1a7-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true", {useNewUrlParser: true})
    .then(() => console.log('mongodb  is connected.'))
    .catch(err => console.log(err))

app.use('/', route);

app.listen(process.env.PORT || 3000, function() {
	console.log('Express app running on port ' + (process.env.PORT || 3000))
}); 
