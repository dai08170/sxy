/**
 * Created by lonelydawn on 2017-04-02.
 */

app.controller('teachingCtrl',['$scope','$state',function($scope){
    var data = global_config.teaching;

    $scope.views = data.views;
    $scope.feature = data.feature;
}]);