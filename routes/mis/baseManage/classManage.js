/**
 * Created by lonelydawn on 2017-04-19.
 */

const config = require("../../config");

module.exports = {
    getClassType : function *(){
        var options = {
            method : 'GET',
            url : config.url2 +"/classManage/getClassType",
            json: true
        };
        var res = yield this.routeConfig(options);
        this.status = res.statusCode;
        this.body = res.body;
    },
    search : function *(){
        var options = {
            method : 'GET',
            url : config.url2 +"/classManage/search",
            json: true,
            headers: {
                number : this.request.query.number
            }
        };
        var res = yield this.routeConfig(options);
        this.status = res.statusCode;
        this.body = res.body;
    },
    create : function *(){
        var options = {
            method : 'POST',
            url : config.url2 +"/classManage/create",
            json: {
                number : this.request.body.number,
                name : this.request.body.name,
                type : this.request.body.type,
                profile : this.request.body.profile,
                state : this.request.body.state
            }
        };
        var res = yield this.routeConfig(options);
        this.status = res.statusCode;
        this.body = res.body;
    },
    update : function *(){
        var options = {
            method : 'POST',
            url : config.url2 +"/classManage/update",
            json: {
                number : this.request.body.number,
                name : this.request.body.name,
                type : this.request.body.type,
                profile : this.request.body.profile,
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
            url : config.url2 +"/classManage/delete",
            json: {
                number : this.request.body.number
            }
        };
        var res = yield this.routeConfig(options);
        this.status = res.statusCode;
        this.body = res.body;
    }
};