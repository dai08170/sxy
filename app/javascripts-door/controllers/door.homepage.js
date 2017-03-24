/**
 * Created by lonelydawn on 2017-03-24.
 */

app.controller('homepageCtrl',['$scope','$state',function($scope,$state){
    var init = function () {
        $("#myCarousel").carousel({
            interval: 5000
        });
    };

    init();
}]);