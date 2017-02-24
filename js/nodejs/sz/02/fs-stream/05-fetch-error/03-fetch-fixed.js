const zlib = require('zlib');
const http = require('http');
const fs = require('fs');
const url = require('url');

function fetch(srcUrl, destPath, callback) {

  const requestOptions = url.parse(srcUrl);
  requestOptions.headers = {'accept-encoding': 'gzip,deflate'};

  const request = http.get(requestOptions);
  let fstream;

  let hadError = false;

  // any error must cause a cleanup, unfinished file removal
  function onError(err) {
    hadError = true;
    if (fstream) fstream.destroy();
    fs.unlink(destPath, e => { // eslint-disable-line
      /* unlink fails if destPath does not exist, we ignore the fail */
      callback(err);
    });
  }

  request.on('error', onError);

  request.setTimeout(10000, () => {
    request.destroy();
    onError(new Error("Timeout"));
  });

  request.on('response', response => {

    if (response.headers['content-encoding']) {
      response = response
        .pipe(zlib.createUnzip())
        .on('error', onError); // bad gzip in response?
    }

    fstream =  fs.createWriteStream(destPath);

    response
      .pipe(fstream)
      // --->
      .on('error', onError) // not enough disk space? permission denied?
      .on('finish', () => {
        // finish always happens, but maybe the file is unfinished (or another error)
        if (!hadError) callback();
      });

  });
}



fetch('http://ya.ru', './result.html', err => {
  if (err) {
    console.error(err);
  } else {
    console.log("OK!");
  }
});
