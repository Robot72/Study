let http = require('http');
let url = require('url');

var server = new http.Server( (request, response) => {
    
    console.log( `${request.method} - ${request.url}` );
    let parsedUrl = url.parse(request.url);
    if(parsedUrl.pathname == '/echo' && parsedUrl.query.message == 'good') {
        response.end('Hello dear user!!!');        
    } else {
        response.statusCode = 404;
        response.end('Page not found');
    }
    
}); 

server.listen(4444, '127.0.0.1');

