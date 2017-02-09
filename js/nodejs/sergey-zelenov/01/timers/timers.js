// В какой момент срабатывают - до или после чтения файла?
const fs = require('fs');

fs.open(__filename, 'r', (err, fd) => {
  console.log('IO!');
});

for (let i = 0; i < 3; i++) {
  setImmediate(() => {
    console.log('immediate');
  });

  new Promise(resolve => {
    resolve('promise');
  }).then(console.log);

  process.nextTick(() => {
    console.log('nextTick');
  });
}

console.log('start!');

/*
  JS -> I/O -> JS -> I/O -> ...
*/
