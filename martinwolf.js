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

    request("https://martinwolf.org/blog", function(error, response, body) {
        if(error) {
            console.log("Error: " + error);
        }
        console.log("Status code: " + response.statusCode);

        var $ = cheerio.load(body);

        var linkPrefix = ''; 

        var martinwolfJSON = [];

        $('.c-article').each(function( index ) {
            var title = $(this).find(' .c-article__title-list-link').text().trim();            
            var description = $(this).find(' .c-article__content').text().trim();
            var link = linkPrefix + $(this).find($(' .c-article__title-list-link')).attr('href');
            var source = 'martinwolf';
            var channel = 'martinwolf';
            var tags = '';
            var date = $(this).find('.c-article__meta').text().trim();
            martinwolfJSON.push({
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

            fs.writeFileSync('martinwolf.json', JSON.stringify(martinwolfJSON), 'utf8');
    });
})

app.listen('8081')
console.log('Magic happens on port 8081');
exports = module.exports = app;