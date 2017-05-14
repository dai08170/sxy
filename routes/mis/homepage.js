/**
 * Created by lonelydawn on 2017-05-14.
 */

const config = require("../config");

module.exports = {
    getCourseInfo : function *(){
        var options = {
            method : 'GET',
            url : config.url2 +"/homepage/getCourseInfo",
            json: true,
            headers : {
                studentId: this.request.query.studentId
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