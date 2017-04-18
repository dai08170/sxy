/**
 * Created by lonelydawn on 2017-03-09.
 */

const Koa = require('koa');
const route = require('koa-route');
const serve = require("koa-static");
const sendfile = require("koa-sendfile");
const compress = require('koa-compress');
const json = require('koa-json');
const bodyparser = require('koa-bodyparser');
const logger = require('koa-logger');
const session = require("koa-generic-session");
const FileStore = require("koa-generic-session-file");
const path = require("path");

// 自定义路由转发模块
const common = require("./routes/common");
const login = require("./routes/main/login");
const userManage = require("./routes/main/userManage");
const configManage = require("./routes/main/configManage");


const app = new Koa();

// middlewares
app.use(bodyparser());
app.use(json());
app.use(logger());
app.use(compress());
app.use(serve(path.join(__dirname, "public")));

app.keys = ["sxy", "mis"];

app.use(session({
    store: new FileStore()
}));

// 加载自定义转发配置中间件
app.use(common.config);

app.use(route.post('/api/login',login.login));

// 用户管理
app.use(route.get('/api/userManage/search',userManage.search));
app.use(route.post('/api/userManage/create',userManage.create));
app.use(route.post('/api/userManage/update',userManage.update));
app.use(route.post('/api/userManage/delete',userManage.delete));

// 配置管理
app.use(route.get('/api/configManage/getCurrent',configManage.getCurrent));
app.use(route.post('/api/configManage/create',configManage.create));


// nodejs 转发请求
app.use(route.get('/login',function * (){
    yield * sendfile.call(this, path.join(__dirname,'views/mis.html'));
}));

app.use(route.get('/main/*',function * (){
    yield * sendfile.call(this, path.join(__dirname,'views/mis.html'));
}));

app.use(route.get('/index/*',function * (){
    yield * sendfile.call(this, path.join(__dirname,'views/door.html'));
}));

app.use(route.get('/*',function * (){
    yield * sendfile.call(this, path.join(__dirname,'views/door.html'));
}));

app.listen(3000);
console.log("listening at port 3000!");

module.exports = app;