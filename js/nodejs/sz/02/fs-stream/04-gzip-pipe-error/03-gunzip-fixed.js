const zlib = require('zlib');
const fs = require('fs');

let fileIn = fs.createReadStream('bad.gz'); // error, no such file!
let fileOut = fs.createWriteStream('test');

fileIn
  .on('error', cleanup)
  .pipe(zlib.createGunzip()) // error, bad format!
  .on('error', cleanup)
  .pipe(fileOut) // error, perm denied!
  .on('error', cleanup)
  .on('close', () => {
    console.log("DONE");
  });

function cleanup() {
  fs.unlink('bad.gz', err => { // eslint-disable-line
    if (err.code != 'ENOENT') throw e;
  });
  fileIn.destroy();
  fileOut.destroy();
}
