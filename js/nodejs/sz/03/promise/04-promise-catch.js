// ВОПРОС - есть ли разница между .then(ok, fail) VS .then(ok).catch(fail) ?

new Promise( function(resolve, reject) {
  // ...
  reject(123)
})
.catch( function(err) {
  // ...
  console.log(err);
  return 'все хорошо'
})
.then( function(result) {
  // ...
  console.log(result);
}).catch( function(err) {
  // ...
});

// vs

// new Promise( function(resolve, reject) {
//   // ...
//   resolve()
// }).then(
//    function(result) { /*...*/ throw new Error("lala"); },
//    function(err) { /* ... */ }
// );
