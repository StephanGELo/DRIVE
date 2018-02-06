var Koa = require('koa');
var Router = require('koa-router');
var handler = require('./handler.js');
var db = require('../database/dbConnection.js');

var app = new Koa();
var router = new Router();

router.get('/', (ctx, next) => {
  // ctx.router available
  console.log('here on line 9, in get Function')
});

app.use(async ctx => {
  ctx.body = 'Hello0000 World';
});

app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(3000, () =>  {
  console.log("Listening on port 3000")
});









