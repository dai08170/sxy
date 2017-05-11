/**
 * Created by lonelydawn on 2017-05-11.
 */

const config = require("../../config");

module.exports = {
    getTeacherCourseTable : function *(){
        var options = {
            method : 'GET',
            url : config.url2 +"/courseConstruct/getTeacherCourseTable",
            json: true,
            headers: {
                id : this.request.query.id
            }
        };
        var res = yield this.routeConfig(options);
        this.status = res.statusCode;
        this.body = res.body;
    }
};