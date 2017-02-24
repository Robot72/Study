// Connecting w/ mongoose, schema, model, basic queries
const mongoose = require('mongoose');
mongoose.Promise = Promise;
mongoose.set('debug', true);

mongoose.connect('mongodb://localhost/test');

// can use in many other models
const authProviderSchema = new mongoose.Schema({
  name:    {
    type: String, // "facebook", "google" etc
    required: true
  },
  profile: {} // social network profile
});


const userSchema = new mongoose.Schema({
  email: {
    type:       String,
    // встроенные сообщения об ошибках (можно изменить):
    // http://mongoosejs.com/docs/api.html#error_messages_MongooseError.messages
    required:   'Укажите email', // true for default message
    unique:     true,
    validate: [{
      validator: function checkEmail(value) {
        return /^[-.\w]+@([\w-]+\.)+[\w-]{2,12}$/.test(value);
      },
      msg: 'Укажите, пожалуйста, корректный email.'
    }],
    lowercase:  true, // to compare with another email
    trim:       true
  },
  authProviders:     [authProviderSchema],
  gender: {
    type:       String,
    enum:       ['M', 'F'], // enum validator
    default:    'M'
  }
}, {
  timestamps: true
});


// публичные (доступные всем) поля
userSchema.methods.getPublicFields = function() {
  return {
    email: this.email,
    gender: this.gender
  };
};

const User = mongoose.model('User', userSchema);

const mary = new User({
    email: 'mary@mail.com'
});

console.log(mary);
console.log(mary.getPublicFields());

// no error handling here (bad)
User.remove({}, function(err) {

  mary.save(function(err, result) {
    console.log(result);

    User.findOne({
      email: 'mary@mail.com'
    }, function(err, user) {
      console.log(user);

      // ... do more with mary

      // no unref!
      mongoose.disconnect();
    });

  });

});
