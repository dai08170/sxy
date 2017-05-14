/**
 * Created by lonelydawn on 2017-05-14.
 */

const config = require("../../config");

module.exports = {
    getPage : function *(){
        var options = {
            method : 'GET',
            url : config.url2 +"/courseConstruct/getAbsenceRecordPage",
            json: true,
            headers: {
                pageNum : this.request.query.pageNum,
                pageSize : this.request.query.pageSize,
                keyword: encodeURI(this.request.query.keyword),
                studentId : this.request.query.studentId
            }
        };
        var res = yield this.routeConfig(options);
        this.status = res.statusCode;
        this.body = res.body;
    }
};