// Ошибки уникальности

const mongoose = require('mongoose');
mongoose.Promise = Promise;
const beautifyUnique = require('mongoose-beautiful-unique-validation');

mongoose.connect('mongodb://localhost/test');

// вместо MongoError будет выдавать ValidationError (проще ловить и выводить)
mongoose.plugin(beautifyUnique);

const userSchema = new mongoose.Schema({
  email: {
    type:     String,
    required: 'Укажите email', // true for default message
    unique:   'Такой email уже есть' // mongoose-beautiful-unique-validation uses this
  }
});

const User = mongoose.model('User', userSchema);

(async () => {

  await User.remove({});

  await User.create({email: 'pete@gmail.com'});
  await User.create({email: 'pete@gmail.com'});

})()
.catch(err => console.error(err))
.then(() => mongoose.disconnect());
