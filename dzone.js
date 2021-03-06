'@namespace dzone'
var request = require('request');
var cheerio = require('cheerio');
var striptags = require('striptags');

module.exports = {
    foo: function(cb){
        
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
            cb(dzoneJSON);
        });
    }
}