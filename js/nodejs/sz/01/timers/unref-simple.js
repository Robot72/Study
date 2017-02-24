// kill me in 10 seconds
const timer = setTimeout(function() {
  console.log("done");
}, 10000);

// при добавлении этой строки выход будет тут же
timer.unref();
