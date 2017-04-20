/**
 * Created by lonelydawn on 2017-04-18.
 */

var config = require("../../config");

module.exports = {
    getCurrent : function *(){
        var options = {
            method : 'GET',
            url : config.url2 +"/configManage/getCurrent",
            json: true,
            headers: {
                "tableIndex": this.request.query.tableIndex
            }
        };
        var res = yield this.routeConfig(options);
        this.status = res.statusCode;
        this.body = res.body;
    },
    create: function *(){
        var options = {
            method : 'POST',
            url : config.url2 +"/configManage/create",
            json: {
                "tableIndex": this.request.body.tableIndex,
                "configItemData" : this.request.body.configItemData
            }
        };
        var res = yield this.routeConfig(options);
        this.status = res.statusCode;
        this.body = res.body;
    }
};