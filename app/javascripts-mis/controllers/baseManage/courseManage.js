/**
 * Created by lonelydawn on 2017-04-20.
 */

app.controller('courseManageCtrl',['$scope', '$state','$http', '$cookies','toaster', function($scope, $state,$http, $cookies, toaster){
    var pageNum = 0;
    var pageSize = window.innerHeight< 771? 10: 18;
    var totalPages = 0;
    $scope.pageBtns = [];

    // 初始化信息
    $scope.dataArr = [];
    $scope.keyword = '';
    $scope.action = undefined;

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

    $scope.courseTypes = [];
    $scope.teacherArr = [];
    var init = function () {
        // 获取所有课程类型
        $http.get('/api/courseManage/getCourseType').then(function (res) {
            $scope.courseTypes = res.data;
        }, function (res) {
            toaster.pop("error", "服务器错误!"+(res.data.msg || ''), null, 2000, "toast-top-full-width");
        });

        // 获取所有教师信息
        $http.get("/api/userManage/getAllTeachers").then(function (res) {
            if(res.data.length>0)
                $scope.teacherArr = res.data;
            else
                toaster.pop("danger", "无教师存在!请先创建教师!", null, 2000, "toast-top-full-width");
        }, function (res) {
            toaster.pop("error", "服务器错误!"+(res.data.msg || ''), null, 2000, "toast-top-full-width");
        });
    };
    init();


    // 获取单页内容
    var getPage = function(){
        var getPageBtns = function(totalPages){
            $scope.pageBtns = ["<"];
            for(var i=0;i<totalPages;i++)
                $scope.pageBtns[i+1] = i+1;
            $scope.pageBtns[$scope.pageBtns.length] = ">";
            return $scope.pageBtns;
        };

        $http.get("/api/courseManage/getPage?pageNum="+ pageNum
            +"&pageSize="+ pageSize+"&keyword="+$scope.keyword
        ).then(function (res) {
            $scope.dataArr = res.data.items;
            totalPages = Math.ceil(res.data.count / pageSize);
            $scope.pageBtns = getPageBtns(totalPages);
        }, function (res) {
            toaster.pop("error", "服务器错误!"+(res.data.msg || ''), null, 2000, "toast-top-full-width");
        });
    };

    // 点击分页按钮
    $scope.pageClick = function(value){
        // 转发事件 获取当前页
        if(value == "<" && pageNum >0)
            pageNum--;
        else if(value == ">" && pageNum< totalPages-1)
            pageNum++;
        else if(value == "<" || value == ">")
            console.log(pageNum);
        else pageNum = value-1;

        // 刷新页面
        getPage();
    };

    // 搜索姓名关键字
    $scope.search = function(){
        pageNum = 0;
        getPage();
    };

    // 创建模态框显示
    $scope.createModalShow = function () {
        $scope.action = "创建";
        $scope.update = false;
        $scope.teacherItem = $scope.teacherArr[0];
        $scope.item = {
            "type": $scope.courseTypes[0]
        };
        $("#courseModal").modal('show');
    };

    // 新建课程
    $scope.createCourse = function () {
        if($scope.item.num.length >= 20)
            toaster.pop("warning", "课程编号长度不可超过20!", null, 2000, "toast-top-full-width");
        else if($scope.item.name.length >= 20)
            toaster.pop("warning", "课程名称长度不可超过20!", null, 2000, "toast-top-full-width");
        else {
            var data = {
                "num": $scope.item.num,
                "name": $scope.item.name,
                "teacher_id": $scope.teacherItem.id,
                "score": $scope.item.score,
                "type": $scope.item.type,
                "begin_date": $scope.item.begin_date,
                "end_date": $scope.item.end_date
            };
            $http.post("/api/courseManage/create", data).then(function(res){
                if(res.data.flg == 1) {
                    toaster.pop("success", "创建成功!" + (res.data.msg || ""), null, 2000, "toast-top-full-width");
                    getPage();
                } else
                    toaster.pop("danger", "创建失败!" + (res.data.msg || ""), null, 2000, "toast-top-full-width");
            }, function(res){
                toaster.pop("error", "服务器错误!"+(res.data.msg || ''), null, 2000, "toast-top-full-width");
            });
        }
    };

    // 更新模态框显示
    $scope.updateModalShow = function (item) {
        $scope.action = "修改";
        $scope.update = true;

        // 将字段赋值给模态框各字段
        $scope.item = {
            "id": item.id,
            "num": item.num,
            "name": item.name,
            "teacher_id": item.teacher_id,
            "score": item.score,
            "type": item.type,
            "begin_date": item.begin_date,
            "end_date": item.end_date
        };

        var exist = false;
        for(var i=0; i<$scope.teacherArr.length; i++)
            if(item.teacher_id == $scope.teacherArr[i].id)
                $scope.teacherItem = $scope.teacherArr[i];
        // 判断课程授课教师是否存在,存在则显示;不存在则显示教师数组第一位
        if(!exist) $scope.teacherItem = $scope.teacherArr[0];

        $("#courseModal").modal('show');
    };

    // 更新课程信息
    $scope.updateCourse = function () {
        if ($scope.item.num.length >= 20)
            toaster.pop("warning", "课程编号长度不可超过20!", null, 2000, "toast-top-full-width");
        else if ($scope.item.name.length >= 20)
            toaster.pop("warning", "课程名称长度不可超过20!", null, 2000, "toast-top-full-width");
        else {
            var data = {
                "id": $scope.item.id,
                "num": $scope.item.num,
                "name": $scope.item.name,
                "teacher_id": $scope.teacherItem.id,
                "score": $scope.item.score,
                "type": $scope.item.type,
                "begin_date": $scope.item.begin_date,
                "end_date": $scope.item.end_date
            };
            $http.post("/api/courseManage/update", data).then(function (res) {
                if (res.data.flg == 1) {
                    toaster.pop("success", "修改成功!" + (res.data.msg || ""), null,
                        2000, "toast-top-full-width");
                    getPage();
                } else
                    toaster.pop("danger", "修改失败!" + (res.data.msg || ""), null,
                        2000, "toast-top-full-width");
            }, function (res) {
                toaster.pop("error", "服务器错误!"+(res.data.msg || ''), null,
                    2000, "toast-top-full-width");
            });
        }
    };

    // 删除课程
    $scope.deleteCourse = function (id) {
        var data = {
            "id": id
        };
        $http.post('/api/courseManage/delete', data).then(function(res){
            if(res.data.flg == 1) {
                toaster.pop("success", "删除成功!" + (res.data.msg || ""), null,
                    2000, "toast-top-full-width");
                getPage();
            } else
                toaster.pop("danger", "删除失败!" + (res.data.msg || ""), null,
                    2000, "toast-top-full-width");
        }, function(res){
            toaster.pop("error", "服务器错误!"+(res.data.msg || ''), null,
                2000, "toast-top-full-width");
        });
    };

    getPage();
}]);