/**
 * Created by lonelydawn on 2017-05-04.
 */
const config = require("../../config");

module.exports = {
    getAnnounceTypes : function *(){
        var options = {
            method : 'GET',
            url : config.url2 +"/infoManage/getAnnounceTypes",
            json: true
        };
        var res = yield this.routeConfig(options);
        this.status = res.statusCode;
        this.body = res.body;
    },
    getPage : function *(){
        var options = {
            method : 'GET',
            url : config.url2 +"/infoManage/getPage",
            json: true,
            headers: {
                tableIndex : this.request.query.tableIndex,
                pageNum : this.request.query.pageNum,
                pageSize : this.request.query.pageSize,
                type: encodeURI(this.request.query.type || '%')
            }
        };
        var res = yield this.routeConfig(options);
        this.status = res.statusCode;
        this.body = res.body;
    },
    createAnnounce: function *(){
        var options = {
            method : 'POST',
            url : config.url2 +"/infoManage/createAnnounce",
            json: {
                tableIndex : this.request.body.tableIndex,
                content: this.request.body.content,
                type: this.request.body.type,
                creator_id: this.request.body.creator_id
            }
        };
        var res = yield this.routeConfig(options);
        this.status = res.statusCode;
        this.body = res.body;
    },
    createMessage: function *(){
        var options = {
            method : 'POST',
            url : config.url2 +"/infoManage/createMessage",
            json: {
                tableIndex : this.request.body.tableIndex,
                content: this.request.body.content,
                is_anonymous: this.request.body.is_anonymous,
                creator_id: this.request.body.creator_id
            }
        };
        var res = yield this.routeConfig(options);
        this.status = res.statusCode;
        this.body = res.body;
    },
    updateAnnounce: function *(){
        var options = {
            method : 'POST',
            url : config.url2 +"/infoManage/createAnnounce",
            json: {
                tableIndex : this.request.body.tableIndex,
                id : this.request.body.id,
                content: this.request.body.content,
                type: this.request.body.announceType,
                creator_id: this.request.body.creator_id
            }
        };
        var res = yield this.routeConfig(options);
        this.status = res.statusCode;
        this.body = res.body;
    },
    delete: function *(){
        var options = {
            method : 'POST',
            url : config.url2 +"/infoManage/delete",
            json: {
                tableIndex : this.request.body.tableIndex,
                id : this.request.body.id
            }
        };
        var res = yield this.routeConfig(options);
        this.status = res.statusCode;
        this.body = res.body;
    }
};