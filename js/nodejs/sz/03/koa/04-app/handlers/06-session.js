// in-memory store by default (use the right module instead)
const session = require('koa-generic-session');
const convert = require('koa-convert');

exports.init = app => app.use(convert(session({
  cookie: {
    signed: false
  }
})));

/*
  const sessions = {};

  app.use(async (ctx) => {
    // get cookie
    const id = randomUUID()
    sessions[id] = {};
    // set cookie
  })
*/
