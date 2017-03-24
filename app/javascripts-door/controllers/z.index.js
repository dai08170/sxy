/**
 * Created by lonelydawn on 2017-03-24.
 */

app.controller('indexCtrl',['$scope','$state',function($scope,$state){
    $scope.toggleMis = function () {
      window.location.href = "http://localhost:3000/login";
    };

    $state.go("index.homepage");
}]);