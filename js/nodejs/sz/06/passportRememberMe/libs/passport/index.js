const passport = require('koa-passport');
const config = require('config');
const LocalStrategy = require('./localStrategy');
const RememberMeStrategy = require('./rememberMeStrategy');
const RememberMeToken = require('../../models/rememberMeToken');

require('./serialize');

passport.use(LocalStrategy);

// ctx strategy stands aside from others, because it has no route
// works automatically, just as sessions (and essentialy is a session add-on)
passport.use(
  new RememberMeStrategy(
    config.rememberme,
    RememberMeToken.verify,
    RememberMeToken.issue
  )
);

module.exports = passport;
