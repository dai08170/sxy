/**
 * Created by lonelydawn on 2017-03-24.
 */

app.controller('homepageCtrl',['$scope','$state',function($scope){
    var data = global_config.homepage ;

    $scope.slide = data.slide;
    $scope.xuzhou = data.xuzhou;
    $scope.intro = data.intro;
    $scope.advantage = data.advantage;
    $scope.feature = data.feature;
    $scope.creater = data.creater;
    $scope.createrTeam = data.creater_team;
    $scope.service = data.service;

    var init = function () {
        $("#myCarousel").carousel({
            interval: 5000
        });
    };

    init();
}]);