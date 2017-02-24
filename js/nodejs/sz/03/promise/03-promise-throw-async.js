// Асинхронно throw уже не работает
// ВОПРОС: как получить более полный stacktrace?

const promise = new Promise( function(resolve, reject) {

  // then не перехватит это
  // нужно было reject!
  setTimeout(function() {
    throw new Error("WOPS");
  }, 1);

});


promise.then( function(result) {
  console.log("Result", result);
},  function(err) {
  console.log("Caught", err);
});
