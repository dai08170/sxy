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
    getAllClassNames : function *(){
        var options = {
            method : 'GET',
            url : config.url2 +"/classManage/getAllClassNames",
            json: true
        };
        var res = yield this.routeConfig(options);
        this.status = res.statusCode;
        this.body = res.body;
    },
    getPage : function *(){
        var options = {
            method : 'GET',
            url : config.url2 +"/classManage/getPage",
            json: true,
            headers: {
                pageNum : this.request.query.pageNum,
                pageSize : this.request.query.pageSize,
                keyword: encodeURI(this.request.query.keyword)
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
                num : this.request.body.num,
                name : this.request.body.name,
                type : this.request.body.type,
                profile: this.request.body.profile,
                state: this.request.body.state
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
                id : this.request.body.id,
                num : this.request.body.num,
                name : this.request.body.name,
                type : this.request.body.type,
                profile: this.request.body.profile,
                state: this.request.body.state
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
                id : this.request.body.id
            }
        };
        var res = yield this.routeConfig(options);
        this.status = res.statusCode;
        this.body = res.body;
    }
};