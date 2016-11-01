'@namespace frontendfront'
var request = require('request');
var cheerio = require('cheerio');
var striptags = require('striptags');

module.exports = {
    foo: function(cb){

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
            var source = 'FrontEndFront';
            var channel = 'front-end-front';
            var tags = '';
            var date = $(this).find($('.meta time')).attr('datetime');
            if (title) {
              frontendfrontJSON.push({
                  title: title,
                  description: description,
                  link: link,
                  source: source,
                  channel: channel,
                  tags: tags,
                  date: date
              });
            }
        });
        cb(frontendfrontJSON);
    });
  }
}