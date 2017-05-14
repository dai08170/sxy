/**
 * Created by lonelydawn on 2017-05-12.
 */

const config = require("../../config");

module.exports = {
    getPage : function *(){
        var options = {
            method : 'GET',
            url : config.url2 +"/absenceManage/getPage",
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
    getAbsenceByCourse : function *(){
        var options = {
            method : 'GET',
            url : config.url2 +"/absenceManage/getAbsenceByCourse",
            json: true,
            headers: {
                classId: encodeURI(this.request.query.classId),
                beginDate: encodeURI(this.request.query.beginDate),
                endDate: encodeURI(this.request.query.endDate)
            }
        };
        var res = yield this.routeConfig(options);
        this.status = res.statusCode;
        this.body = res.body;
    },
    create : function *(){
        var options = {
            method : 'POST',
            url : config.url2 +"/absenceManage/create",
            json: {
                course_id: this.request.body.course_id,
                course_name: this.request.body.course_name,
                student_num: this.request.body.student_num,
                absence_date: this.request.body.absence_date,
                is_count: this.request.body.is_count,
                absence_reason: this.request.body.absence_reason
            }
        };
        var res = yield this.routeConfig(options);
        this.status = res.statusCode;
        this.body = res.body;
    },
    update : function *(){
        var options = {
            method : 'POST',
            url : config.url2 +"/absenceManage/update",
            json: {
                id : this.request.body.id,
                course_id: this.request.body.course_id,
                course_name: this.request.body.course_name,
                student_id: this.request.body.student_id,
                student_num: this.request.body.student_num,
                absence_date: this.request.body.absence_date,
                is_count: this.request.body.is_count,
                absence_reason: this.request.body.absence_reason
            }
        };
        var res = yield this.routeConfig(options);
        this.status = res.statusCode;
        this.body = res.body;
    },
    delete : function *(){
        var options = {
            method : 'POST',
            url : config.url2 +"/absenceManage/delete",
            json: {
                id : this.request.body.id
            }
        };
        var res = yield this.routeConfig(options);
        this.status = res.statusCode;
        this.body = res.body;
    }
};