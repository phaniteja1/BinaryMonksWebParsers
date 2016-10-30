var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app = express();
app.get('/', function(req, res) {
    res.send({
        hello: 'world'
    });
});
app.get('/scrape', function(req, res) {
     res.send({
         route: '/scrape'
     });
    request("https://www.reddit.com", function(error, response, body) {
        if (error) {
            console.log("Error: " + error);
        }
        console.log("Status code: " + response.statusCode);
        var $ = cheerio.load(body);
        $('div#siteTable > div.link').each(function(index) {
            var title = $(this).find('p.title > a.title').text().trim();
            var score = $(this).find('div.score.unvoted').text().trim();
            var user = $(this).find('a.author').text().trim();
            var channel = "reddit";
            var time = $(this).find('p.tagline > time.live-timestamp').text().trim();
            console.log("Title: " + title);
            console.log("Score: " + score);
            console.log("User: " + user);
            console.log("Channel: " + channel);
            console.log("Time: " + time);
            
            fs.appendFileSync('reddit.txt', title + '\n' + score + '\n' + user + '\n' + channel + '\n' + time + '\n');
            
        });
    });
    
}) 
app.listen('8081');
 console.log('Magic happens on port 8081');
exports = module.exports = app;