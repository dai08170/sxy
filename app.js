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
const multer = require("koa-router-multer");

// 配置图片上传插件参数
var Storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, "public/uploads");
    },
    filename: function (req, file, callback) {
        callback(null, file.originalname);
    }
});
var upload = multer({ storage: Storage });

// 自定义路由转发模块
const common = require("./routes/common");
const login = require("./routes/mis/login");

// 学院宣传
const collegePropagate =require("./routes/mis/collegePropagate/collegePropagate");
// 学院制度
const dailySystem = require("./routes/mis/collegeRegulation/dailySystem");
const leaderDuty = require("./routes/mis/collegeRegulation/leaderDuty");

// 基础管理
const userManage = require("./routes/mis/baseManage/userManage");
const classManage = require("./routes/mis/baseManage/classManage");
const courseManage = require("./routes/mis/baseManage/courseManage");
const propagateManage = require("./routes/mis/baseManage/propagateManage");
const systemManage = require("./routes/mis/baseManage/systemManage");
const authorityManage = require("./routes/mis/baseManage/authorityManage");
const infoManage = require("./routes/mis/baseManage/infoManage");
const configManage = require("./routes/mis/baseManage/configManage");


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
app.use(route.get('/api/userManage/getAllTeachers',userManage.getAllTeachers));
app.use(route.get('/api/userManage/getAllStudents',userManage.getAllStudents));
app.use(route.get('/api/userManage/search',userManage.search));
app.use(route.post('/api/userManage/create',userManage.create));
app.use(route.post('/api/userManage/update',userManage.update));
app.use(route.post('/api/userManage/delete',userManage.delete));

// 班级管理
app.use(route.get('/api/classManage/getClassType', classManage.getClassType));
app.use(route.get('/api/classManage/search',classManage.search));
app.use(route.post('/api/classManage/create',classManage.create));
app.use(route.post('/api/classManage/update',classManage.update));
app.use(route.post('/api/classManage/delete',classManage.delete));

// 课程管理
app.use(route.get('/api/courseManage/getCourseType', courseManage.getCourseType));
app.use(route.get('/api/courseManage/getAllCourses',courseManage.getAllCourses));
app.use(route.get('/api/courseManage/search',courseManage.search));
app.use(route.post('/api/courseManage/create',courseManage.create));
app.use(route.post('/api/courseManage/update',courseManage.update));
app.use(route.post('/api/courseManage/delete',courseManage.delete));

// 学院宣传
app.use(route.get('/api/collegePropagate/search', collegePropagate.search));

// 宣传管理
app.use(route.get('/api/propagateManage/getPage', propagateManage.getPage));
app.use(route.get('/api/propagateManage/getTotalItem', propagateManage.getTotalItem));
app.use(route.get('/api/propagateManage/getCurrent', propagateManage.getCurrent));
app.use(route.post('/api/propagateManage/createCompany', propagateManage.createCompany));
app.use(route.post('/api/propagateManage/createActivity', propagateManage.createActivity));
app.use(route.post('/api/propagateManage/createCourse', propagateManage.createCourse));
app.use(route.post('/api/propagateManage/createStudent', propagateManage.createStudent));
app.use(route.post('/api/propagateManage/updateCompany', propagateManage.updateCompany));
app.use(route.post('/api/propagateManage/updateActivity', propagateManage.updateActivity));
app.use(route.post('/api/propagateManage/updateCourse', propagateManage.updateCourse));
app.use(route.post('/api/propagateManage/updateStudent', propagateManage.updateStudent));
app.use(route.post('/api/propagateManage/delete', propagateManage.delete));
// 上传图片保存到node服务器端
app.use(route.post('/api/propagateManage/upload', upload.single('file')));

// 日常制度
app.use(route.get('/api/dailySystem/getAll', dailySystem.getAll));

// 领导职责
app.use(route.get('/api/leaderDuty/getAll', leaderDuty.getAll));

// 制度管理authorityManage
app.use(route.post('/api/systemManage/create',systemManage.create));
app.use(route.post('/api/systemManage/delete',systemManage.delete));

// 权限管理
app.use(route.get('/api/authorityManage/get',authorityManage.get));
app.use(route.post('/api/authorityManage/update',authorityManage.update));

// 信息管理
app.use(route.get('/api/infoManage/getAnnounceTypes',infoManage.getAnnounceTypes));
app.use(route.get('/api/infoManage/getPage',infoManage.getPage));
app.use(route.post('/api/infoManage/createAnnounce',infoManage.createAnnounce));
app.use(route.post('/api/infoManage/createMessage',infoManage.createMessage));
app.use(route.post('/api/infoManage/updateAnnounce',infoManage.updateAnnounce));
app.use(route.post('/api/infoManage/delete',infoManage.delete));

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