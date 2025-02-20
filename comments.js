//create web server

var http = require('http');
var fs = require('fs');
var url = require('url');

var server = http.createServer(function(request, response) {
    var path = url.parse(request.url).pathname;

    switch(path) {
        case '/':
            response.writeHead(200, {'Content-Type': 'text/html'});
            response.write('hello world');
            response.end();
            break;
        case '/comments':
            fs.readFile(__dirname + path + '.json', function(error, data) {
                if (error) {
                    response.writeHead(404);
                    response.write('opps this doesn\'t exist - 404');
                    response.end();
                } else {
                    response.writeHead(200, {'Content-Type': 'application/json'});
                    response.write(data);
                    response.end();
                }
            });
            break;
        default:
            response.writeHead(404);
            response.write('opps this doesn\'t exist - 404');
            response.end();
            break;
    }
});

server.listen(8001);
console.log('Listening on port 8001...');