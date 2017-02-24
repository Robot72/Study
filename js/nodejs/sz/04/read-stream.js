'use strict';

function readStream(stream) {
  let missedErrors = [];
  stream.on('error', err => missedErrors.push(err));

  return function() {
    return new Promise((resolve, reject) => {
      let error = missedErrors.shift();
      if (error) return reject(error);

      stream.on('data', ondata);
      stream.on('error', onerror);
      stream.on('end', onend);
      stream.resume();

      function ondata(chunk) {
        stream.pause(); // until new promise is created, stream doesn't generate new data
        cleanup();
        resolve(chunk);
      }

      function onend() {
        cleanup();
        resolve();
      }

      function onerror(err) {
        cleanup();
        reject(err);
      }

      function cleanup() {
        stream.removeListener('data', ondata);
        stream.removeListener('error', onerror);
        stream.removeListener('end', onend);
      }
    });
  };

}

const fs = require('fs');

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

async function read(path) {

  let stream = fs.createReadStream(path, {highWaterMark: 60, encoding: 'utf-8'});

  let data;
  let reader = readStream(stream);

  while(data = await reader()) {

    await sleep(1000);

    console.log(data);
  }


}

read(__filename).catch(console.error);
