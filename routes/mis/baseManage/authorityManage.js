/**
 * Created by lonelydawn on 2017-05-05.
 */

const config = require("../../config");

module.exports = {
    get : function *(){
        var options = {
            method : 'GET',
            url : config.url2 +"/authorityManage/get",
            json: true,
            headers: {
                username: this.request.query.username
            }
        };
        var res = yield this.routeConfig(options);
        this.status = res.statusCode;
        this.body = res.body;
    },
    update : function *(){
        var options = {
            method : 'POST',
            url : config.url2 +"/authorityManage/update",
            json: {
                username: this.request.body.username,
                module: this.request.body.module,
                creator_id: this.request.body.creator_id
            }
        };
        var res = yield this.routeConfig(options);
        this.status = res.statusCode;
        this.body = res.body;
    }
};