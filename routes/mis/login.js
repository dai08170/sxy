/**
 * Created by lonelydawn on 2017-03-09.
 */

const config = require("../config");

module.exports = {
    login : function *(){
        var options = {
            method : 'POST',
            url : config.url2 +"/login",
            json: {
                username : this.request.body.username,
                password : this.request.body.password
            }
        };
        var res = yield this.routeConfig(options);
        this.status = res.statusCode;
        this.body = res.body;
    }
};