// ЗАДАЧА - сделать readFile, возвращающее promise

// ЗАДАЧА - прочитать все файлы текущей директории, используя новый readfile
// (последовательно или параллельно - как считаете нужным)
"use strict";
const fs = require('fs');

const mzfs = require('mz/fs');

/*
  fs.readFile(..., (err, content) => {}) // Thunk
*/

function readFile(filePath) {
  /* ваш код */
  return new Promise( (resolve, reject) => {
      // resolve(результат) при успешном выполнении
      // reject(ошибка) при ошибке
      fs.readFile(filePath, (err, data) =>{
          if( err ){
              return reject(err);
          }


          return resolve(data);
      });
  })
}

// readFile("__filename").then(console.log, console.error);

mzfs.readFile(__filename).then(console.log, console.error);
