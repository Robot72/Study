const fs = require('fs');

const fileStream = fs.createReadStream('bad-char.txt', {
  highWaterMark: 9 // читать по 9 байт для наглядности
});

let content = '';
fileStream.on('data', data => {
  content += data;
});

fileStream.on('end', () => {
  // битые символы!
  console.log(content);
});

/*
// наглядно видно ошибку
fileStream.on('data', function(data) {
  console.log(data.toString());
});
*/
