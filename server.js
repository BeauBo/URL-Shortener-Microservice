
//Set up node app
const express = require('express');
const app = express();
const routes = require('./routes/api');
const mongoose = require('mongoose');


app.use(express.static('public'));
app.set('trust proxy', true);
app.use(routes);

//connect to db

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/shortenUrl');




app.listen(process.env.PORT || 3000, function(){
  console.log('Listening for requests!')
})
