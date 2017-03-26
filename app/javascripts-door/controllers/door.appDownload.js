/**
 * Created by lonelydawn on 2017-03-26.
 */

app.controller('appDownloadCtrl',['$scope','$state',function($scope,$state){
    $scope.phoneModalShow = function(){
        $("#phoneModal").modal("show");
    }
}]);