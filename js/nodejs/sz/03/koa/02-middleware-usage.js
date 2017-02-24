// Typical middleware examples

const Koa = require('koa');
const fs = require('mz/fs');
const app = new Koa();

// 1. Wrap into a meta async function (count time, catch errors...)
app.use(async function(ctx, next) {
  console.log('--> request start', ctx.url);

  let time = new Date();

  await next();

  time = new Date() - time;

  console.log('<-- request end', time, 'ms');
  // node.js finished, but...
  // response body may be not yet fully sent out,
  // use on-finished for that (or see koa-logger how to track full body length)
});

// 2. Add goodies to ctx (or ctx.request/response, but not req/res)
app.use(async function(ctx, next) {
  console.log('--> add useful method to ctx');

  ctx.renderFile = async function (file) {
    ctx.body = await fs.readFile(file, 'utf-8');
  };

  await next(); // promise
});

/*
  Promise.resolve(1)
    .then(value => {
      sleep(1000); // promise
    })
    .then(_ => ...)
*/

/* // ..or add a method using context prototype  (but w/o current request at hands)
app.context.renderFile = async function (file) {
  this.body = await fs.readFile(file, 'utf-8');
};
*/

// 3. Do the work, assign ctx.body (or throw)
app.use(async function(ctx, next) {
  console.log('--> work, work!');

  if (ctx.url != '/') {
    ctx.throw(404);
  }

  await ctx.renderFile(__filename); // если без await, то не сработает!

  console.log('<-- work complete, body constructed!');
});

app.listen(3000);
