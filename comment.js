// Create Web Server

// Load modules
var http = require('http');
var url = require('url');
var path = require('path');
var fs = require('fs');

// Create Web Server
http.createServer(function(request, response) {
    var pathname = url.parse(request.url).pathname;
    var filePath = path.join(__dirname, pathname);
    if (pathname === '/') {
        filePath = path.join(__dirname, 'index.html');
    }

    fs.exists(filePath, function(exists) {
        if (exists) {
            fs.readFile(filePath, function(err, data) {
                if (err) {
                    response.writeHead(500);
                    response.end('Server Error!');
                } else {
                    response.writeHead(200);
                    response.end(data);
                }
            });
        } else {
            response.writeHead(404);
            response.end('404 Not Found!');
        }
    });
}).listen(3000, function() {
    console.log('Server running at http://