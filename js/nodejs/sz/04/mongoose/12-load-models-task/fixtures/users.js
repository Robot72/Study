const oid = require('../oid');

// mongoose.model('User')
exports.User = [{
  _id:      oid('user-mk'),
  email:    "mk@javascript.ru"
}, {
  _id:      oid('user-iliakan'),
  email:    "iliakan@javascript.ru"
}];
