'use strict';

const request = require('request');
const Koa = require('koa');
const router = require('koa-route');
const bodyParser = require('koa-bodyparser');

const app = new Koa();

app.use(bodyParser({
  extendTypes: {
    // Because AWS SNS likes to send json messages with text/plain...
    json: ['text/plain']
  }
}));

app.use(router.post('/receive', (ctx) => {
  const messageType = ctx.headers['x-amz-sns-message-type'];

  if (messageType === 'SubscriptionConfirmation') {
    const url = ctx.request.body.SubscribeURL;
    request(url, (err, request, body) => {
      console.error('Got an error confirming the subscription.');
      console.error(err, body);
    });
  } else {
    console.log('Received a new message:', ctx.request.body.Message);
  }
}));

app.listen(9000);
