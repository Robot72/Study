exports.init = app => {

  app.use(async function(ctx, next) {

    // keep previous flash
    ctx.flashMessages = ctx.session.flashMessages || {};

    // clear all flash
    delete ctx.session.flashMessages;

    await next();

    // note that ctx.session can be null after other middlewares,
    // e.g. logout does session.destroy()
    if (!ctx.session) return;

    if (ctx.status == 302 && !ctx.session.flashMessages) {
      // pass on the flash over a redirect
      ctx.session.flashMessages = ctx.flashMessages;
    }
  });

  app.context.flash = async function(type, html) {

    if (!ctx.session.flashMessages) {
      ctx.session.flashMessages = {};
    }

    if (!ctx.session.flashMessages[type]) {
      ctx.session.flashMessages[type] = [];
    }

    ctx.session.flashMessages[type].push(html);
  };

};
