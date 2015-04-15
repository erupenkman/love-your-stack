var express = require('express');
var Twitter = require('twitter');
var client = new Twitter({
  consumer_key: 'BgSNEdoOoXgxg5cCznT6xHiM8',
  consumer_secret: 'ZL1t2GqInIThCz0DzYqrJKsncI0bD6euURdD94DXWqSRGNRl9R',
  access_token_key: '3114582198-x9H8o3Sg3VcTkuysTYvvobIdmeH3sSAwjr6XSrz',
  access_token_secret: 'fqJKqMyQdSCGkMBhUy7BOwnUXyahuGkUTyEzmIAPEAtyT'
});
var router = express.Router();

var baseUrl = 'https://api.twitter.com/1.1/search/tweets.json?q='
/* GET users listing. */
var filters = {


  java : 'java%20code%20SUCKS%20OR%20WTF%20OR%20Stupid%20OR%20FFS-filter:retweets',
  js :  'javascript%wtf-filter:retweets',
  css : 'css%20wtf-filter:retweets'

}
router.get('/:stack', function(req, res) {
  var filter = filters[req.params.stack];
  console.log(filter);
  client.get('search/tweets', {q: filter}, function(error, tweets, response) {
    if(error){
      console.error(error);
      res.status(500).send('Unable to get tweets');
      return;
    }
    var allTweets = [];
    console.log(tweets.statuses[0])
    console.log('got x results:', tweets.statuses.length);
    for(var i = 0; i < tweets.statuses.length; i++){
      allTweets.push({
        text: tweets.statuses[i].text,
        username: tweets.statuses[i].user.screen_name
      });
    }
    res.send(allTweets);
  });
});

module.exports = router;
