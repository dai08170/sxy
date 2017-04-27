/**
 * Created by lonelydawn on 2017-04-22.
 */

var config = require("../../config");

module.exports = {
    getPage: function *() {
        var options = {
            method: 'GET',
            url: config.url2 + "/propagateManage/getPage",
            json: true,
            headers: {
                "tableIndex": this.request.query.tableIndex,
                "pageNum": this.request.query.pageNum,
                "pageSize": this.request.query.pageSizenode
            }
        };
        var res = yield this.routeConfig(options);
        this.status = res.statusCode;
        this.body = res.body;
    },
    create: function *() {
        var options = {
            method: 'POST',
            url: config.url2 + "/configManage/create",
            json: {
                "tableIndex": this.request.body.tableIndex,
                "configItemData": this.request.body.configItemData
            }
        };
        var res = yield this.routeConfig(options);
        this.status = res.statusCode;
        this.body = res.body;
    }
};