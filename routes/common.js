/**
 * Created by lonelydawn on 2017-03-09.
 */

const request = require('co-request');
const ramda = require('ramda');

module.exports = {
    config: function *(next){
        this.routeConfig = function() {
            if(typeof arguments[0] === 'object') {
                if(typeof arguments[0].headers === 'object'){
                    arguments[0].headers.token = this.session.token;
                }else {
                    arguments[0].headers = {
                        token: this.session.token
                    };
                }

                if(undefined === arguments[0].timeout){
                    arguments[0].timeout = 25000;
                }
                console.error(arguments[0].headers);
            }
            console.error("请求headers:");
            console.error(arguments.headers);
            var session = this.session;
            return request.apply(request, arguments).then(function(res) {
                    if(res.headers != undefined && res.headers.token != undefined){
                        session.token = ramda.path(['headers','token'], res);
                        console.error("返回token:");
                        console.error(session.token);
                    }
                    return res;
                }
            );
        };
        yield next;
    }
};

