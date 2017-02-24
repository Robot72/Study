// В этом коде не обрабатываются ошибки.
// Какие? Что надо исправить?

const url = require('url');
const zlib = require('zlib');
const http = require('http');
const fs = require('fs');

function fetch(srcUrl, destPath, callback) {

  const requestOptions = url.parse(srcUrl);
  requestOptions.headers = {'accept-encoding': 'gzip,deflate'};

  // request - поток, которые делает запрос
  const request = http.get(requestOptions);

  // response - поток, из которого мы читаем ответ
  request.on('response', response => {

    if (response.headers['content-encoding']) {
      response = response
        .pipe(zlib.createUnzip());
    }

    response
      .pipe(fs.createWriteStream(destPath))
      .on('finish', callback);

  });
}


fetch('http://ya.ru', './result.html', err => {
  if (err)
    console.error(err);
  else
    console.log("OK!");
});
