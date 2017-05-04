/**
 * Created by lonelydawn on 2017-04-08.
 */

app.controller('configManageCtrl', ['$scope', '$http', 'toaster', function($scope, $http, toaster){
    $scope.configOptions = global_config.config_options;
    $scope.configOption = $scope.configOptions[0];

    $scope.configData = undefined;
    $scope.tableData = undefined;

    $scope.newConfigName = undefined;

    // 将数组划分为表格
    var getLevelArray = function(arr){
        var tmpArr = [[],[],[],[],[]];
        for(var i=0; i< arr.length; i++){
            var index = Math.floor(i/5);
            var subIndex = i%5;
            tmpArr[index][subIndex] = arr[i];
        }
        return tmpArr;
    };

    // 将对象数组转化为 字符串数组
    var getConfigNameArray = function(arr){
        var tmpArr = [];
        for(var i=0; i<arr.length; i++)
            tmpArr[i] = arr[i].name;
        return tmpArr;
    };

    // 获取当前配置已有数据
    var getCurrentConfigData = function(){
        var tableIndex = $scope.configOptions.indexOf($scope.configOption);
        $http.get('/api/configManage/getCurrent?tableIndex=' + tableIndex ).then(function(res){
            // 返回的是对象数组, 需要转换为字符串数组
            $scope.configData = getConfigNameArray(res.data);
            // 数组数据划分为表格
            $scope.tableData = getLevelArray($scope.configData);
        }, function (res) {
            toaster.pop("error", "已有配置项数据获取失败!"+(res.data.msg || ''), null, 2000, "toast-top-full-width");
        });
    };

    // 清空新建 配置项数据输入框
    var initCreateConfig = function(){
        $scope.newConfigName = undefined;
    };

    // 选择 配置项类型 触发动作
    $scope.toggleConfigItem = function(){
        getCurrentConfigData();
        initCreateConfig();
    };

    // 清空新建配置
    $scope.resetNewConfig = function(){
        $scope.newConfigName = undefined;
    };

    // 显示确认创建模态框
    $scope.createConfirm = function(){
        if($scope.newConfigName == undefined || $.trim($scope.newConfigName) == '')
            toaster.pop("warning", "请输入新建配置项名称!", null, 2000, "toast-top-full-width");
        else $("#confirmModal").modal("show");
    };

    // 创建新配置项数据
    $scope.createNewConfigItem = function(){
        if($scope.newConfigName.length >= 20)
            toaster.pop("warning", "新建配置名称长度不可超过20!", null, 2000, "toast-top-full-width");
        else {
            var data = {
                "tableIndex": $scope.configOptions.indexOf($scope.configOption),
                "configItemData": $scope.newConfigName
            };
            $http.post('/api/configManage/create', data).then(function (res) {
                if (res.data.flg == 1) {
                    toaster.pop("success", "创建成功!" + (res.data.msg || ""), null,
                        2000, "toast-top-full-width");
                    $scope.configData.push($scope.newConfigName);
                    // 数组数据划分为表格
                    $scope.tableData = getLevelArray($scope.configData);
                    initCreateConfig();
                } else
                    toaster.pop("danger", "创建失败!" + (res.data.msg || ""), null,
                        2000, "toast-top-full-width");
                $("#confirmModal").modal("hide");
            }, function (res) {
                toaster.pop("error", "服务器错误!"+(res.data.msg || ''), null,
                    2000, "toast-top-full-width");
            });
        }
    };

    // 初始化 当前配置项数据表
    getCurrentConfigData();
}]);