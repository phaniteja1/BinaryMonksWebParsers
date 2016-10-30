var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();
var striptags = require('striptags');

app.get('/', function(req, res) {
    res.send( { hello: 'world'} );
});

app.get('/scrape', function(req, res){
    
    res.send( { route: '/scrape'} );

    request("http://feeds.dzone.com/webdev", function(error, response, body) {
        if(error) {
            console.log("Error: " + error);
        }
        console.log("Status code: " + response.statusCode);

        var $ = cheerio.load(body);

        var linkPrefix = ''; 

        var dzoneJSON = [];

        $('item').each(function( index ) {
            var title = $(this).find('title').text().trim();            
            var description1 = $(this).find($('description')).text().trim();
            //var description = $(description1).find('p').text().trim();

            var description = striptags(description1);
            var linkobj = $(this).find('link');
            var link = linkobj[0].next.data;
            var source = 'DZone';
            var channel = 'dzone';
            var tags = [];
            $(this).find('category').each(function(i, elem) {
              tags.push($(this).text());
            });

            //tags.join(', ');
            var date = $(this).find('pubdate').text().trim();
            dzoneJSON.push({
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
        //dzoneJSON.pop();
        console.log(dzoneJSON);
        fs.writeFileSync('dzone.json', JSON.stringify(dzoneJSON), 'utf8');
    });
})

app.listen('8081')
console.log('Magic happens on port 8081');
exports = module.exports = app;