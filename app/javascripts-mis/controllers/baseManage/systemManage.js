/**
 * Created by lonelydawn on 2017-04-20.
 */

app.controller('systemManageCtrl',['$scope', '$state','$http', '$cookies','toaster', function($scope, $state,$http, $cookies, toaster){
    // 初始化新建项类型
    $scope.isRegulation = true;
    $scope.isDuty = false;
    $scope.systemNames = global_data.regulation_types;
    $scope.systemName = $scope.systemNames[0];

    // 选择日常制度
    $scope.toggleRegulation = function(){
        $scope.isRegulation = true;
        $scope.isDuty = false;
        $scope.systemName = $scope.systemNames[0];
    };

    // 选择领导职责
    $scope.toggleDuty = function(){
        $scope.isRegulation = false;
        $scope.isDuty = true;
        $scope.systemName = $scope.systemNames[1];
    };

    // 清空新建信息
    $scope.resetNew = function(){
        $scope.newNumber = undefined;
        $scope.newName = undefined;
        $scope.newContent = undefined;
    };

    // 点击新建
    $scope.createNew = function(){
        if($scope.newNumber.length >= 20)
            toaster.pop("warning", "新建"+ $scope.systemName +"编号长度不可超过20!", null, 2000, "toast-top-full-width");
        else{
            var data = {
                "tableIndex": $scope.systemNames.indexOf($scope.systemName),
                "number": $scope.newNumber,
                "creator_id": global_role.id,
                "name": $scope.newName,
                "content": $scope.newContent.replace(/[\n\r]/g,"<br/>").replace(/ /g,"&nbsp;")
            };
            console.log($scope.newContent);
            console.log($scope.newContent.replace("\n",";"));
            $http.post("/api/systemManage/create", data).then(function(res){
                if(res.data.flg == 1){
                    toaster.pop("success", "创建成功!" + (res.data.msg || ""), null, 2000, "toast-top-full-width");
                    $scope.resetNew();
                } else
                    toaster.pop("danger", "创建失败!" + (res.data.msg || ""), null, 2000, "toast-top-full-width");
            }, function(res){
                toaster.pop("danger", "创建失败!" + (res.data.msg || ""), null, 2000, "toast-top-full-width");
            });
        }
    };

    // 显示内容输入模态框
    $scope.contentModalShow = function(){
        $("#contentModal").modal("show");
    };

    // 清空待删除项 编号
    $scope.resetDelete = function(){
        $scope.deleteNumber = undefined;
    };

    // 根据编号删除信息
    $scope.deleteByNumber = function(){
        if($scope.deleteNumber == undefined || $.trim($scope.deleteNumber) =='')
            toaster.pop("warning", "请输入待删除项编号!", null, 2000, "toast-top-full-width");
        else {
            var data = {
                "tableIndex": $scope.systemNames.indexOf($scope.systemName),
                "number": $scope.deleteNumber
            };
            $http.post("/api/systemManage/delete", data).then(function(res){
                var flg = res.data.flg;
                if(flg < 1)
                    toaster.pop("danger", "删除失败!"+ (res.data.msg || ''), null, 2000, "toast-top-full-width");
                else {
                    toaster.pop("success", "删除成功!"+ (res.data.msg || ''), null, 2000, "toast-top-full-width");
                }
            },function(res){
                toaster.pop("danger", "删除失败!"+ (res.data.msg || ''), null, 2000, "toast-top-full-width");
            });
        }
    };
}]);