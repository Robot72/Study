const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type:   String,
    unique: true
  }
});

module.exports = mongoose.model('User', userSchema);
