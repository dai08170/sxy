/**
 * Created by lonelydawn on 2017-05-10.
 */

const config = require("../../config");

module.exports = {
    getDistribution : function *(){
        var options = {
            method : 'GET',
            url : config.url2 +"/courseDistribute/getDistribution",
            json: true,
            headers: {
                classId : this.request.query.class_id
            }
        };
        var res = yield this.routeConfig(options);
        this.status = res.statusCode;
        this.body = res.body;
    },
    distribute  : function *(){
        var options = {
            method : 'POST',
            url : config.url2 +"/courseDistribute/distribute",
            json: {
                "creator_id": this.request.body.creator_id,
                "class_id": this.request.body.class_id,
                "course_id": this.request.body.course_id,
                "allocation": this.request.body.allocation,
                "address": this.request.body.address,
                "begin_week": this.request.body.begin_week,
                "end_week": this.request.body.end_week
            }
        };
        var res = yield this.routeConfig(options);
        this.status = res.statusCode;
        this.body = res.body;
    },
    deleteDistribution : function *(){
        var options = {
            method : 'GET',
            url : config.url2 +"/courseDistribute/deleteDistribution",
            json: true,
            // header信息中不得包含下划线, 汉字等非法字符
            headers: {
                classId: this.request.body.class_id,
                allocation : this.request.body.allocation
            }
        };
        var res = yield this.routeConfig(options);
        this.status = res.statusCode;
        this.body = res.body;
    }
};