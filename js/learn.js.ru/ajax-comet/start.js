var http = require('http');
var static = require('node-static');
var file = new static.Server('.');

http.createServer(function(req, res) {
  console.log(req.url);
  if (req.url == '/digits') {
    onDigits(req, res);
    return;
  } else  if (req.url == '/upload') {

    var length = 0;
    req.on('data', function(chunk) {
      // ничего не делаем с приходящими данными, просто считываем
      length += chunk.length;
      if (length > 50 * 1024 * 1024) {
        res.statusCode = 413;
        res.end("File too big");
      }
    }).on('end', function() {
      res.end('ok');
    });
  } else {
    file.serve(req, res);
  }
}).listen(80);

function onDigits(req, res) {
  res.writeHead(200, {
    'Content-Type': 'text/event-stream; charset=utf-8',
    'Cache-Control': 'no-cache'
  });

  var i = 0;

  var timer = setInterval(write, 1000);
  write();

  function write() {
    i++;

    if (i == 4) {
      res.write('event: bye\ndata: до свидания\n\n');
      clearInterval(timer);
      res.end();
      return;
    }

    res.write('data: ' + i + '\n\n');

  }
}

console.log('Server running on port 80');
