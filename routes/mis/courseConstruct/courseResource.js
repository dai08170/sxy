/**
 * Created by lonelydawn on 2017-05-11.
 */

const config = require("../../config");

module.exports = {
    getStudentCoursePage : function *(){
        var options = {
            method : 'GET',
            url : config.url2 +"/courseConstruct/getStudentCoursePage",
            json: true,
            headers: {
                id : this.request.query.id,
                pageNum : this.request.query.pageNum,
                pageSize : this.request.query.pageSize,
                keyword : encodeURI(this.request.query.keyword)
            }
        };
        var res = yield this.routeConfig(options);
        this.status = res.statusCode;
        this.body = res.body;
    },
    getTeacherCoursePage : function *(){
        var options = {
            method : 'GET',
            url : config.url2 +"/courseConstruct/getTeacherCoursePage",
            json: true,
            headers: {
                id : this.request.query.id,
                pageNum : this.request.query.pageNum,
                pageSize : this.request.query.pageSize,
                keyword : encodeURI(this.request.query.keyword)
            }
        };
        var res = yield this.routeConfig(options);
        this.status = res.statusCode;
        this.body = res.body;
    },
    getResource : function *(){
        var options = {
            method : 'GET',
            url : config.url2 +"/courseConstruct/getResource",
            json: true,
            headers: {
                courseId: this.request.query.course_id
            }
        };
        var res = yield this.routeConfig(options);
        this.status = res.statusCode;
        this.body = res.body;
    },
    uploadResource : function *() {
        var options = {
            method: 'POST',
            url: config.url2 + "/courseConstruct/uploadResource",
            json: {
                "course_id": this.request.body.course_id,
                "title": this.request.body.title,
                "ware_path": this.request.body.ware_path
            }
        };
        var res = yield this.routeConfig(options);
        this.status = res.statusCode;
        this.body = res.body;
    }
};