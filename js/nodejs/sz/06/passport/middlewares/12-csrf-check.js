
exports.init = app => app.use(async function(ctx, next) {
  // skip these methods
  if (ctx.method === 'GET' || ctx.method === 'HEAD' || ctx.method === 'OPTIONS') {
    return await next();
  }

  let checkCsrf = true;

  if (!ctx.req.user) {
    checkCsrf = false;
  }

  // If test check CSRF only when "X-Test-Csrf" header is set
  if (process.env.NODE_ENV == 'test' && !ctx.get('X-Test-Csrf')) {
    checkCsrf = false;
  }

  if (checkCsrf) {
    ctx.assertCSRF(ctx.request.body);
  } else {
    console.log("csrf check skipped");
  }

  await next();
});
