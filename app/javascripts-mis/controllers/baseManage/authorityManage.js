/**
 * Created by lonelydawn on 2017-04-20.
 */

app.controller('authorityManageCtrl',['$scope', '$state','$http', '$cookies','toaster', function($scope, $state,$http, $cookies, toaster){
    $scope.searchAccount = undefined;
    // 控制模块标题是否显示
    $scope.search = false;

    $scope.hasModules = [];
    $scope.noModules = [];

    $scope.item = undefined;

    // 通过账号查询用户权限
    $scope.getAuthorityByAccount = function(){
        $scope.hasModules = [];
        $scope.noModules = [];

        // 所有的权限模块
        var authorityModules = {
            "100860601": {
                id: "100860601",
                name: "用户管理"
            },
            "100860602": {
                id: "100860602",
                name: "学生管理"
            },
            "100860603": {
                id: "100860603",
                name: "教师管理"
            },
            "100860604": {
                id: "100860602",
                name: "班级管理"
            },
            "100860605": {
                id: "100860603",
                name: "课程管理"
            },
            "100860606": {
                id: "100860604",
                name: "课程分配"
            },
            "100860607": {
                id: "100860605",
                name: "出勤管理"
            },
            "100860608": {
                id: "100860606",
                name: "宣传管理"
            },
            "100860609": {
                id: "100860607",
                name: "制度管理"
            },
            "100860610": {
                id: "100860608",
                name: "资产管理"
            },
            "100860611": {
                id: "100860609",
                name: "权限管理"
            },
            "100860612": {
                id: "100860610",
                name: "信息管理"
            },
            "100860613": {
                id: "100860611",
                name: "配置管理"
            }
        };
        var moduleIds = [
            "100860601", "100860602", "100860603", "100860604", "100860605", "100860606", "100860607", "100860608", "100860609", "100860610", "100860611", "100860612", "100860613"
        ];

        // 获取用户已有额外权限
        $http.get("/api/authorityManage/get?username=" + $scope.searchAccount).then(function(res){
            if(!res.data.exist) {
                $scope.search = false;
                toaster.pop("danger", "用户不存在!", null, 2000, "toast-top-full-width");
            } else{
                $scope.search = true;
                var hasModuleIds = res.data.modules;

                for(var i=0;i<moduleIds.length;i++){
                    var has = false;
                    for(var j=0; j<hasModuleIds.length; j++) {
                        // 遍历拥有模块的编号数组, 如果判定模块拥有则置入拥有模块数组中
                        if (moduleIds[i] == hasModuleIds[j]) {
                            $scope.hasModules.push(authorityModules[moduleIds[i]]);
                            has = true;
                        }
                    }
                    // 如果模块不在拥有数组中, 则将其置入未拥有模块数组中
                    if(!has)
                        $scope.noModules.push(authorityModules[moduleIds[i]])
                }
            }
        }, function(res){
            toaster.pop("error", "服务器错误!"+(res.data.msg || ''), null, 2000, "toast-top-full-width");
        });
    };

    // 重置查询输入框
    $scope.resetSearch = function(){
        $scope.searchAccount = undefined;
        $scope.search = false;
    };

    // 切换选择的li标签
    $scope.toggleSelect = function(item){
        // 切换全局点击对象
        $scope.item = item;
        // 获取被点击li, 设置class 为 active 置背景色
        var ev = event || window.event;
        var tar = ev.target;

        $(".selectLi").removeClass("active");
        // 兼容被点击对象的不同
        if(tar.tagName.toLowerCase() == "a")
            $(tar).parent().addClass("active");
        else if(tar.tagName.toLowerCase() == "li")
            $(tar).addClass("active");
    };

    // 添加 & 删除权限的抽象方法
    var abstrctAuthorityOperation =function (first, second) {
        // 将模块号链接为字符串
        var concatModuleToString = function(){
            var str = '';
            if($scope.hasModules.length>0) {
                for (var i = 0; i < $scope.hasModules.length - 1; i++)
                    str += $scope.hasModules[i].id + "-";
                str += $scope.hasModules[$scope.hasModules.length - 1].id;
            }
            return str;
        };

        if($scope.item == undefined)
            toaster.pop("warning", "请选择条目!", null, 2000, "toast-top-full-width");
        else if(first.indexOf($scope.item) == -1)
            toaster.pop("warning", "该权限已拥有!", null, 2000, "toast-top-full-width");
        else {
            // 从未拥有权限数组删除, 向拥有权限数组添加
            second.push($scope.item);
            first.splice(first.indexOf($scope.item),1);

            var data = {
                "username": $scope.searchAccount,
                "module": concatModuleToString(),
                "creator_id": global_role.id
            };

            $http.post('/api/authorityManage/update', data).then(function (res) {
                if(res.data.flg == 1) {
                    toaster.pop("success", "权限设置成功!" + (res.data.msg || ""), null, 2000, "toast-top-full-width");

                    // 重置前一选择项
                    $(".selectLi").removeClass("active");
                    $scope.item = undefined;
                } else
                    toaster.pop("danger", "权限设置失败!" + (res.data.msg || ""), null, 2000, "toast-top-full-width");
            }, function (res) {
                toaster.pop("error", "服务器错误!"+(res.data.msg || ''), null, 2000, "toast-top-full-width");
            });
        }
    };

    // 添加权限
    $scope.addAuthority = function(){
        abstrctAuthorityOperation($scope.noModules, $scope.hasModules);
    };

    // 删除权限
    $scope.deleteAuthority = function(){
        abstrctAuthorityOperation($scope.hasModules, $scope.noModules);
    };
}]);