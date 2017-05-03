/**
 * Created by lonelydawn on 2017-05-03.
 */

const config = require("../../config");

module.exports = {
    search : function *(){
        var options = {
            method : 'GET',
            url : config.url2 +"/collegePropagate/search",
            json: true,
            headers: {
                txt: encodeURI(this.request.query.txt),
                pageNum: this.request.query.pageNum,
                pageSize: this.request.query.pageSize,
                tableIndex: this.request.query.tableIndex
            }
        };
        var res = yield this.routeConfig(options);
        this.status = res.statusCode;
        this.body = res.body;
    }
};