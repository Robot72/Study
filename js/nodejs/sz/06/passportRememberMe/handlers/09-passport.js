const passport = require('../libs/passport');
const RememberMeToken = require('../models/rememberMeToken');
const config = require('config');

exports.init = app => {

  // - инициализовать ctx.req._passport (вспомогательный контекст паспорта, нам не понадобится)
  // - сделать на ctx методы
  //   ctx.login(user)
  //   ctx.logout()
  //   ctx.isAuthenticated()
  // @see https://github.com/rkusa/koa-passport/blob/master/lib/framework/koa.js
  // @see https://github.com/jaredhanson/passport/blob/master/lib/middleware/initialize.js
  app.use(passport.initialize());

  // авторизация по сессии
  app.use(passport.session());

  // авторизация по куке remember me
  app.use(passport.authenticate('remember-me'));

  app.context.rememberMe = async function() {
    const token = new RememberMeToken({
      user: ctx.user
    });
    await token.save();
    ctx.cookies.set(config.rememberme.options.key, token.value, config.rememberme.options.cookie);
  };

};
