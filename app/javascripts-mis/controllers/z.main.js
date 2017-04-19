/**
 * Created by lonelydawn on 2017-03-09.
 */

app.controller("mainCtrl", ['$scope', '$http', '$state', '$cookies', function ($scope, $http, $state, $cookies) {
    // 根据点击树节点编号 转发视图
    var routeViews = function(moduleId){
        switch(moduleId){
            case "100860601":
                $state.go("main.userManage");
                break;
            case "100860610":
                $state.go("main.classManage");
                break;
            case "100860609":
                $state.go("main.configManage");
                break;
            default:
                $state.go("main.homepage");
                break;
        }
    };

    // 创建目录树
    var createTree = function () {
        $('#nav-tree').treeview({
            level: 1,
            expandIcon: 'glyphicon glyphicon-chevron-right',
            collapseIcon: 'glyphicon glyphicon-chevron-down',
            checkedIcon: 'glyphicon glyphicon-chevron-down',
            data: global_config.modules,
            color: '#fff',
            backColor: '#222',
            onhoverColor: '#333',
            showBorder: false,
            onNodeSelected: function(event, node) {
                routeViews(node.moduleId);
            }
        });
    };

    // 获取公告信息
    var getAnnouncements = function(){
        var announcements = [{
            "id": 1,
            "title": "商学管理信息系统已正式投入建设",
            "date": "[3-12]"
        },{
            "id": 2,
            "title": "预计于4月份商学院管理信息系统将正式建成",
            "date": "[3-13]"
        }];
        return announcements;
    };

    $scope.toggleDoor = function () {
        window.location.href = "http://localhost:3000/index/homepage"
    };

    // 退出系统
    $scope.logout = function () {
        $cookies.remove('pass');
        $state.go("login");
    };

    // 模块初始操作
    createTree();
    $scope.announcements = getAnnouncements();
}]);