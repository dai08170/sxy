/**
 * Created by lonelydawn on 2017-03-24.
 */

app.controller('rootCtrl',['$scope', '$state', function($scope, $state){
    $scope.goBack = function(){
        $state.go('index');
    };
}]);