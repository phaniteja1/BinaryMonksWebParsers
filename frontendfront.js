var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();

app.get('/', function(req, res) {
    res.send( { hello: 'world'} );
});

app.get('/scrape', function(req, res){
    
    res.send( { route: '/scrape'} );

    request("https://frontendfront.com", function(error, response, body) {
        if(error) {
            console.log("Error: " + error);
        }
        console.log("Status code: " + response.statusCode);

        var $ = cheerio.load(body);

        var linkPrefix = ''; 

        var frontendfrontJSON = [];

        $('.stories-list-bordered li').each(function( index ) {
            var title = $(this).find(' .story-link').text().trim();            
            var description = $(this).find(' .story-link').text().trim();
            var link = linkPrefix + $(this).find($(' .story-icon a')).attr('href');
            var source = 'frontendfront';
            var channel = 'frontendfront';
            var tags = '';
            var date = $(this).find($('.meta time')).attr('datetime');
            frontendfrontJSON.push({
                title: title,
                description: description,
                link: link,
                source: source,
                channel: channel,
                tags: tags,
                date: date
            });
        });
	
        // removing the last element from the array
        // --> as it is empty
      //      fefJSON.pop();

            fs.writeFileSync('frontendfront.json', JSON.stringify(frontendfrontJSON), 'utf8');
    });
})

app.listen('8081')
console.log('Magic happens on port 8081');
exports = module.exports = app;