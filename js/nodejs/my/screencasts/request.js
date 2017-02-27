var url = require('url');
var debug = require('debug')('server:request');

console.log( `${request.method} - ${request.url}` );
let parsedUrl = url.parse(request.url);
if(parsedUrl.pathname == '/echo' && parsedUrl.query == 'message=good') {
    response.end('Hello dear user!!!');        
} else {
    response.statusCode = 404;
    response.end('Page not found');
}