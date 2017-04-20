/**
 * Created by lonelydawn on 2017-03-14.
 */

app.controller('classManageCtrl',['$scope', '$state','$http', '$cookies','toaster', function($scope, $state,$http, $cookies, toaster){
    $scope.classTypes = undefined;
    $scope.newClassType = undefined;
    $scope.newClassNumber = undefined;
    $scope.newClassName = undefined;
    $scope.newClassProfile = undefined;
    $scope.classExist = undefined;

    // 获取班级类型
    var getClassType = function(){
        $http.get("/api/classManage/getClassType").then(function (res) {
            $scope.classTypes = res.data;
            $scope.newClassType = $scope.classTypes[0];
        }, function (res) {

        });
    };

    getClassType();
    $scope.classState = global_data.config_state;
    $scope.newClassState = $scope.classState[0];

    // 创建班级
    $scope.createClass = function(){
        if($scope.newClassNumber.length >= 20)
            toaster.pop("warning", "新建班级编号长度不可超过20!", null, 2000, "toast-top-full-width");
        else if($scope.newClassName.length >= 20)
            toaster.pop("warning", "新建班级名称长度不可超过20!", null, 2000, "toast-top-full-width");
        else {
            var newClass = {
                "number": $scope.newClassNumber,
                "name": $scope.newClassName,
                "type": $scope.newClassType,
                "profile": $scope.newClassProfile,
                "state": $scope.newClassState
            };
            $http.post("/api/classManage/create", newClass).then(function(res){
                if(res.data.flg == 1){
                    toaster.pop("success", "创建成功!" + (res.data.msg || ""), null, 2000, "toast-top-full-width");
                    $scope.resetNewClass();
                } else
                    toaster.pop("danger", "创建失败!" + (res.data.msg || ""), null, 2000, "toast-top-full-width");
            }, function(res){
                toaster.pop("danger", "创建失败!" + (res.data.msg || ""), null, 2000, "toast-top-full-width");
            });
        }
    };

    // 清空录入新建班级信息
    $scope.resetNewClass = function(){
        $scope.newClassType = $scope.classTypes[0];
        $scope.newClassNumber = undefined;
        $scope.newClassName = undefined;
        $scope.newClassProfile = undefined;
        $scope.newClassState = $scope.classState[0];
    };

    // 清空班级查询信息
    $scope.resetSearch = function(){
        $scope.searchClassNumber = undefined;
    };

    // 查询班级
    $scope.searchByNumber = function(){
        if($scope.searchClassNumber == undefined || $.trim($scope.searchClassNumber) =='')
            toaster.pop("warning", "请输入待查询班级编号!", null, 2000, "toast-top-full-width");
        else {
            $http.get("/api/classManage/search?number="+$scope.searchClassNumber).then(function(res){
                $scope.classExist = res.data.exists;
                if(!$scope.classExist)
                    toaster.pop("danger", "查询失败!"+ (res.data.msg || ''), null, 2000, "toast-top-full-width");
                else {
                    console.log(res.data);
                    $scope.searchedClassNumber = res.data.class.number;
                    $scope.searchedClassName = res.data.class.name;
                    $scope.searchedClassType = res.data.class.type;
                    $scope.searchedClassProfile = res.data.class.profile;
                    $scope.searchedClassState = res.data.class.state;
                    $("#classModal").modal("show");
                }
            },function(res){
                toaster.pop("danger", "查询失败!"+ (res.data.msg || ''), null, 2000, "toast-top-full-width");
            });
        }
    };

    // 删除班级
    $scope.deleteClass = function(){
        var data = {
            "number": $scope.searchedClassNumber
        };
        $http.post('/api/classManage/delete', data).then(function(res){
            if(res.data.flg == 1){
                toaster.pop("success", "删除成功!" + (res.data.msg || ""), null,
                    2000, "toast-top-full-width");
                $("#classModal").modal("hide");
            } else
                toaster.pop("error", "删除失败!" + (res.data.msg || ""), null,
                    2000, "toast-top-full-width");
        }, function(res){
            toaster.pop("error", "删除失败!" + (res.data.msg || ""), null,
                2000, "toast-top-full-width");
        });
    };

    // 修改班级
    $scope.updateClass = function() {
        if ($scope.searchedClassNumber.length >= 20)
            toaster.pop("warning", "新建班级编号长度不可超过20!", null, 2000, "toast-top-full-width");
        else if ($scope.searchedClassName.length >= 20)
            toaster.pop("warning", "新建班级名称长度不可超过20!", null, 2000, "toast-top-full-width");
        else {
            var data = {
                "number": $scope.searchedClassNumber,
                "name": $scope.searchedClassName,
                "type": $scope.searchedClassType,
                "profile": $scope.searchedClassProfile,
                "state": $scope.searchedClassState
            };
            $http.post("/api/classManage/update", data).then(function (res) {
                if (res.data.flg == 1) {
                    toaster.pop("success", "修改成功!" + (res.data.msg || ""), null,
                        2000, "toast-top-full-width");
                    $("#classModal").modal("hide");
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