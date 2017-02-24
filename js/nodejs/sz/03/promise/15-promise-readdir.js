const {
  readdir,
  stat,
} = require('mz/fs');

console.time('file sizes')
readdir(__dirname)
  .then(entries => {
    return Promise.all(
      entries.map(entry => stat(entry))
    );
  })
  .then(entries => entries.filter(entry => entry.isFile()))
  .then(stats => {
    return stats.map(stat => stat.size);
  })
  .then(sizes => {
    return sizes.reduce((sum, size) => sum + size);
  })
  .then(res => {
    console.timeEnd('file sizes');
    return res;
  })
  .then(console.log)
  .catch(console.error);
