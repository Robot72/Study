'use strict'

let fs = require('fs');
let config = require('config');

/**
 * Считывает файл асинхронно и перенаправляет поток данных в http-ответ веб-сервера
 *
 * @param {string} fileName путь к файлу
 * @param {Response} response объект ответа
 * @returns {undefined}
 */
function readFile(fileName, response) {
  let file = fs.ReadStream(fileName);

  file.pipe(response);

  file.on('error', function (error) {
    console.error(error);
    response.statusCode = 500;
    response.end('error');
  });

  file
    .on('open', () => {
      console.log('open');
    })
    .on('close', () => {
      console.log('close');
    });

  response.on('close', function () {
    file.destroy();
  });

}

function writeFile(fileName, request, response) {
  fileName = config.get('publicDir') + fileName;
  let writable = fs.WriteStream(fileName, {flags: 'wx'});

  let size = 0;

  request
    .on('data', chunk => {
      size += chunk.length;

      if( size > config.get('maxSize') ) {
        response.statusCode = 413;
        response.setHeader('Connection', 'close');
        response.end('File is too big!');
        writable.destroy();
        fs.unlink(fileName, err => {
          console.error(err);
        });
      }
    })
    .on('close', err => {
      writable.destroy();
      fs.unlink(fileName, err => {
        console.error(err);
      });
    })
    .pipe(writable);

  writable.on('error', (err) => {
    if(err.code === 'EEXIST') {
      response.statusCode = 409;
      response.end('File already exists');
    } else {
      console.error(err);
      if(!response.headersSent) {
        response.writeHead(500, {'Connection': 'close'});
        response.write('Internal error');
      }
      response.end();
      fs.unlink(fileName, err => {

      });
    }
  })
  .on('close', () => {
    console.log('good wrote!');
    response.end('Ok');
  });
}

module.exports.readFile = readFile;
module.exports.writeFile = writeFile;
