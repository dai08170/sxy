/**
 * Created by lonelydawn on 2017-04-20.
 */

/**
 * table index 如下:
 * 0 sxy_industry_type
 * 1 sxy_class_type
 * 2 sxy_course_type
 * 3 sxy_title_type
 * 4 sxy_role_type
 * 5 sxy_announce_type
 * 6 sxy_activity_type
 * 7 sxy_material_type
 * 8 sxy_account_type
 */

app.controller('propagateManageCtrl',['$scope', '$state','$http', '$cookies','toaster', 'FileUploader', function($scope, $state,$http, $cookies, toaster, FileUploader){
    $scope.pageSize = window.innerHeight < 771 ? 4 : 8;
    $scope.pageNum = 0;
    $scope.totalPages = 0;
    $scope.pageBtns = [];

    $scope.propagateTypes = global_data.propagate_types;
    $scope.propagateType = $scope.propagateTypes[0];
    $scope.propagateArr = [];

    $scope.activityTypes = undefined;
    $scope.activityType = undefined;

    $scope.courses = undefined;
    $scope.course = undefined;

    $scope.excellentStudents = undefined;
    $scope.excellentStudent = undefined;

    $scope.tableData =undefined;

    // 标识当前执行的动作 是否是创建
    $scope.createAction = true;
    $scope.propagateId = undefined;

    $scope.picturePath = "images/no.png";
    $scope.pictureName = "";

    // 初始化图片上传控制bar
    var uploader = $scope.uploader = new FileUploader({
        url: "/api/propagateManage/upload",
        filters: [{
            name: 'imageFilter',
            fn: function(item /*{File|FileLikeObject}*/, options) {
                var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
                return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
            }
        }],
        onAfterAddingFile: function(fileItem) {
            if(uploader.queue.length>1){
                uploader.queue[0] = uploader.queue[1];
                uploader.queue.length =1;
            }
        },
        onWhenAddingFileFailed: function(item /*{File|FileLikeObject}*/, filter, options) {
            toaster.pop("warning", "请选择正确的文件类型!", null, 2000, "toast-top-full-width");
        }
    });

    // 初始化配置项数据
    var init = function(){
        $http.get('/api/configManage/getCurrent?tableIndex=6').then(function(res){
            // 返回的是对象数组, 需要转换为字符串数组
            $scope.activityTypes = res.data;
        }, function (res) {
            toaster.pop("error", "已有配置项数据获取失败!"+(res.data.msg || ''), null, 2000, "toast-top-full-width");
        });

        $http.get('/api/courseManage/getAllCourses').then(function(res){
            // 返回的是对象数组, 需要转换为字符串数组
            $scope.courses = res.data;
        }, function (res) {
            toaster.pop("error", "已有配置项数据获取失败!"+(res.data.msg || ''), null, 2000, "toast-top-full-width");
        });

        $http.get("/api/userManage/getAllStudents").then(function (res) {
            if(res.data.length>0){
                $scope.excellentStudents = res.data;
            } else
                toaster.pop("danger", "无学生存在!请先创建学生!", null, 2000, "toast-top-full-width");
        }, function (res) {
            toaster.pop("danger", "服务器错误!", null, 2000, "toast-top-full-width");
        });
    };
    init();


    // 获取待上传图片
    $scope.getPicture = function(){
        // 判断是新建还是修改
        if($scope.pictureName == "") {
            var filename = uploader.queue[0].file.name
            filename = Date.now() + filename.substr(filename.lastIndexOf("."));
            uploader.queue[0].file.name = filename;
            $scope.picturePath = global_baseurl + filename;
            $scope.pictureName = filename;
        } else uploader.queue[0].file.name = $scope.pictureName;
        // 隐藏图片模态框
        $("#imageUploadModal").modal('hide');
    };

    // 显示企业宣传模态框
    $scope.companyTypeModalShow = function(){
        // 将对象数组转化为 字符串数组
        var getNameArray = function(arr){
            var tmpArr = [];
            for(var i=0; i<arr.length; i++)
                tmpArr[i] = arr[i].name;
            return tmpArr;
        };

        $http.get('/api/configManage/getCurrent?tableIndex=0').then(function(res){
            // 返回的是对象数组, 需要转换为字符串数组
            $scope.companyTypes = getNameArray(res.data);
            // 显示模态框
            $("#companyTypeModal").modal('show');
        }, function (res) {
            toaster.pop("error", "已有配置项数据获取失败!"+(res.data.msg || ''), null, 2000, "toast-top-full-width");
        });
    };

    // 路由分发创建宣传模态框
    $scope.createModalShow = function(){
        // 初始化公共项目
        var init = function(){
            $scope.propagateContent = undefined;

            $scope.picturePath = "images/no.png";
            $scope.pictureName = "";
            uploader.queue.length = 0;
        };
        // 初始化公司宣传模态框
        var initCompanyModal = function(){
            $scope.companyTitle = undefined;
            $scope.companyName = undefined;
            $scope.companyType = undefined;
            $(".company-type").removeClass("btn-info");
            $scope.companyAddress = undefined;
            $scope.companyPhone = undefined;
        };
        // 初始化活动宣传模态框
        var initActivityModal = function(){
            $scope.activityTitle = undefined;
            $scope.activityMan = undefined;
            $scope.activityPhone = undefined;
            $scope.activityType = $scope.activityTypes[0];
        };
        // 初始化课程宣传模态框
        var initCourseModal = function () {
            $scope.courseTitle = undefined;
            $scope.course = $scope.courses[0];
        };
        // 初始化优秀学子模态框
        var initStudentModal = function () {
            $scope.honorContent = undefined;
            $scope.declarationContent = undefined;
            $scope.excellentStudent = $scope.excellentStudents[0];
        };

        // 获取当前操作的项目类型
        var index = $scope.propagateTypes.indexOf($scope.propagateType);
        // 标识当前 创建动作
        $scope.createAction = true;

        init();
        switch(index){
            case 0:
                initCompanyModal();
                $("#companyPropagateModal").modal({show:true, backdrop: true, keyboard: true });
                break;
            case 1:
                initActivityModal();
                $("#activityPropagateModal").modal({show:true, backdrop: true, keyboard: true });
                break;
            case 2:
                initCourseModal();
                $("#coursePropagateModal").modal({show:true, backdrop: true, keyboard: true });
                break;
            case 3:
                initStudentModal();
                $("#excellentStudentModal").modal({show:true, backdrop: true, keyboard: true });
                break;
        }
    };

    // 创建动作的抽象方法
    var create = function(url, data, modal){
        $http.post(url, data).then(function(res){
            if(res.data.flg == 1){
                toaster.pop("success", "创建成功!" + (res.data.msg || ""), null, 2000, "toast-top-full-width");
                modal.modal('hide');
                getTotalItem();
                getPropagatePage();
                uploader.uploadAll();
            } else
                toaster.pop("danger", "创建失败!" + (res.data.msg || ""), null, 2000, "toast-top-full-width");
        }, function(res){
            toaster.pop("danger", "创建失败!" + (res.data.msg || ""), null, 2000, "toast-top-full-width");
        });
    };

    // 创建公司宣传
    $scope.createCompanyPropagate = function(){
        if(!/[\d]{5,11}/.test($scope.companyPhone))
            toaster.pop("warning", "联系方式格式错误!", null, 2000, "toast-top-full-width");
        else {
            var data = {
                "table_index": $scope.propagateTypes.indexOf($scope.propagateType),
                "title": $scope.companyTitle,
                "content": $scope.propagateContent,
                "company_name": $scope.companyName,
                "company_type": $scope.companyType,
                "company_address": $scope.companyAddress,
                "phone_number": $scope.companyPhone,
                "picture_path": $scope.picturePath,
                "creator_id": global_role.id
            };
            create("/api/propagateManage/createCompany", data, $("#companyPropagateModal"));
        }
    };

    // 创建活动宣传
    $scope.createActivityPropagate = function(){
        if(!/[\d]{5,11}/.test($scope.activityPhone))
            toaster.pop("warning", "联系方式格式错误!", null, 2000, "toast-top-full-width");
        else {
            var data = {
                "table_index": $scope.propagateTypes.indexOf($scope.propagateType),
                "title": $scope.activityTitle,
                "content": $scope.propagateContent,
                "type": $scope.activityType.name,
                "corporation": $scope.activityMan,
                "phone_number": $scope.activityPhone,
                "picture_path": $scope.picturePath,
                "creator_id": global_role.id
            };
            create("/api/propagateManage/createActivity", data, $("#activityPropagateModal"));
        }
    };

    // 创建课程宣传
    $scope.createCoursePropagate = function(){
        var data = {
            "table_index": $scope.propagateTypes.indexOf($scope.propagateType),
            "course_id": $scope.course.id,
            "title": $scope.courseTitle,
            "content": $scope.propagateContent,
            "picture_path": $scope.picturePath,
            "creator_id": global_role.id
        };
        create("/api/propagateManage/createCourse", data, $("#coursePropagateModal"));
    };

    // 创建优秀学子
    $scope.createExcellentStudent = function(){
        var data = {
            "table_index": $scope.propagateTypes.indexOf($scope.propagateType),
            "student_id": $scope.excellentStudent.id,
            "profile": $scope.propagateContent,
            "honor": $scope.honorContent,
            "declaration": $scope.declarationContent,
            "photo_path": $scope.picturePath,
            "creator_id": global_role.id
        };
        create("/api/propagateManage/createStudent", data, $("#excellentStudentModal"));
    };

    // 路由分发创建宣传模态框
    $scope.updateModalShow = function(id){
        // 获取表下标
        var index = $scope.propagateTypes.indexOf($scope.propagateType);
        // 标识当前 修改动作
        $scope.createAction = false;
        // 全局获取被修改宣传的 id
        $scope.propagateId = id;
        // 初始化公司宣传模态框
        var initCompanyModal = function(){
            $http.get("/api/propagateManage/getCurrent?tableIndex="+ index
                +"&id=" + id).then(function(res){
                if(res.data != undefined && res.data != '' && res.data != null) {
                    $scope.companyTitle = res.data.title;
                    $scope.propagateContent = res.data.content;

                    var path = res.data.picture_path;
                    $scope.picturePath = path;
                    $scope.pictureName = path.substr(path.lastIndexOf("/") + 1);

                    $scope.companyName = res.data.company_name;
                    $scope.companyType = res.data.company_type;
                    $scope.companyAddress = res.data.company_address;
                    $scope.companyPhone = res.data.phone_number;
                }else
                    toaster.pop("error", "数据获取失败!"+(res.data.msg || ''), null, 2000, "toast-top-full-width");
            }, function (res) {
                toaster.pop("error", "数据获取失败!"+(res.data.msg || ''), null, 2000, "toast-top-full-width");
            });
        };
        // 初始化活动宣传模态框
        var initActivityModal = function(){
            $http.get("/api/propagateManage/getCurrent?tableIndex="+ index +"&id=" + id)
                .then(function(res){
                    if(res.data != undefined && res.data != '' && res.data != null) {
                        $scope.activityTitle = res.data.title;
                        $scope.propagateContent = res.data.content;

                        var path = res.data.picture_path;
                        $scope.picturePath = path;
                        $scope.pictureName = path.substr(path.lastIndexOf("/") + 1);

                        $scope.activityMan = res.data.corporation;
                        $scope.activityPhone = res.data.phone_number;
                        // 获取活动类型
                        for (var i = 0; i < $scope.activityTypes.length; i++) {
                            if (res.data.type == $scope.activityTypes[i].name)
                                $scope.activityType = $scope.activityTypes[i];
                        }
                    } else
                        toaster.pop("error", "数据获取失败!"+(res.data.msg || ''), null, 2000, "toast-top-full-width");
                }, function (res) {
                    toaster.pop("error", "数据获取失败!"+(res.data.msg || ''), null, 2000, "toast-top-full-width");
                });
        };
        // 初始化课程宣传模态框
        var initCourseModal = function () {
            $http.get("/api/propagateManage/getCurrent?tableIndex="+ index +"&id=" + id)
                .then(function(res){
                    if(res.data != undefined && res.data != '' && res.data != null) {
                        $scope.courseTitle = undefined;
                        $scope.propagateContent = res.data.content;

                        var path = res.data.picture_path;
                        $scope.picturePath = path;
                        $scope.pictureName = path.substr(path.lastIndexOf("/") + 1);

                        // 获取课程类型
                        for (var i = 0; i < $scope.courses.length; i++) {
                            if (res.data.course_id == $scope.courses[i].id)
                                $scope.course = $scope.courses[i];
                        }
                    }else
                        toaster.pop("error", "数据获取失败!"+(res.data.msg || ''), null, 2000, "toast-top-full-width");
                }, function (res) {
                    toaster.pop("error", "数据获取失败!"+(res.data.msg || ''), null, 2000, "toast-top-full-width");
                });
        };
        // 初始化优秀学子模态框
        var initStudentModal = function () {
            $http.get("/api/propagateManage/getCurrent?tableIndex="+ index +"&id=" + id)
                .then(function(res) {
                    if(res.data != undefined && res.data != '' && res.data != null) {
                        $scope.propagateContent = res.data.profile;
                        $scope.honorContent = res.data.honor;
                        $scope.declarationContent = res.data.declaration;

                        var path = res.data.photo_path;
                        $scope.picturePath = path;
                        $scope.pictureName = path.substr(path.lastIndexOf("/") + 1);

                        // 获取优秀学子
                        for (var i = 0; i < $scope.excellentStudents.length; i++) {
                            if (res.data.student_id == $scope.excellentStudents[i].id)
                                $scope.excellentStudent = $scope.excellentStudents[i];
                        }
                    }else
                        toaster.pop("error", "数据获取失败!"+(res.data.msg || ''), null, 2000, "toast-top-full-width");
                }, function (res) {
                    toaster.pop("error", "数据获取失败!"+(res.data.msg || ''), null, 2000, "toast-top-full-width");
                });
        };

        // 路由显示模态框
        switch(index){
            case 0:
                initCompanyModal();
                $("#companyPropagateModal").modal({show:true, backdrop: true, keyboard: true });
                break;
            case 1:
                initActivityModal();
                $("#activityPropagateModal").modal({show:true, backdrop: true, keyboard: true });
                break;
            case 2:
                initCourseModal();
                $("#coursePropagateModal").modal({show:true, backdrop: true, keyboard: true });
                break;
            case 3:
                initStudentModal();
                $("#excellentStudentModal").modal({show:true, backdrop: true, keyboard: true });
                break;
        }
    };

    // 修改动作的抽象方法
    var update = function(url, data){
        $http.post(url, data).then(function(res){
            var changed = false;
            // 如果重新选择了图片，则上传
            if(uploader.queue.length>0) {
                uploader.uploadAll();
                changed = true;
            }
            if(res.data.flg == 1 || changed){
                toaster.pop("success", "修改成功!" + (res.data.msg || ""), null, 2000, "toast-top-full-width");
                getTotalItem();
                getPropagatePage();
            } else
                toaster.pop("danger", "修改失败!" + (res.data.msg || ""), null, 2000, "toast-top-full-width");
        }, function(res){
            toaster.pop("danger", "修改失败!" + (res.data.msg || ""), null, 2000, "toast-top-full-width");
        });
    };

    // 修改公司宣传
    $scope.updateCompanyPropagate = function(){
        if(!/[\d]{5,11}/.test($scope.companyPhone))
            toaster.pop("warning", "联系方式格式错误!", null, 2000, "toast-top-full-width");
        else {
            var data = {
                "table_index": $scope.propagateTypes.indexOf($scope.propagateType),
                "id": $scope.propagateId,
                "title": $scope.companyTitle,
                "content": $scope.propagateContent,
                "company_name": $scope.companyName,
                "company_type": $scope.companyType,
                "company_address": $scope.companyAddress,
                "phone_number": $scope.companyPhone,
                "picture_path": $scope.picturePath,
                "creator_id": global_role.id
            };
            update("/api/propagateManage/updateCompany", data);
        }
    };

    // 修改活动宣传
    $scope.updateActivityPropagate = function(){
        if(!/[\d]{5,11}/.test($scope.activityPhone))
            toaster.pop("warning", "联系方式格式错误!", null, 2000, "toast-top-full-width");
        else {
            var data = {
                "table_index": $scope.propagateTypes.indexOf($scope.propagateType),
                "id": $scope.propagateId,
                "title": $scope.activityTitle,
                "content": $scope.propagateContent,
                "type": $scope.activityType.name,
                "corporation": $scope.activityMan,
                "phone_number": $scope.activityPhone,
                "picture_path": $scope.picturePath,
                "creator_id": global_role.id
            };
            update("/api/propagateManage/updateActivity", data);
        }
    };

    // 修改课程宣传
    $scope.updateCoursePropagate = function(){
        var data = {
            "table_index": $scope.propagateTypes.indexOf($scope.propagateType),
            "id": $scope.propagateId,
            "course_id": $scope.course.id,
            "title": $scope.courseTitle,
            "content": $scope.propagateContent,
            "picture_path": $scope.picturePath,
            "creator_id": global_role.id
        };
        $http.post("/api/propagateManage/updateCourse", data).then(function(res){
            if(res.data.flg == 1){
                toaster.pop("success", "修改成功!" + (res.data.msg || ""), null, 2000, "toast-top-full-width");
                getTotalItem();
                getPropagatePage();
                if(uploader.queue.length>0)
                    uploader.uploadAll();
            } else
                toaster.pop("danger", "修改失败!" + (res.data.msg || ""), null, 2000, "toast-top-full-width");
        }, function(res){
            toaster.pop("danger", "修改失败!" + (res.data.msg || ""), null, 2000, "toast-top-full-width");
        });
    };

    // 修改优秀学子
    $scope.updateExcellentStudent = function(){
        var data = {
            "table_index": $scope.propagateTypes.indexOf($scope.propagateType),
            "id": $scope.propagateId,
            "student_id": $scope.excellentStudent.id,
            "profile": $scope.propagateContent,
            "honor": $scope.honorContent,
            "declaration": $scope.declarationContent,
            "photo_path": $scope.picturePath,
            "creator_id": global_role.id
        };
        update("/api/propagateManage/updateStudent", data);
    };


    // 删除 抽象接口
    var deletePropagate = function(){
        var data = {
            "table_index": $scope.propagateTypes.indexOf($scope.propagateType),
            "id": $scope.propagateId
        };
        $http.post("/api/propagateManage/delete", data).then(function(res){
            if(res.data.flg == 1) {
                toaster.pop("success", "删除成功!" + (res.data.msg || ""), null, 2000, "toast-top-full-width");
                for(var i=0; i<$scope.propagateArr.length; i++){
                    if($scope.propagateArr[i].id == $scope.propagateId)
                        $scope.propagateArr.splice(i,1);
                }

                // 如果当前页无数据 且 还有数据页存在 页码回退1 并 获取该页数据
                if($scope.propagateArr.length==0 && $scope.pageNum >0){
                    $scope.pageNum --;
                    getTotalItem();
                    getPropagatePage();
                }
            }else
                toaster.pop("danger", "删除失败!" + (res.data.msg || ""), null, 2000, "toast-top-full-width");
        }, function(res){
            toaster.pop("danger", "删除失败!" + (res.data.msg || ""), null, 2000, "toast-top-full-width");
        });
    };

    // 修改公司宣传
    $scope.deleteCompanyPropagate = function(){
        deletePropagate();
        $("#companyPropagateModal").modal('hide');
    };

    // 修改活动宣传
    $scope.deleteActivityPropagate = function(){
        deletePropagate();
        $("#activityPropagateModal").modal('hide');
    };

    // 修改课程宣传
    $scope.deleteCoursePropagate = function(){
        deletePropagate();
        $("#coursePropagateModal").modal('hide');
    };

    // 修改优秀学子
    $scope.deleteExcellentStudent = function(){
        deletePropagate();
        $("#studentPropagateModal").modal('hide');
    };

    // 显示宣传内容模态框
    $scope.contentModalShow = function(){
        $("#contentModal").modal("show");
    };

    // 所获荣誉模态框
    $scope.honorContentModalShow =  function(){
        $("#honorContentModal").modal("show");
    };

    // 个人宣言模态框
    $scope.declarationContentModalShow =  function(){
        $("#declarationContentModal").modal("show");
    };

    // 图片上传模态框显示
    $scope.imageUploadModalShow = function(){
        $("#imageUploadModal").modal("show");
    };

    // 重置内容输入框内容
    $scope.resetContent = function(){
        $scope.propagateContent = undefined;
    };

    // 点击选择企业类型
    $scope.toggleSelect = function(type){
        $(".company-type").removeClass("btn-info");
        var ev = event || window.event;
        $(ev.target).addClass("btn-info");
        $scope.companyType = type;
        $("#companyTypeModal").modal('hide');
    };

    // 获取所有条目数
    var getTotalItem = function(){
        $http.get('/api/propagateManage/getTotalItem?tableIndex=' +
            $scope.propagateTypes.indexOf($scope.propagateType)).then(function (res) {
            $scope.totalPages = Math.ceil(res.data.count / $scope.pageSize);

            $scope.pageBtns = ["<"];
            for(var i=0;i<$scope.totalPages;i++)
                $scope.pageBtns[i+1] = i+1;
            $scope.pageBtns[$scope.pageBtns.length] = ">";
        }, function (res) {
            toaster.pop("error", "服务器错误!"+(res.data.msg || ''), null, 2000, "toast-top-full-width");
        });
    };

    // 获取分页数据
    var getPropagatePage = function(){
        $http.get('/api/propagateManage/getPage?tableIndex=' +
            $scope.propagateTypes.indexOf($scope.propagateType) + "&pageNum=" +
            $scope.pageNum + "&pageSize=" +$scope.pageSize).then(function (res) {
            $scope.propagateArr = res.data;
        }, function (res) {
            toaster.pop("error", "服务器错误!"+(res.data.msg || ''), null, 2000, "toast-top-full-width");
        });
    };

    // 点击分页按钮触发事件
    $scope.pageClick = function(value){
        // 转发事件 获取当前页
        if(value == "<" && $scope.pageNum >0)
            $scope.pageNum--;
        else if(value == ">" && $scope.pageNum< $scope.totalPages-1)
            $scope.pageNum++;
        else if(value == "<" || value == ">")
            console.log($scope.pageNum);
        else $scope.pageNum = value-1;

        // getTotalItem();
        getPropagatePage();
    };

    // 检测propagateType的值
    $scope.$watch('propagateType',function(newValue,oldValue){
        $scope.pageNum = 0;
        getTotalItem();
        getPropagatePage();
    });
}]);