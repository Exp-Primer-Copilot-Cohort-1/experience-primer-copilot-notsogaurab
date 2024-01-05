// Create a web server that can respond to requests for /comments.json 
// with a JSON representation of the comments list given above. 
// Make sure to add the necessary HTTP header to make the client understand 
// that the response contains JSON.

// You will need to use the JSON.stringify function to convert your object 
// data to a string before sending it to the client.

// You can learn more about Node.js modules here.

var http = require('http');
var fs = require('fs');
var url = require('url');
var comments = require('./comments.js');

var server = http.createServer(function (request, response) {
  var urlObj = url.parse(request.url, true);
  var pathname = urlObj.pathname;
  var query = urlObj.query;
  if (pathname === '/') {
    fs.readFile('./index.html', function (err, data) {
      if (err) {
        response.writeHead(404, 'Not Found');
        response.end();
      } else {
        response.setHeader('Content-Type', 'text/html;charset=utf-8');
        response.end(data);
      }
    });
  } else if (pathname === '/index.css') {
    fs.readFile('./index.css', function (err, data) {
      if (err) {
        response.writeHead(404, 'Not Found');
        response.end();
      } else {
        response.setHeader('Content-Type', 'text/css;charset=utf-8');
        response.end(data);
      }
    });
  } else if (pathname === '/index.js') {
    fs.readFile('./index.js', function (err, data) {
      if (err) {
        response.writeHead(404, 'Not Found');
        response.end();
      } else {
        response.setHeader('Content-Type', 'application/javascript;charset=utf-8');
        response.end(data);
      }
    });
  } else if (pathname === '/comments.json') {
    response.setHeader('Content-Type', 'application/json;charset=utf-8');
    response.end(JSON.stringify(comments));
  } else if (pathname === '/add') {
    comments.push(query);
    response.end();
  } else {
    response.writeHead(404, 'Not Found');
    response.end();
  }
});

server.listen(3000, function () {
  console.log('server listen port 3000');
});