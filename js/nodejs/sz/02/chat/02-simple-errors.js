// слишком простой чат, в коде есть минимум 7 серьёзных ошибок - КАКИХ?

const http = require('http');
const fs = require('fs');

let clients = [];

http.createServer((req, res) => {

  switch (req.method + ' ' + req.url) {
  case 'GET /':
    // ----> не обрабатывается ошибка при чтении файла
    // ----> не обрабатывается закрытие соединение (файл останется открытым)
    // ----> хорошо бы указать Content-Type: text/html (недочёт)
    fs.createReadStream('index.html').pipe(res);
    break;

  case 'GET /subscribe':
    console.log("subscribe");
    // ----> при закрытии соединения, оно не убирается из clients
    clients.push(res);
    break;

  case 'POST /publish':
    // -----> запрос может быть разбит посередине utf-символа (запрос может быть бинарным, default encoding нет)

    let body = '';

    req
      .on('data', data => {
        // -----> размер body может быть слишком большим
        body += data;
      })
      .on('end', () => {

        // ----> некорректный JSON выдаст исключение и повалит сервер
        body = JSON.parse(body);

        // ---> если body.message не существует
        // или не строка, а, к примеру, число, то res.end вылетит с ошибкой
        console.log("publish '%s'", body.message);

        // заметим: не может быть,
        // чтобы в процессе этого цикла добавились новые соединения или закрылись текущие
        clients.forEach(res => {
          // ----> добавить no-cache заголовки, чтобы GET не кешировало
          res.end(body.message);
        });

        clients = [];

        res.end("ok");
      });

    break;

  default:
    res.statusCode = 404;
    res.end("Not found");
  }


}).listen(3000);
