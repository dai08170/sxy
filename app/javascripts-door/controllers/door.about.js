/**
 * Created by lonelydawn on 2017-04-02.
 */

app.controller('aboutCtrl',['$scope', function($scope){
    var data = global_config.about;

    $scope.college = data.college;
    $scope.developer = data.developer;

    $scope.QRModalShow = function(){
        $("#QRModal").modal("show");
    }
}]);