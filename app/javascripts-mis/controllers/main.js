/**
 * Created by lonelydawn on 2017-03-09.
 */

app.controller("mainCtrl", ['$scope', '$http', '$state', '$cookies', function ($scope, $http, $state, $cookies) {
    // 如果用户cookies存在, 则将角色赋值于全局角色 ;否则, 返回登录界面
    if($cookies.get('pass')!=undefined)
        global_role = JSON.parse($cookies.get('pass')).role;
    else $state.go("login");

    // 根据点击树节点编号 转发视图
    var routeViews = function(moduleId){
        switch(moduleId){
            case "100860201":
                $state.go("main.companyPropagate");
                break;
            case "100860202":
                $state.go("main.activityPropagate");
                break;
            case "100860203":
                $state.go("main.coursePropagate");
                break;
            case "100860204":
                $state.go("main.excellentStudent");
                break;
            case "100860401":
                $state.go("main.dailySystem");
                break;
            case "100860402":
                $state.go("main.leaderDuty");
                break;
            case "100860601":
                $state.go("main.userManage");
                break;
            case "100860602":
                $state.go("main.courseManage");
                break;
            case "100860603":
                $state.go("main.attendenceManage");
                break;
            case "100860604":
                $state.go("main.propagateManage");
                break;
            case "100860605":
                $state.go("main.systemManage");
                break;
            case "100860606":
                $state.go("main.accountManage");
                break;
            case "100860607":
                $state.go("main.authorityManage");
                break;
            case "100860608":
                $state.go("main.infoManage");
                break;
            case "100860609":
                $state.go("main.configManage");
                break;
            case "100860610":
                $state.go("main.classManage");
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