/**
 * Created by lonelydawn on 2017-05-12.
 */

const config = require("../../config");

module.exports = {
    getSum : function *(){
        var options = {
            method : 'GET',
            url : config.url2 +"/accountManage/getSum",
            json: true
        };
        var res = yield this.routeConfig(options);
        this.status = res.statusCode;
        this.body = res.body;
    },
    getPage : function *(){
        var options = {
            method : 'GET',
            url : config.url2 +"/accountManage/getPage",
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
    getAccountByType : function *(){
        var options = {
            method : 'GET',
            url : config.url2 +"/accountManage/getAccountByType",
            json: true,
            headers: {
                type: encodeURI(this.request.query.type),
                beginDate: encodeURI(this.request.query.beginDate),
                endDate: encodeURI(this.request.query.endDate)
            }
        };
        var res = yield this.routeConfig(options);
        this.status = res.statusCode;
        this.body = res.body;
    },
    create : function *(){
        var options = {
            method : 'POST',
            url : config.url2 +"/accountManage/create",
            json: {
                name : this.request.body.name,
                val : this.request.body.val,
                type : this.request.body.type,
                action: this.request.body.action,
                creator_id: this.request.body.creator_id
            }
        };
        var res = yield this.routeConfig(options);
        this.status = res.statusCode;
        this.body = res.body;
    },
    update : function *(){
        var options = {
            method : 'POST',
            url : config.url2 +"/accountManage/update",
            json: {
                id : this.request.body.id,
                name : this.request.body.name,
                val : this.request.body.val,
                type : this.request.body.type,
                action: this.request.body.action,
                creator_id: this.request.body.creator_id
            }
        };
        var res = yield this.routeConfig(options);
        this.status = res.statusCode;
        this.body = res.body;
    },
    delete : function *(){
        var options = {
            method : 'POST',
            url : config.url2 +"/accountManage/delete",
            json: {
                id : this.request.body.id
            }
        };
        var res = yield this.routeConfig(options);
        this.status = res.statusCode;
        this.body = res.body;
    }
};