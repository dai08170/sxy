/**
 * Created by lonelydawn on 2017-03-26.
 */

app.controller('appDownloadCtrl',['$scope','$state',function($scope){
    var data = global_config.appDownload;

    $scope.bg = data.background_path;
    $scope.qrCode = data.QRCode_path;

    $scope.phoneModalShow = function(){
        $("#phoneModal").modal("show");
    }
}]);