/**
 * Created by lonelydawn on 2017-05-08.
 */

const config = require("../../config");

module.exports = {
    getStudent: function *() {
        var options = {
            method: 'GET',
            url: config.url2 + "/selfInfo/getStudent",
            json: true,
            headers: {
                "id": this.request.query.id
            }
        };
        var res = yield this.routeConfig(options);
        this.status = res.statusCode;
        this.body = res.body;
    },
    updateStudent: function *() {
        var options = {
            method: 'POST',
            url: config.url2 + "/selfInfo/updateStudent",
            json: {
                "id": this.request.body.id,
                "birth": this.request.body.birth,
                "phone_number": this.request.body.phone_number,
                "email": this.request.body.email,
                "department": this.request.body.department
            }
        };
        var res = yield this.routeConfig(options);
        this.status = res.statusCode;
        this.body = res.body;
    },
    updateStudentPhoto: function *() {
        var options = {
            method: 'POST',
            url: config.url2 + "/selfInfo/updateStudentPhoto",
            json: {
                "id": this.request.body.id,
                "photo_path": this.request.body.photo_path
            }
        };
        var res = yield this.routeConfig(options);
        this.status = res.statusCode;
        this.body = res.body;
    },
    getTeacher: function *() {
        var options = {
            method: 'GET',
            url: config.url2 + "/selfInfo/getTeacher",
            json: true,
            headers: {
                "id": this.request.query.id
            }
        };
        var res = yield this.routeConfig(options);
        this.status = res.statusCode;
        this.body = res.body;
    },
    updateTeacher: function *() {
        var options = {
            method: 'POST',
            url: config.url2 + "/selfInfo/updateTeacher",
            json: {
                "id": this.request.body.id,
                "birth": this.request.body.birth,
                "phone_number": this.request.body.phone_number,
                "email": this.request.body.email,
                "profile": this.request.body.profile,
                "type": this.request.body.type
            }
        };
        var res = yield this.routeConfig(options);
        this.status = res.statusCode;
        this.body = res.body;
    },
    updateTeacherPhoto: function *() {
        var options = {
            method: 'POST',
            url: config.url2 + "/selfInfo/updateTeacherPhoto",
            json: {
                "id": this.request.body.id,
                "photo_path": this.request.body.photo_path
            }
        };
        var res = yield this.routeConfig(options);
        this.status = res.statusCode;
        this.body = res.body;
    },
    updatePassword: function *() {
        var options = {
            method: 'POST',
            url: config.url2 + "/selfInfo/updatePassword",
            json: {
                "id": this.request.body.id,
                "password": this.request.body.password
            }
        };
        var res = yield this.routeConfig(options);
        this.status = res.statusCode;
        this.body = res.body;
    }
};