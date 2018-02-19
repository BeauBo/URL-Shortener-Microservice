const express = require('express');
const router = express.Router();
const ShortenUrl = require('../models/shortenUrl');

//create a route to get shortUrl
router.get('/new/:urlToShorten(*)', (req, res, next)=>{
  var {urlToShorten} = req.params;
  //RegEx to check url validation
  var regEx = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
  if(regEx.test(urlToShorten)){
    //create a random number for short url
    var randomNum = Math.floor(Math.random()*100000).toString();

    //create a RegEx to check if urlToShorten has http or https
    var re = new RegExp("^(http|https)://","i");
    urlToShorten =  re.test(urlToShorten) ? urlToShorten : "http://" + urlToShorten;

    var hostname = req.hostname;

    var data = {
      originalUrl: urlToShorten,
      shortenUrl: randomNum
    };

    //saving data to db and then send the data to client
    ShortenUrl.create(data).then(function(data){
      res.json({
        originalUrl:data.originalUrl,
        shortenUrl: hostname + "/" + data.shortenUrl
      });
    });

  }else{
    res.json({error: 'Invalid URL!'});
  }
});

//create a route to redirect short url to original url
router.get('/:randomNum', function(req, res, next){
  var randomNum = req.params.randomNum;
  ShortenUrl.findOne({shortenUrl: randomNum},function(err,data){
    if(err) throw err;
    res.redirect(301, data.originalUrl);
  });
});











module.exports = router;
