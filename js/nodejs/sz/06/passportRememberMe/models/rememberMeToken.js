
const mongoose = require('mongoose');
const crypto = require('crypto');

const RememberMeTokenSchema = new mongoose.Schema({
  user: {
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref:  'User'
  },

  value: {
    type: String,
    unique: true,
    default: function() {
      // 8-9 random alphanumeric chars
      return parseInt(crypto.randomBytes(5).toString('hex'), 16).toString(36);
    }
  },

  createdAt: {
    type: Date,
    default: new Date(),
    expires: 7 * 24 * 3600 // token lives for 7 days
  }
});

// find user by tokenValue and kill the token after success
RememberMeTokenSchema.statics.verify = function(tokenValue, done) {

  RememberMeToken.findOne({
    value: tokenValue
  }).populate('user')
    .exec(function(err, token) {
    if (err) return done(err);
    if (!token) return done(null, false);

    const user = token.user;

    token.remove(function(err) {
      if (err) return done(err);

      if (!user || user.deleted) {
        done(null, false);
      } else {
        done(null, user);
      }
    });

  });

};

// create a new token for user and return it's value
RememberMeTokenSchema.statics.issue = function(user, done) {

  const token = new RememberMeToken({
    user: user
  });

  token.save(function(err) {
    if (err) return done(err);
    return done(null, token.value);
  });

};

const RememberMeToken = mongoose.model('RememberMeToken', RememberMeTokenSchema);

module.exports = RememberMeToken;
