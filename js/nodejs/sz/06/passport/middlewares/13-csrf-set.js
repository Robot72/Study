
exports.init = app => app.use(async function(ctx, next) {
  try {
    // first, do the middleware, maybe authorize user in the process
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
