/**
 * Created by lonelydawn on 2017-04-20.
 */

var config = require("../../config");

module.exports = {
    getAll : function *(){
        var options = {
            method : 'GET',
            url : config.url2 +"/leaderDuty/getAll",
            json: true
        };
        var res = yield this.routeConfig(options);
        this.status = res.statusCode;
        this.body = res.body;
    }
};