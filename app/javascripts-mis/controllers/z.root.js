/**
 * Created by lonelydawn on 2017-03-09.
 */

app.controller('rootCtrl',['$scope', '$state', function($scope, $state){
    $scope.goBack = function(){
        $state.go('login');
    };
}]);