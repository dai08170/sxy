/**
 * Created by lonelydawn on 2017-04-20.
 */

app.controller('dailySystemCtrl',['$scope', '$state','$http', '$cookies','toaster', function($scope, $state,$http, $cookies, toaster){
    $scope.objItems = [];
    $scope.nameItems = [];
    $scope.itemName = undefined;

    $scope.itemTitle = undefined;
    $scope.itemContent = undefined;
    $scope.itemEditor = undefined;
    $scope.itemCreateTime = undefined;

    // 获取所有数据对象的名称
    var getItemsName = function(arr){
        var tmpArr = [];
        for(var i=0; i<arr.length; i++)
            tmpArr[i] = arr[i].name;
        return tmpArr;
    };

    // 获取 项 内容
    $scope.getItemData = function(){
        var index = $scope.nameItems.indexOf($scope.itemName);
        var item = $scope.objItems[index];
        $scope.itemTitle = $scope.itemName +" (编号 : " + item.num +")";
        $scope.itemContent = item.content;
        $scope.itemEditor = item.editor;
        $scope.itemCreateTime = item.create_time;
    };

    // 初始化所有数据项
    var initDataItems = function(){
        $http.get("/api/dailySystem/getAll").then(function (res) {
            $scope.objItems = res.data;
            $scope.nameItems = getItemsName(res.data);
            $scope.itemName = $scope.nameItems[0];
            $scope.getItemData();
        }, function (res) {

        });
    };
    initDataItems();
}]);