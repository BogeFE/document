const get       = require('./util').get;
const http      = require('http');
const Koa       = require('koa');
const serve     = require('koa-static');
const Router    = require('koa-router');
const webpush = require('web-push');
const bodyParser = require('koa-bodyparser');

const app = new Koa();
const router = new Router();
app.use(bodyParser());
webpush.setVapidDetails(
    'mailto:byele555@gmail.com',
    'BABiocj2nS_gAq7qD_lLDVdT00BWqKV-RBUnlfOHFeovfShDKB2n2j_rJOmNmHXd76mVYLpomKJXpcARKk4fgUo',
    'BOai5TsFhZ9wf05GvoOeK0HTKHmN62CE2sKzb_BNPh0'
)
webpush.setGCMAPIKey('303650752060')
const pushSubscriptionSet = new Set()

const port = process.env.PORT || 8088;


router.get('/test1', async (ctx, next) => {
    ctx.response.body = "console.log('我是test1的返回')";
});
router.post('/subscribe', async (ctx, next) => {
    console.log( ctx.body, ctx.request.body);
    // console.log(ctx.request.body);
    pushSubscriptionSet.add(ctx.request.body);
    ctx.response.body = "请求成功";
});
router.get('/test2', async (ctx, next) => {
    ctx.response.body = "console.log('我是test2的返回')";
});
app.use(router.routes());
app.use(serve(__dirname + '/public'));
app.listen(port, () => {
    console.log(`listen on port: ${port}`);
});
setInterval(function () {
    // console.log('开始发送---');
    // console.log(pushSubscriptionSet.size);
if (pushSubscriptionSet.size > 0) {
    // console.log('我请求很多----');
    pushSubscriptionSet.forEach(function (pushSubscription) {
        // console.log(pushSubscription);
    webpush.sendNotification(pushSubscription, JSON.stringify({
        title: '你好',
        body: '我叫大巫',
        icon: 'https://path/to/icon',
        url: 'http://localhost'
    })).then((e) => {
        console.log('发送成功----', e);
    }).catch((e) => {
        console.log(e);
    })
    })
}
}, 10 * 60)