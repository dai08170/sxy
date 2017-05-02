/**
 * Created by lonelydawn on 2017-04-20.
 */

app.controller('courseManageCtrl',['$scope', '$state','$http', '$cookies','toaster', function($scope, $state,$http, $cookies, toaster){
    $scope.newCourseNumber = undefined;
    $scope.newCourseName = undefined;
    $scope.teacherArr = undefined;
    $scope.newCourseTeacher = undefined;
    $scope.newCourseScore = undefined;
    $scope.courseTypes = undefined;
    $scope.newCourseType = undefined;
    $scope.beginDate = undefined;
    $scope.endDate = undefined;

    // 初始化日期设置框
    var date = new Date();
    $("#beginDate").datepicker({
        format : "yyyy-mm-dd",
        startDate : date
    });
    $("#endDate").datepicker({
        format : "yyyy-mm-dd",
        startDate : date
    });

    $("#searchedBeginDate").datepicker({
        format : "yyyy-mm-dd",
        startDate : date
    });
    $("#searchedEndDate").datepicker({
        format : "yyyy-mm-dd",
        startDate : date
    });

    // 获取课程类型
    var getCourseType = function(){
        $http.get("/api/courseManage/getCourseType").then(function (res) {
            if(res.data.length>0){
                $scope.courseTypes = res.data;
                $scope.newCourseType = $scope.courseTypes[0];
            } else
                toaster.pop("danger", "课程类型无数据!不可创建!", null, 2000, "toast-top-full-width");
        }, function (res) {
            toaster.pop("danger", "服务器错误!", null, 2000, "toast-top-full-width");
        });
    };

    // 获取教师数组
    var getAllTeachers = function(){
        $http.get("/api/userManage/getAllTeachers").then(function (res) {
            if(res.data.length>0){
                $scope.teacherArr = res.data;
                $scope.newCourseTeacher = $scope.teacherArr[0];
            } else
                toaster.pop("danger", "无教师存在!请先创建教师!", null, 2000, "toast-top-full-width");
        }, function (res) {
            toaster.pop("danger", "服务器错误!", null, 2000, "toast-top-full-width");
        });
    };

    getCourseType();
    getAllTeachers();

    // 创建课程
    $scope.createCourse = function(){
        if($scope.newCourseNumber.length >= 20)
            toaster.pop("warning", "新建课程编号长度不可超过20!", null, 2000, "toast-top-full-width");
        else if($scope.newCourseName.length >= 20)
            toaster.pop("warning", "新建课程名称长度不可超过20!", null, 2000, "toast-top-full-width");
        else {
            var data = {
                "number": $scope.newCourseNumber,
                "name": $scope.newCourseName,
                "type": $scope.newCourseType,
                "teacher_id": $scope.newCourseTeacher.id,
                "score": $scope.newCourseScore,
                "begin_date": $scope.beginDate,
                "end_date": $scope.endDate
            };
            $http.post("/api/courseManage/create", data).then(function(res){
                if(res.data.flg == 1){
                    toaster.pop("success", "创建成功!" + (res.data.msg || ""), null, 2000, "toast-top-full-width");
                    $scope.resetNewCourse();
                } else
                    toaster.pop("danger", "创建失败!" + (res.data.msg || ""), null, 2000, "toast-top-full-width");
            }, function(res){
                toaster.pop("danger", "创建失败!" + (res.data.msg || ""), null, 2000, "toast-top-full-width");
            });
        }
    };

    // 清空录入新建课程信息
    $scope.resetNewCourse = function(){
        $scope.newCourseNumber = undefined;
        $scope.newCourseName = undefined;
        $scope.newCourseScore = undefined;
        $scope.newCourseType = $scope.courseTypes[0];
        $scope.newCourseTeacher = $scope.teacherArr[0];
        $scope.beginDate = undefined;
        $scope.endDate = undefined;
    };

    // 清空课程查询信息
    $scope.resetSearch = function(){
        $scope.searchCourseNumber = undefined;
    };

    // 查询课程
    $scope.searchByNumber = function(){
        if($scope.searchCourseNumber == undefined || $.trim($scope.searchCourseNumber) =='')
            toaster.pop("warning", "请输入待查询课程编号!", null, 2000, "toast-top-full-width");
        else {
            $http.get("/api/courseManage/search?number="+$scope.searchCourseNumber).then(function(res){
                $scope.courseExist = res.data.exists;
                if(!$scope.courseExist)
                    toaster.pop("danger", "查询失败!"+ (res.data.msg || ''), null, 2000, "toast-top-full-width");
                else {
                    $scope.searchedCourseNumber = res.data.course.num;
                    $scope.searchedCourseName = res.data.course.name;
                    $scope.searchedCourseType = res.data.course.type;
                    $scope.searchedCourseScore = res.data.course.score;
                    // 匹配授课教师数据, 默认 select 显示
                    for(var i=0;i<$scope.teacherArr.length;i++)
                        if($scope.teacherArr[i].id == res.data.course.teacher_id)
                            $scope.searchedCourseTeacher = $scope.teacherArr[i];
                    $scope.searchedBeginDate = res.data.course.begin_date;
                    $scope.searchedEndDate = res.data.course.end_date;
                    $("#courseModal").modal("show");
                }
            },function(res){
                toaster.pop("danger", "查询失败!"+ (res.data.msg || ''), null, 2000, "toast-top-full-width");
            });
        }
    };

    // 删除课程
    $scope.deleteCourse = function(){
        var data = {
            "number": $scope.searchedCourseNumber
        };
        $http.post('/api/courseManage/delete', data).then(function(res){
            if(res.data.flg == 1){
                toaster.pop("success", "删除成功!" + (res.data.msg || ""), null,
                    2000, "toast-top-full-width");
                $("#courseModal").modal("hide");
            } else
                toaster.pop("error", "删除失败!" + (res.data.msg || ""), null,
                    2000, "toast-top-full-width");
        }, function(res){
            toaster.pop("error", "删除失败!" + (res.data.msg || ""), null,
                2000, "toast-top-full-width");
        });
    };

    // 修改课程
    $scope.updateCourse = function() {
        if ($scope.searchedCourseNumber.length >= 20)
            toaster.pop("warning", "新建课程编号长度不可超过20!", null, 2000, "toast-top-full-width");
        else if ($scope.searchedCourseName.length >= 20)
            toaster.pop("warning", "新建课程名称长度不可超过20!", null, 2000, "toast-top-full-width");
        else {
            var data = {
                "number": $scope.searchedCourseNumber,
                "name": $scope.searchedCourseName,
                "type": $scope.searchedCourseType,
                "teacher_id": $scope.searchedCourseTeacher.id,
                "score": $scope.searchedCourseScore,
                "begin_date": $scope.searchedBeginDate,
                "end_date": $scope.searchedEndDate
            };
            $http.post("/api/courseManage/update", data).then(function (res) {
                if (res.data.flg == 1) {
                    toaster.pop("success", "修改成功!" + (res.data.msg || ""), null,
                        2000, "toast-top-full-width");
                    $("#courseModal").modal("hide");
                } else
                    toaster.pop("error", "修改失败!" + (res.data.msg || ""), null,
                        2000, "toast-top-full-width");
            }, function (res) {
                toaster.pop("error", "修改失败!" + (res.data.msg || ""), null,
                    2000, "toast-top-full-width");
            });
        }
    };
}]);