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

    request("https://twitter.com/angularjs", function(error, response, body) {
        if(error) {
            console.log("Error: " + error);
        }
        console.log("Status code: " + response.statusCode);

        var $ = cheerio.load(body);

        var linkPrefix = ''; 

        var TwtAngularJSON = [];

        $('.content').each(function( index ) {
            var title = $(this).find(' .js-tweet-text').text().trim();            
            var description = $(this).find(' .js-tweet-text').text().trim();
            var link = linkPrefix + $(this).find($(' .tweet-text-size a')).attr('href');
            var source = 'Twitter/AngularJS';
            var channel = 'AngularJS';
            var tags = 'AngularJS';
            var date = $(this).find('.timestamp').attr('title');
            TwtAngularJSON.push({
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

            fs.writeFileSync('twtangular.json', JSON.stringify(TwtAngularJSON), 'utf8');
    });
})

app.listen('8081')
console.log('Magic happens on port 8081');
exports = module.exports = app;