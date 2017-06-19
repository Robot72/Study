let static = require('node-static');
let http = require('http');

let file = new static.Server('./public');
http.createServer((request, response) => {
  request.addListener('end', () => {
    file.serve(request, response);
  }).resume();
}).listen(8000);
