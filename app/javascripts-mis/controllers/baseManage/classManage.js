/**
 * Created by lonelydawn on 2017-03-14.
 */

app.controller('classManageCtrl',['$scope', '$state','$http', '$cookies','toaster', function($scope, $state,$http, $cookies, toaster){
    var pageNum = 0;
    var pageSize = window.innerHeight< 771? 10: 18;
    var totalPages = 0;
    $scope.pageBtns = [];

    // 初始化信息
    $scope.dataArr = [];
    $scope.keyword = '';
    $scope.action = undefined;

    $scope.classTypes = [];
    $scope.classState = global_config.class_state;
    var init = function () {
        // 获取所有班级类型
        $http.get('/api/classManage/getClassType').then(function (res) {
            $scope.classTypes = res.data;
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

        $http.get("/api/classManage/getPage?pageNum="+ pageNum
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
        $scope.item = {
            "type": $scope.classTypes[0],
            "state": $scope.classState[0]
        };
        $("#classModal").modal('show');
    };

    // 新建班级
    $scope.createClass = function () {
        if($scope.item.num.length >= 20)
            toaster.pop("warning", "班级编号长度不可超过20!", null, 2000, "toast-top-full-width");
        else if($scope.item.name.length >= 20)
            toaster.pop("warning", "班级名称长度不可超过20!", null, 2000, "toast-top-full-width");
        else if ($scope.item.profile.length >= 140)
            toaster.pop("warning", "班级简介长度不可超过140!", null, 2000, "toast-top-full-width");
        else {
            var data = {
                "num": $scope.item.num,
                "name": $scope.item.name,
                "profile": $scope.item.profile,
                "state": $scope.item.state,
                "type": $scope.item.type
            };
            $http.post("/api/classManage/create", data).then(function(res){
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
            "type": item.type,
            "profile": item.profile,
            "state": item.state
        };

        $("#classModal").modal('show');
    };

    // 更新班级信息
    $scope.updateClass = function () {
        if ($scope.item.num.length >= 20)
            toaster.pop("warning", "班级编号长度不可超过20!", null, 2000, "toast-top-full-width");
        else if ($scope.item.name.length >= 20)
            toaster.pop("warning", "班级名称长度不可超过20!", null, 2000, "toast-top-full-width");
        else if ($scope.item.profile.length >= 140)
            toaster.pop("warning", "班级简介长度不可超过140!", null, 2000, "toast-top-full-width");
        else {
            var data = {
                "id": $scope.item.id,
                "num": $scope.item.num,
                "name": $scope.item.name,
                "type": $scope.item.type,
                "profile": $scope.item.profile,
                "state": $scope.item.state
            };
            $http.post("/api/classManage/update", data).then(function (res) {
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

    // 删除班级
    $scope.deleteClass = function (id) {
        var data = {
            "id": id
        };
        $http.post('/api/classManage/delete', data).then(function(res){
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