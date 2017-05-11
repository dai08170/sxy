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
    getPage : function *(){
        var options = {
            method : 'GET',
            url : config.url2 +"/courseManage/getPage",
            json: true,
            headers: {
                pageNum : this.request.query.pageNum,
                pageSize : this.request.query.pageSize,
                keyword: encodeURI(this.request.query.keyword)
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
                num : this.request.body.num,
                teacher_id: this.request.body.teacher_id,
                name : this.request.body.name,
                score: this.request.body.score,
                type : this.request.body.type
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
                id : this.request.body.id,
                num : this.request.body.num,
                teacher_id: this.request.body.teacher_id,
                name : this.request.body.name,
                score: this.request.body.score,
                type : this.request.body.type
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
                id : this.request.body.id
            }
        };
        var res = yield this.routeConfig(options);
        this.status = res.statusCode;
        this.body = res.body;
    }
};