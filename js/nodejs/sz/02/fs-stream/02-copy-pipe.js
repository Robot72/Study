// Копирование файлов
// Проблема - какая? Зачем pipe?
const fs = require('fs');

// try to create readstream from file
const fileIn = fs.createReadStream(__filename, {highWaterMark: 100});

const fileOut = fs.createWriteStream(__filename + ".out", {highWaterMark: 100});

/*
  fs.readFile(__filename, (err, file) => res.end(file.toString()))
*/

fileIn.on('data', data => {
  console.log(fileOut.write(data));
});

fileIn.on('close', () => {
  fileOut.close();
});


//fileIn.pipe(fileOut);
