/**
 * Created by lonelydawn on 2017-04-02.
 */

app.controller('aboutCtrl',['$scope', function($scope){
    // 在高德地图上显示 位置
    $(function(){
        var map = new AMap.Map('mapContainer', {
            resizeEnable: true,
            zoom:15,
            center: [117.1558500000, 34.2155720000]
        });

        // 工具bar 放大缩小 位置移动
        map.plugin(["AMap.ToolBar"], function() {
            map.addControl(new AMap.ToolBar());
        });

        // 添加标注
        var marker = new AMap.Marker({
            position : [117.1558500000, 34.2155720000],
            title : "格局商学徐州分院",
            map : map
        });
    });

    var data = global_config.about;

    $scope.college = data.college;
    $scope.developer = data.developer;

    $scope.QRModalShow = function(){
        $("#QRModal").modal("show");
    }
}]);