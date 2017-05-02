/**
 * Created by lonelydawn on 2017-04-22.
 */

const config = require("../../config");

module.exports = {
    getPage: function *() {
        var options = {
            method: 'GET',
            url: config.url2 + "/propagateManage/getPage",
            json: true,
            headers: {
                "tableIndex": this.request.query.tableIndex,
                "pageNum": this.request.query.pageNum,
                "pageSize": this.request.query.pageSize
            }
        };
        var res = yield this.routeConfig(options);
        this.status = res.statusCode;
        this.body = res.body;
    },
    getTotalItem: function *() {
        var options = {
            method: 'GET',
            url: config.url2 + "/propagateManage/getTotalItem",
            json: true,
            headers: {
                "tableIndex": this.request.query.tableIndex
            }
        };
        var res = yield this.routeConfig(options);
        this.status = res.statusCode;
        this.body = res.body;
    },
    getCurrent: function *() {
        var options = {
            method: 'GET',
            url: config.url2 + "/propagateManage/getCurrent",
            json: true,
            headers: {
                "tableIndex": this.request.query.tableIndex,
                "id": this.request.query.id
            }
        };
        var res = yield this.routeConfig(options);
        this.status = res.statusCode;
        this.body = res.body;
    },
    createCompany: function *() {
        var options = {
            method: 'POST',
            url: config.url2 + "/propagateManage/createCompany",
            json: {
                "table_index": this.request.body.table_index,
                "title": this.request.body.title,
                "content": this.request.body.content,
                "company_name": this.request.body.company_name,
                "company_type": this.request.body.company_type,
                "company_address": this.request.body.company_address,
                "phone_number": this.request.body.phone_number,
                "picture_path": this.request.body.picture_path,
                "creator_id": this.request.body.creator_id
            }
        };
        var res = yield this.routeConfig(options);
        this.status = res.statusCode;
        this.body = res.body;
    },
    createActivity: function *() {
        var options = {
            method: 'POST',
            url: config.url2 + "/propagateManage/createActivity",
            json: {
                "table_index": this.request.body.table_index,
                "title": this.request.body.title,
                "content": this.request.body.content,
                "type": this.request.body.type,
                "corporation": this.request.body.corporation,
                "phone_number": this.request.body.phone_number,
                "picture_path": this.request.body.picture_path,
                "creator_id": this.request.body.creator_id
            }
        };
        var res = yield this.routeConfig(options);
        this.status = res.statusCode;
        this.body = res.body;
    },
    createCourse: function *() {
        var options = {
            method: 'POST',
            url: config.url2 + "/propagateManage/createCourse",
            json: {
                "table_index": this.request.body.table_index,
                "course_id": this.request.body.course_id,
                "title": this.request.body.title,
                "content": this.request.body.content,
                "picture_path": this.request.body.picture_path,
                "creator_id": this.request.body.creator_id
            }
        };
        console.log(options);
        var res = yield this.routeConfig(options);
        this.status = res.statusCode;
        this.body = res.body;
    },
    createStudent: function *() {
        var options = {
            method: 'POST',
            url: config.url2 + "/propagateManage/createStudent",
            json: {
                "table_index": this.request.body.table_index,
                "student_id": this.request.body.student_id,
                "profile": this.request.body.profile,
                "honor": this.request.body.honor,
                "declaration": this.request.body.declaration,
                "photo_path": this.request.body.photo_path,
                "creator_id": this.request.body.creator_id
            }
        };
        var res = yield this.routeConfig(options);
        this.status = res.statusCode;
        this.body = res.body;
    },
    updateCompany: function *() {
        var options = {
            method: 'POST',
            url: config.url2 + "/propagateManage/updateCompany",
            json: {
                "table_index": this.request.body.table_index,
                "id": this.request.body.id,
                "title": this.request.body.title,
                "content": this.request.body.content,
                "company_name": this.request.body.company_name,
                "company_type": this.request.body.company_type,
                "company_address": this.request.body.company_address,
                "phone_number": this.request.body.phone_number,
                "picture_path": this.request.body.picture_path,
                "creator_id": this.request.body.creator_id
            }
        };
        var res = yield this.routeConfig(options);
        this.status = res.statusCode;
        this.body = res.body;
    },
    updateActivity: function *() {
        var options = {
            method: 'POST',
            url: config.url2 + "/propagateManage/updateActivity",
            json: {
                "table_index": this.request.body.table_index,
                "id": this.request.body.id,
                "title": this.request.body.title,
                "content": this.request.body.content,
                "type": this.request.body.type,
                "corporation": this.request.body.corporation,
                "phone_number": this.request.body.phone_number,
                "picture_path": this.request.body.picture_path,
                "creator_id": this.request.body.creator_id
            }
        };
        var res = yield this.routeConfig(options);
        this.status = res.statusCode;
        this.body = res.body;
    },
    updateCourse: function *() {
        var options = {
            method: 'POST',
            url: config.url2 + "/propagateManage/updateCourse",
            json: {
                "table_index": this.request.body.table_index,
                "id": this.request.body.id,
                "course_id": this.request.body.course_id,
                "title": this.request.body.title,
                "content": this.request.body.content,
                "picture_path": this.request.body.picture_path,
                "creator_id": this.request.body.creator_id
            }
        };
        console.log(options);
        var res = yield this.routeConfig(options);
        this.status = res.statusCode;
        this.body = res.body;
    },
    updateStudent: function *() {
        var options = {
            method: 'POST',
            url: config.url2 + "/propagateManage/updateStudent",
            json: {
                "table_index": this.request.body.table_index,
                "id": this.request.body.id,
                "student_id": this.request.body.student_id,
                "profile": this.request.body.profile,
                "honor": this.request.body.honor,
                "declaration": this.request.body.declaration,
                "photo_path": this.request.body.photo_path,
                "creator_id": this.request.body.creator_id
            }
        };
        var res = yield this.routeConfig(options);
        this.status = res.statusCode;
        this.body = res.body;
    },
    delete: function *() {
        var options = {
            method: 'POST',
            url: config.url2 + "/propagateManage/delete",
            json: {
                "table_index": this.request.body.table_index,
                "id": this.request.body.id
            }
        };
        var res = yield this.routeConfig(options);
        this.status = res.statusCode;
        this.body = res.body;
    }
};