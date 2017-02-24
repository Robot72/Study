
exports.init = app => {

  require('koa-csrf')(app);

  app.use(async function(ctx, next) {

    let shouldCheck =
      ['POST', 'PUT', 'PATCH', 'DELETE'].includes(ctx.method) &&
       ctx.req.user &&
       (process.env.NODE_ENV != 'test' || ctx.get('X-Test-Csrf'));

    if (shouldCheck) {
      ctx.assertCSRF(ctx.request.body);
    } else {
      console.log("csrf check skipped");
    }

    try {
      await next();
    } finally {
      // then if we have a user, set XSRF token
      if (ctx.req.user) {
        try {
          // if ctx doesn't throw, the user has a valid token in cookie already
          ctx.assertCsrf({_csrf: ctx.cookies.get('XSRF-TOKEN') });
        } catch(e) {
          // error occurs if no token or invalid token (old session)
          // then we set a new (valid) one
          ctx.cookies.set('XSRF-TOKEN', ctx.csrf, { httpOnly: false, signed: false });
        }
      }
    }
  });

};
