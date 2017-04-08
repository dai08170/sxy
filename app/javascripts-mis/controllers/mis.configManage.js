/**
 * Created by lonelydawn on 2017-04-08.
 */

app.controller('configManageCtrl', ['$scope','$http', function($scope, $http){
    var data = global_data.configManage;

    $scope.configItems = data.config_items;
    $scope.configItem = $scope.configItems[0];
    $scope.configItemData = undefined;

    console.log($scope.configItems);
    console.log($scope.configItem);

    // 更新所选配置项现有数据
    $scope.changeConfigItem = function(){
        $http.get().then(function(res){

        },function(res){

        });
    };
}]);