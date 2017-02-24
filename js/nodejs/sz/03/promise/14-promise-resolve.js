// Когда Promise API возвращает синхронное значение: Promise.resolve
// (короткая альтернатива new Promise с тут же resolve)

const fs = require('fs');

const cache = new Map();

 function readFileCache(filePath) {
  if (cache[filePath]) {
    console.log("cache");
    return Promise.resolve(cache[filePath]);
  }

  return new Promise( function(resolve, reject) {
    fs.readFile(filePath,  function(err, res) {
      console.log("disk");
      if (err) return reject(err);

      cache[filePath] = res;
      resolve(res);
    });
  });

}

// Выведет:
// disk
// cache
// cache
readFileCache(__filename)
  .then( function(fileContent) {
    return readFileCache(__filename);
  }).then( function(fileContent) {
    return readFileCache(__filename);
  });

