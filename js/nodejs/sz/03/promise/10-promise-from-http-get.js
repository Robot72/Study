// promise use case

const http = require('http');

 function loadUrl(url) {
  return new Promise( function(resolve, reject) {

    http.get(url,  function(res) {
      if (res.statusCode != 200) { // ignore 20x and 30x for now
        reject(new Error(`Bad response status ${res.statusCode}.`));
        return;
      }

      let body = '';
      res.setEncoding('utf8');
      res.on('data',  function(chunk) {
        body += chunk;
      });
      res.on('end',  function() {
        resolve(body);
      });

    }) // ENOTFOUND (no such host ) or ECONNRESET (server destroys connection)
      .on('error', reject);
  });
}

// will not follow 301 redirect for
// const url = 'http://wikipedia.org/';

loadUrl('http://ya.ru').then( function(result) {
  console.log("Result:", result);
},  function(error) {
  console.error("Error", error);
});
