var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();
var striptags = require('striptags');
var path = require('path');
var routes = require('./');

app.get('/', function(req, res) {
    res.send( { hello: 'world'} );
});

app.get('/scrape', function(req, res){
    var resulJson1=[];
    res.send( { route: '/scrape'} );
    calls = [];
    var testFolder = './';
    noOfFiles = 0;
    fs.readdir(testFolder, (err, files) => {
        files.forEach(file => {
            
            if(path.extname(file)=='.js'){
                
                routes;
                console.log(Object.keys(require('module')._cache));
                if(file != 'automation.js' && file != 'index.js'){
                    noOfFiles = noOfFiles+1;
                    var x = require('./'+file);
                    
                    x.foo(function(resulJson){
                        noOfFiles = noOfFiles - 1;
                        resulJson1 = resulJson1.concat(resulJson);    
                    
                        if(noOfFiles == 0){
                            // console.log(resulJson1);

                            // post payload to mongolab

                            //Lets configure and request
                            request({
                                url: 'https://api.mlab.com/api/1/databases/binarymonks/collections/autofeeds?apiKey=8MsekOtzEDmxaPSSnqqCNJ9KM1XKN2RL', //URL to hit
                                method: 'PUT',
                                //Lets post the following key/values as form
                                json: resulJson1,
                                contentType: 'application/json'
                            }, function(error, response, body){
                                if(error) {
                                    console.log(error);
                                } else {
                                    console.log(response.statusCode, body);
                            }
                            });
                        } 
                    });
                }
            }
        });
    })
})

app.listen('8081')
console.log('Magic happens on port 8081');
exports = module.exports = app;