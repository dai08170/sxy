/**
 * Created by lonelydawn on 2017-04-20.
 */

var config = require("../../config");

module.exports = {
    create : function *(){
        var options = {
            method : 'POST',
            url : config.url2 +"/systemManage/create",
            json: {
                tableIndex: this.request.body.tableIndex,
                people_id : this.request.body.people_id,
                number : this.request.body.number,
                name : this.request.body.name,
                content : this.request.body.content
            }
        };
        var res = yield this.routeConfig(options);
        this.status = res.statusCode;
        this.body = res.body;
    },
    delete : function *(){
        var options = {
            method : 'POST',
            url : config.url2 +"/systemManage/delete",
            json: {
                tableIndex: this.request.body.tableIndex,
                number : this.request.body.number
            }
        };
        var res = yield this.routeConfig(options);
        this.status = res.statusCode;
        this.body = res.body;
    }
};