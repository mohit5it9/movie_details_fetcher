var express = require('express');
var app = express();

var cheerio = require('cheerio');
var request = require('request');
var bodyParser = require('body-parser');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.text());

app.listen(8080);
console.log('Running on port 8080');


app.post('/test', function(req, res) {
  console.log('Recieved the get Request');
  var i = req.body;
  var url = 'http://www.imdb.com/title/tt' + i + '/'; 
  console.log("i is",i,"url is",url);
  request(url, function(err, response, body) {
      if(err) { console.log(err); return; }
      var $ = cheerio.load(body);
      var title, ratings, released;
      var json = {
        title: '',
        ratings: '',
        released: ''
      };
      $('.title_wrapper').filter(function() {
        var data = $(this);
        json.title = data.children().first().text().trim();
        json.released = data.children().last().children().last().text().trim();
      });
      $('.ratingValue').filter(function() {
        var data = $(this);
        json.ratings = parseFloat(data.text().trim());
      });
      console.log("Movie Crawled with json:",json);
    res.send(json);
  });
});