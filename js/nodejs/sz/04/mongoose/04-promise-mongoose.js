// Альтернативное API mongoose: промисы
// Задача: создать юзеров параллельно?

const mongoose = require('mongoose');
mongoose.Promise = Promise;

mongoose.connect('mongodb://localhost/test');

const User = mongoose.model('User', new mongoose.Schema({
  email:   {
    type:     String,
    required: true,
    unique:   true
  }
}));

// ВАЖНО: не последоватлеьные promise.then, promise.then, а чейнинг .then.then!
function createUsers() {
  /*
    User.remove({}) == Promise
  */
  return User.remove({}) // mpromise
    .then(function() {
      console.log("removed");

      return User.create({email: 'john@gmail.com'});
    }).then(function(user) {
      console.log("created", user._id);

      // try "john@gmail.com"
      return User.create({email: 'pete@gmail.com'});
    }).then(function(user) {
      console.log("created", user._id);

      return User.create({email: 'mary@gmail.com'});
    }).then(function(user) {
      console.log("created", user._id);
    });
}


createUsers().then(function() {
  console.log("OK");
}, function(err) {
  console.error(err);
}).then(function() {
  // previous "then" handles the error, so the execution comes here always
  // (if it didn't, the script would hang)
  mongoose.disconnect();
});
