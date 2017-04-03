/**
 * Created by lonelydawn on 2017-04-02.
 */

app.controller('contactCtrl',['$scope', function($scope){
    $scope.QRModalShow = function(){
        $("#QRModal").modal("show");
    }
}]);