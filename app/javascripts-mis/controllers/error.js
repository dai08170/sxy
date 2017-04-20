/**
 * Created by lonelydawn on 2017-03-06.
 */

app.controller('errorCtrl',['$scope','$state',function($scope,$state){
    $state.go('error');
    $state.back = function(){
        $state.go('login');
    }
}]);