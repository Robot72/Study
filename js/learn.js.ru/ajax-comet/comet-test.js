var http = require('http');
var url = require('url');
var querystring = require('querystring');

function accept(req, res) {

  res.writeHead(200, {
    'Content-Type': 'text/json',
    'Cache-Control': 'no-cache'
  });
  console.log(req.url);
  res.end('{"status": "OK"}');
}

http.createServer(accept).listen(8080);

console.log('Server starting!');
