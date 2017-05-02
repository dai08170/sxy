/**
 * Created by lonelydawn on 2017-04-25.
 */

const config = require("../../config");

module.exports = {
    getCourseType  : function *(){
        var options = {
            method : 'GET',
            url : config.url2 +"/courseManage/getCourseType",
            json: true
        };
        var res = yield this.routeConfig(options);
        this.status = res.statusCode;
        this.body = res.body;
    },
    getAllCourses : function *(){
        var options = {
            method : 'GET',
            url : config.url2 +"/courseManage/getAllCourses",
            json: true
        };
        var res = yield this.routeConfig(options);
        this.status = res.statusCode;
        this.body = res.body;
    },
    search : function *(){
        var options = {
            method : 'GET',
            url : config.url2 +"/courseManage/search",
            json: true,
            headers: {
                number : this.request.query.number
            }
        };
        var res = yield this.routeConfig(options);
        this.status = res.statusCode;
        this.body = res.body;
    },
    create : function *(){
        var options = {
            method : 'POST',
            url : config.url2 +"/courseManage/create",
            json: {
                number : this.request.body.number,
                name : this.request.body.name,
                type : this.request.body.type,
                teacher_id: this.request.body.teacher_id,
                score: this.request.body.score,
                begin_date: this.request.body.begin_date,
                end_date: this.request.body.end_date
            }
        };
        var res = yield this.routeConfig(options);
        this.status = res.statusCode;
        this.body = res.body;
    },
    update : function *(){
        var options = {
            method : 'POST',
            url : config.url2 +"/courseManage/update",
            json: {
                number : this.request.body.number,
                name : this.request.body.name,
                type : this.request.body.type,
                teacher_id: this.request.body.teacher_id,
                score: this.request.body.score,
                begin_date: this.request.body.begin_date,
                end_date: this.request.body.end_date
            }
        };
        var res = yield this.routeConfig(options);
        this.status = res.statusCode;
        this.body = res.body;
    },
    delete : function *(){
        var options = {
            method : 'POST',
            url : config.url2 +"/courseManage/delete",
            json: {
                number : this.request.body.number
            }
        };
        var res = yield this.routeConfig(options);
        this.status = res.statusCode;
        this.body = res.body;
    }
};