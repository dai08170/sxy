/**
 * Created by lonelydawn on 2017-04-06.
 */

app.controller('branchCtrl',['$scope','$state',function($scope){
    var data = global_config.branch;

    $scope.xuzhou = data.xuzhou;
    $scope.jiangsu = data.jiangsu;
    $scope.other_college = data.other_college;
}]);