'@namespace martinwolf';
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');

module.exports = {
    foo: function(cb){
    
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
                var source = 'Martin Wolf';
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
            cb(martinwolfJSON);
        });
    }
}