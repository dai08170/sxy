/**
 * Created by lonelydawn on 2017-05-03.
 */

app.controller('propagateDetailCtrl',['$scope', '$state', '$stateParams', 'toaster', function($scope, $state, $stateParams, toaster) {
    $scope.item = $stateParams.item;
    $scope.typeIndex = $stateParams.typeIndex;
    var pageNum = $stateParams.pageNum;

    if($scope.item == undefined || $scope.typeIndex == undefined) {
        toaster.pop("danger", "数据丢失!页面跳转至首页!", null, 2000, "toast-top-full-width");
        $state.go("main.homepage");
    } else {
        var propagateTypes = global_config.propagate_types;
        $scope.propagateType = propagateTypes[$scope.typeIndex];
    }

    $scope.backward = function(){
        switch($scope.typeIndex){
            case 0:
                $state.go("main.companyPropagate",
                    {pageNum: pageNum, searchText: $stateParams.searchText});
                break;
            case 1:
                $state.go("main.activityPropagate", {pageNum: pageNum});
                break;
            case 2:
                $state.go("main.coursePropagate", {pageNum: pageNum});
                break;
            case 3:
                $state.go("main.excellentStudent", {pageNum: pageNum});
                break;
        }
    };
}]);