/**
 * Created by lonelydawn on 2017-05-07.
 */

app.controller('selfInfoCtrl',['$scope', '$state','$http', '$interval', '$cookies','toaster', 'FileUploader', function($scope, $state, $http, $interval, $cookies, toaster, FileUploader){

    // 判定显示哪个模块
    $scope.isStudent = false;
    $scope.isTeacher = false;

    // 初始化用户信息
    $scope.userInfo = undefined;

    // 声明全局图片路径, 是为了在上传成功后即时更新头像
    $scope.photoPath  = 'uploads/no.png';

    // 教师职称数组
    $scope.teacherTitles = [];

    // //显示当前时间
    // $scope.currentTime = undefined;
    // // 获取当前时间
    // var getCurrentTime = function(){
    //     // 个位数字补零
    //     var getDoubleBitNumber = function (data) {
    //         return (data>=0 &&data<10)? "0"+data : data;
    //     };
    //
    //     var date =new Date();
    //     return getDoubleBitNumber(date.getHours())+":"
    //         + getDoubleBitNumber(date.getMinutes())+":"
    //         + getDoubleBitNumber(date.getSeconds());
    // };
    // 设置定时器刷新时间
    // $interval(function () {
    //     $scope.currentTime = "系统时间 : "+getCurrentTime();
    // },1000);

    // 初始化图片上传控制bar
    var uploader = $scope.uploader = new FileUploader({
        url: "/api/selfInfo/upload",
        filters: [{
            name: 'imageFilter',
            fn: function(item) {
                var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
                return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
            }
        }],
        onAfterAddingFile: function() {
            if(uploader.queue.length>1){
                uploader.queue[0] = uploader.queue[1];
                uploader.queue.length =1;
            }
        },
        onWhenAddingFileFailed: function() {
            toaster.pop("warning", "请选择正确的文件类型!", null, 2000, "toast-top-full-width");
        },
        onCompleteAll: function() {
            // 防止图片缓存造成的延时刷新, 在资源请求路径上加上时间戳
            $scope.userInfo.photo_path = $scope.photoPath+"?t="+Date.now();
        }
    });

    // 图片上传模态框显示
    $scope.imageUploadModalShow = function () {
        $("#imageUploadModal").modal('show');
    };

    // 上传图片
    $scope.uploadPicture = function(){
        // 判断是新建还是修改
        var module = "";
        // 根据角色类型分发模块
        if(global_role.type == "教师")
            module = "updateTeacherPhoto";
        else if(global_role.type == "学生")
            module = "updateStudentPhoto";
        else return;

        // 声明函数域内全局变量
        var filename = '';
        if($scope.userInfo.photo_path == '') {
            filename = uploader.queue[0].file.name
            filename = global_role.id + '' + Date.now() + filename.substr(filename.lastIndexOf("."));
            $scope.photoPath = global_baseurl + filename;
        } else {
            var photoPath = $scope.userInfo.photo_path;
            if(photoPath.indexOf("?") == -1)
                $scope.photoPath = photoPath;
            else $scope.photoPath = photoPath.substr(0, photoPath.indexOf("?"));

            filename = $scope.photoPath.substr($scope.photoPath.lastIndexOf("/")+1);
        }

        var data = {
            "id": $scope.userInfo.id,
            "photo_path": $scope.photoPath
        };
        // 保存图片路径到数据库
        $http.post("/api/selfInfo/"+module, data).then(function () {
            // 图片路径保存成功后开始上传图片到 node服务器
            uploader.queue[0].file.name = filename;
            uploader.uploadAll();
        }, function (res) {
            toaster.pop("error", "服务器错误!" + (res.data.msg || ''), null, 2000, "toast-top-full-width");
        });
        // 隐藏图片模态框
        $("#imageUploadModal").modal('hide');
    };

    // 初始化日期设置框
    $(".birth").datepicker({
        format : "yyyy-mm-dd"
    });

    // 更新学生和教师信息的抽象方法
    var abstractUpdate = function(url, data){
        var phoneLength = data.phone_number.toString().length;
        if(phoneLength <5 || phoneLength > 11)
            toaster.pop("warning", "联系电话格式错误!", null, 2000, "toast-top-full-width");
        else if(!/^[a-zA-Z0-9\-_\.]+@[a-z0-9]+\.[a-z]{2,3}$/g.test(data.email))
            toaster.pop("warning", "电子邮箱格式错误!", null, 2000, "toast-top-full-width");
        else {
            $http.post(url, data).then(function (res) {
                if (res.data.flg == 1)
                    toaster.pop("success", "修改成功!" + (res.data.msg || ""), null,
                        2000, "toast-top-full-width");
                else
                    toaster.pop("danger", "修改失败!" + (res.data.msg || ""), null,
                        2000, "toast-top-full-width");
            }, function (res) {
                toaster.pop("error", "服务器错误!" + (res.data.msg || ''), null, 2000, "toast-top-full-width");
            });
        }
    };

    // 更新学生信息
    $scope.updateStudent = function () {
        var data = {
            "id": $scope.userInfo.id,
            "birth": $scope.userInfo.birth,
            "phone_number": $scope.userInfo.phone_number,
            "email": $scope.userInfo.email,
            "department": $scope.userInfo.department
        };

        abstractUpdate("/api/selfInfo/updateStudent", data);
    };

    // 更新教师信息
    $scope.updateTeacher = function () {
        var data = {
            "id": $scope.userInfo.id,
            "birth": $scope.userInfo.birth,
            "phone_number": $scope.userInfo.phone_number,
            "email": $scope.userInfo.email,
            "profile": $scope.userInfo.profile,
            "type": $scope.userInfo.type
        };

        abstractUpdate("/api/selfInfo/updateTeacher", data);
    };

    // 更新密码模态框显示
    $scope.updatePasswordModalShow = function(){
        $scope.oldPwd = undefined;
        $scope.newPwd = undefined;
        $scope.againPwd = undefined;

        $("#passwordModal").modal('show');
    };

    // 修改登录密码
    $scope.updatePassword = function () {
        if($scope.oldPwd != global_role.password)
            toaster.pop("warning", "原密码错误!", null, 2000, "toast-top-full-width");
        else if($scope.newPwd != $scope.againPwd)
            toaster.pop("warning", "两次输入的密码不一致!", null, 2000, "toast-top-full-width");
        else{
            var data = {
                "id": global_role.id,
                "password": $scope.newPwd
            };

            $http.post("/api/selfInfo/updatePassword", data).then(function (res) {
                if (res.data.flg == 1)
                    toaster.pop("success", "修改成功!" + (res.data.msg || ""), null,
                        2000, "toast-top-full-width");
                else
                    toaster.pop("danger", "修改失败!" + (res.data.msg || ""), null,
                        2000, "toast-top-full-width");
            }, function (res) {
                toaster.pop("error", "服务器错误!" + (res.data.msg || ''), null, 2000, "toast-top-full-width");
            });
        }
    };

    // 初始化用户信息
    var initUserInfo = function() {
        // 获取用户个人信息
        var getUserInfo = function(module){
            $http.get("/api/selfInfo/"+ module +"?id=" + global_role.id)
                .then(function (res) {
                    if (res.data == undefined)
                        toaster.pop("danger", "该用户不存在!" + (res.data.msg || ''), null, 2000,
                            "toast-top-full-width");
                    else if (res.data.profile_number == '' || res.data.profile_number == undefined)
                        toaster.pop("danger", "用户信息不存在！请联系管理员！" + (res.data.msg || ''),
                            null, 2000, "toast-top-full-width");
                    else $scope.userInfo = res.data;
                }, function (res) {
                    toaster.pop("error", "服务器错误!" + (res.data.msg || ''), null, 2000, "toast-top-full-width");
                });
        }

        // 初始化学生信息
        var initStudentModule = function(){

        };

        // 初始化教师信息
        var initTeacherModule = function(){
            $http.get("/api/configManage/getCurrent", {"tableIndex":3}).then(function (res) {
                for(var i=0;i<res.data.length;i++)
                    $scope.teacherTitles.push(res.data[i].name);
            }, function (res) {
                toaster.pop("error", "服务器错误!" + (res.data.msg || ''), null, 2000, "toast-top-full-width");
            });
        };

        if(global_role == undefined)
            toaster.pop("error", "系统错误:全局角色身份丢失！请联系管理员！", null, 2000, "toast-top-full-width");
        else {
            // 显示欢迎用户的姓名
            $scope.welcomeName = global_role.name || "user";

            // 根据用户类型显示不同模块
            if (global_role.type == "学生") {
                $scope.isStudent = true;
                getUserInfo("getStudent");
                initStudentModule();
            } else if (global_role.type == "教师") {
                $scope.isTeacher = true;
                getUserInfo("getTeacher");
                initTeacherModule();
            }
        }
    }

    initUserInfo();
}]);