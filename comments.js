// Create web server

// Load the http module to create an http server.
var http = require('http');
var url = require('url');
var fs = require('fs');

// Configure our HTTP server to respond with Hello World to all requests.
var server = http.createServer(function (request, response) {
    var url_parts = url.parse(request.url);
    console.log(url_parts);
    var path = url_parts.pathname;
    console.log(path);
    switch(path){
        case '/':
            fs.readFile('index.html', function(error, data){
                response.writeHead(200, {'Content-Type': 'text/html'});
                response.end(data);
            });
            break;
        case '/comments':
            fs.readFile('comments.json', function(error, data){
                response.writeHead(200, {'Content-Type': 'application/json'});
                response.end(data);
            });
            break;
        default:
            response.writeHead(404);
            response.end();
            break;
    }
});

// Listen on port 8000, IP defaults to