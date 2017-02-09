'use strict';

const http = require('http');
const fs = require('fs');

const clients = [];

const server = http.createServer(function(req, res) {

  switch (req.method + ' ' + req.url) {
  case 'GET /':
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    sendFile("index.html", res);
    break;

  case 'GET /subscribe':
    // console.log("subscribe");

    res.on('close', function() {
      // console.log("subscribe - close");
      clients.splice(clients.indexOf(res), 1);
    });

    clients.push(res);
    break;

  case 'POST /publish':
    // console.log("publish");
    req.setEncoding('utf-8');

    let body = '';

    req
      .on('data', function(data) {
        // -----> размер body может быть слишком большим
        body += data;

        if (body.length > 512) { // маленькое значение важно для теста, т.к. end срабатывает
          res.statusCode = 413;
          res.end("Your message is too big for my little chat");
        }
      })
      .on('end', function() {
        // "end" triggers when all data consumed
        // even if it's too big
        if (res.statusCode == 413) return;
        
        try {
          body = JSON.parse(body);
          if (!body.message) {
            throw new SyntaxError("No message");
          }
          body.message = String(body.message);
        } catch (e) {
          res.statusCode = 400;
          res.end("Bad Request");
          return;
        }

        // console.log("publish '%s' to %d", body.message, clients.length);

        // заметим: не может быть,
        // чтобы в процессе этого цикла добавились новые соединения или закрылись текущие
        clients.forEach(function(res) {
          res.setHeader('Cache-Control', "no-cache, no-store, private");
          res.end(body.message);
        });

        clients.length = 0;

        res.end("ok");
      });

    break;

  default:
    res.statusCode = 404;
    res.end("Not found");
  }


});

// for tests if needed
server._clients = clients;

server.listen(3000);

module.exports = server;

function sendFile(fileName, res) {
  const fileStream = fs.createReadStream(fileName);
  fileStream
    .on('error', function() {
      res.statusCode = 500;
      res.end("Server error");
    })
    .pipe(res)
    .on('close', function() {
      fileStream.destroy();
    });
}
