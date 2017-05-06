/**
 * Created by lonelydawn on 2017-05-05.
 */

const config = require("../../config");

module.exports = {
    getPage : function *(){
        var options = {
            method : 'GET',
            url : config.url2 +"/teacherManage/getPage",
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
    update : function *(){
        var options = {
            method : 'POST',
            url : config.url2 +"/teacherManage/update",
            json: {
                "id": this.request.body.id,
                "name": this.request.body.name,
                "sex": this.request.body.sex,
                "profile_number": this.request.body.profile_number,
                "salary": this.request.body.salary,
                "state": this.request.body.state
            }
        };
        var res = yield this.routeConfig(options);
        this.status = res.statusCode;
        this.body = res.body;
    }
};