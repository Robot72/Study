/**
 * 
 ЗАДАЧА
 Написать HTTP-сервер для загрузки и получения файлов
 - Все файлы находятся в директории files
 - Структура файлов НЕ вложенная.

 - Виды запросов к серверу
   GET /file.ext
   - выдаёт файл file.ext из директории files,

   POST /file.ext
   - пишет всё тело запроса в файл files/file.ext и выдаёт ОК
   - если файл уже есть, то выдаёт ошибку 409
   - при превышении файлом размера 1MB выдаёт ошибку 413

   DELETE /file
   - удаляет файл
   - выводит 200 OK
   - если файла нет, то ошибка 404

 Вместо file может быть любое имя файла.
 Так как поддиректорий нет, то при наличии / или .. в пути сервер должен выдавать ошибку 400.

- Сервер должен корректно обрабатывать ошибки "файл не найден" и другие (ошибка чтения файла)
- index.html или curl для тестирования

 */

// Пример простого сервера в качестве основы

'use strict';

let url = require('url');
let fs = require('fs');
//let mime = require('/usr/lib/node_modules/mime/mime');
let mime = require('mime');
let validation = require('./validation');
let streamWrap = require('./stream-wrap');


require('http').createServer(function(req, res) {

  let parsedURL = url.parse(req.url);
  let pathname = decodeURI(parsedURL.pathname);
  let directory = `${__dirname}/public/files`;
  
  switch(req.method) {
    //Получение файла
    case 'GET':
      if (pathname == '/') {
        
        fs.readFile(__dirname + '/public/index.html', (error, data) => {
          if (error) {
            console.error(error);
            res.statusCode(500);
            res.end('Sorry! Server error.');
          }
          res.setHeader('Content-Type', 'text/html;charset=utf-8');
          res.end(data);
        });
        return;
        
      } else {
        
        let validObj = validation.isValidPath(pathname, directory);
        
        if( validObj.valid ) {
          let mimeType = mime.lookup(validObj.filePath);
          res.setHeader('Content-Type', `${mimeType}; charset=utf-8`);
          
          streamWrap.readFile(validObj.filePath, res);
          
        } else {
          
          //console.log(validObj);
          res.statusCode = validObj.statusCode;
          res.end(validObj.message);
          
        }
      
      }
      break;
      
    //Загрузка файла на сервер  
    case 'POST': 
      
      //let validObj = validation.isValidPath(pathname, directory);
      pathname = pathname.slice(1);
      if(pathname.includes('/') || pathname.includes('..')) {
        res.statusCode = 400;
        res.end(`The filename isn't allow!`);
      } else if(pathname != '') {
        streamWrap.writeFile(pathname, req, res);
      } else {
        res.statusCode = 404;
        res.end('Page not found. Filename is empty.');
      }
      //res.end('goodtest');
      break;
      
    //Удаление файла
    case 'DELETE':
      break;

    default:
      res.statusCode = 502;
      res.end("Not implemented");
      break
      
  }

}).listen(3000);