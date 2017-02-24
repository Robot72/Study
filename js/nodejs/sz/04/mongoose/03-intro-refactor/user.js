const mongoose = require('./mongoose');

// this schema can be reused in another schema
const userSchema = new mongoose.Schema({
  email: {
    type:       String,
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
  gender: {
    type:       String,
    enum:       ['M', 'F'], // enum validator
    default:    'M'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('User', userSchema);
