// Какие здесь возможны ошибки? Как правильно?

const zlib = require('zlib');
const fs = require('fs');

fs.createReadStream('test.gz')
  .pipe(zlib.createGunzip())
  .pipe(fs.createWriteStream('test'))
  .on('finish', () => {
    console.log("DONE");
  });
