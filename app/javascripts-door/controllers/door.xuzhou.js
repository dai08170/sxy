/**
 * Created by lonelydawn on 2017-04-02.
 */

app.controller('xuzhouCtrl',['$scope','$state',function($scope,$state){
    var data = global_config.xuzhou;

    $scope.president = data.president;
}]);