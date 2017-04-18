/**
 * Created by lonelydawn on 2017-04-17.
 */

var config = require("../config");

module.exports = {
    search : function *(){
        var options = {
            method : 'GET',
            url : config.url2 +"/userManage/search",
            json: true,
            headers: {
                username : this.request.query.username
            }
        };
        var res = yield this.routeConfig(options);
        this.status = res.statusCode;
        this.body = res.body;
    },
    create : function *(){
        var options = {
            method : 'POST',
            url : config.url2 +"/userManage/create",
            json: {
                name : this.request.body.name,
                username : this.request.body.username,
                password : this.request.body.password,
                type : this.request.body.type
            }
        };
        var res = yield this.routeConfig(options);
        this.status = res.statusCode;
        this.body = res.body;
    },
    update : function *(){
        var options = {
            method : 'POST',
            url : config.url2 +"/userManage/update",
            json: {
                name: this.request.body.name,
                username : this.request.body.username,
                password : this.request.body.password,
                type : this.request.body.type,
                state : this.request.body.state
            }
        };
        var res = yield this.routeConfig(options);
        this.status = res.statusCode;
        this.body = res.body;
    },
    delete : function *(){
        var options = {
            method : 'POST',
            url : config.url2 +"/userManage/delete",
            json: {
                username : this.request.body.username
            }
        };
        var res = yield this.routeConfig(options);
        this.status = res.statusCode;
        this.body = res.body;
    }
};