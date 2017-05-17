/**
 * Created by lonelydawn on 2017-05-14.
 */

const config = require("../config");

module.exports = {
    getStudentCourseInfo : function *(){
        var options = {
            method : 'GET',
            url : config.url2 +"/homepage/getStudentCourseInfo",
            json: true,
            headers : {
                studentId: this.request.query.id
            }
        };
        var res = yield this.routeConfig(options);
        this.status = res.statusCode;
        this.body = res.body;
    },
    getTeacherCourseInfo : function *(){
        var options = {
            method : 'GET',
            url : config.url2 +"/homepage/getTeacherCourseInfo",
            json: true,
            headers : {
                teacherId: this.request.query.id
            }
        };
        var res = yield this.routeConfig(options);
        this.status = res.statusCode;
        this.body = res.body;
    },
    getPropagate : function *(){
        var options = {
            method : 'GET',
            url : config.url2 +"/homepage/getPropagate",
            json: true,
            headers : {
                tableIndex: this.request.query.tableIndex
            }
        };
        var res = yield this.routeConfig(options);
        this.status = res.statusCode;
        this.body = res.body;
    }

};