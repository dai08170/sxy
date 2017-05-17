/**
 * Created by lonelydawn on 2017-03-10.
 */

app.controller('homepageCtrl',['$http', '$scope', '$state', '$cookies', 'toaster', function($http, $scope, $state, $cookies, toaster){
    // 获取用户个人信息
    var getUserInfo = function(module){
        $http.get("/api/selfInfo/get"+ module +"?id=" + global_role.id)
            .then(function (res) {
                if (res.data == undefined)
                    toaster.pop("danger", "该用户不存在!" + (res.data.msg || ''), null, 2000,
                        "toast-top-full-width");
                else if (res.data.profile_number == '' || res.data.profile_number == undefined)
                    toaster.pop("danger", "用户信息不存在！请联系管理员！" + (res.data.msg || ''),
                        null, 2000, "toast-top-full-width");
                else $scope.client = res.data;
            }, function (res) {
                toaster.pop("error", "服务器错误!" + (res.data.msg || ''), null, 2000, "toast-top-full-width");
            });
    };

    // 初始化课程信息
    var getCoursesInfo = function(module){
        $http.get("/api/homepage/get"+module+"CourseInfo?id="+global_role.id).then(function (res) {
            $scope.courses = res.data;
        }, function (res) {
            toaster.pop("error", "服务器错误!" + (res.data.msg || ''), null, 2000, "toast-top-full-width");
        });
    };

    // 初始化企业宣传信息
    var getCompanyPropagateInfo = function(){
        $http.get("/api/homepage/getPropagate?tableIndex=0").then(function (res) {
            $scope.companyPropagate = res.data;
        }, function (res) {
            toaster.pop("error", "服务器错误!" + (res.data.msg || ''), null, 2000, "toast-top-full-width");
        });
    };
    // 初始化活动宣传信息
    var getActivityPropagateInfo = function(){
        $http.get("/api/homepage/getPropagate?tableIndex=1").then(function (res) {
            $scope.activityPropagate = res.data;
        }, function (res) {
            toaster.pop("error", "服务器错误!" + (res.data.msg || ''), null, 2000, "toast-top-full-width");
        });
    };

    // 宣传模态框显示
    $scope.propagateModalShow = function(content){
        $scope.propagateContent = content;
        $("#propagateModal").modal('show');
    };

    $scope.isStudent = false;
    $scope.isTeacher = false;
    var init = function () {
        // 获取宣传信息
        getCompanyPropagateInfo();
        getActivityPropagateInfo();

        // 如果全局角色丢失, 系统不能运行, 提示错误信息
        if(global_role == undefined)
            toaster.pop("error", "系统错误:全局角色身份丢失！请联系管理员！", null, 2000, "toast-top-full-width");
        else {
            // 显示欢迎用户的姓名
            $scope.greetings = "Hi, "+(global_role.name || "user");

            // 根据用户类型显示不同模块
            if (global_role.type == "学生"){
                getUserInfo("Student");
                getCoursesInfo("Student");
                $scope.isStudent = true;
            } else if (global_role.type == "教师"){
                getUserInfo("Teacher");
                getCoursesInfo("Teacher");
                $scope.isTeacher = true;
            }
        }

        // 幻灯片
        $("#myCarousel").carousel({
            interval: 5000
        });
    };

    // 判断是否是管理员,如果是,则显示空白模块
    $scope.isAdmin= true;
    if(global_role.type != "管理员"){
        init();
        $scope.isAdmin = false;
    }
}]);