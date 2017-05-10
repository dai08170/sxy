/**
 * Created by lonelydawn on 2017-03-09.
 */

app.controller("mainCtrl", ['$scope', '$http', '$state', '$cookies', '$interval', 'toaster', function ($scope, $http, $state, $cookies, $interval, toaster) {
    // 如果用户cookies存在, 则将角色赋值于全局角色 ;否则, 返回登录界面
    if($cookies.get('pass')!=undefined)
        global_role = JSON.parse($cookies.get('pass')).role;
    else $state.go("login");

    // 根据点击树节点编号 转发视图
    var routeViews = function(moduleId){
        switch(moduleId){
            case "1008601":
                $state.go("main.selfInfo");
                break;
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
            case "100860501":
                $state.go("main.messageBoard");
                break;
            case "100860502":
                $state.go("main.systemNotice");
                break;
            case "100860601":
                $state.go("main.userManage");
                break;
            case "100860602":
                $state.go("main.studentManage");
                break;
            case "100860603":
                $state.go("main.teacherManage");
                break;
            case "100860604":
                $state.go("main.classManage");
                break;
            case "100860605":
                $state.go("main.courseManage");
                break;
            case "100860606":
                $state.go("main.courseDistribute");
                break;
            case "100860607":
                $state.go("main.attendenceManage");
                break;
            case "100860608":
                $state.go("main.propagateManage");
                break;
            case "100860609":
                $state.go("main.systemManage");
                break;
            case "100860610":
                $state.go("main.accountManage");
                break;
            case "100860611":
                $state.go("main.authorityManage");
                break;
            case "100860612":
                $state.go("main.infoManage");
                break;
            case "100860613":
                $state.go("main.configManage");
                break;
            default:
                $state.go("main.homepage");
                break;
        }
    };

    // 创建目录树
    var createTree = function () {
        // 基础权限模块
        var modules = [];
        // 权限模块父级模块
        var extraModuleParent = {
            text: "基础管理",
            selectable: false,
            moduleId: "1008606",
            state: {
                expanded: false
            },
            nodes: []
        };

        // 根据 id 号返回权限模块
        var getAuthorityModules = function(moduleId){
            return {
                "100860601": {
                    text: "用户管理",
                    icon: "glyphicon glyphicon-tags",
                    moduleId: "100860601",
                    href: "main.userManage"
                },
                "100860602": {
                    text: "学生管理",
                    icon: "glyphicon glyphicon-tags",
                    moduleId: "100860602",
                    href: "main.studentManage"
                },
                "100860603": {
                    text: "教师管理",
                    icon: "glyphicon glyphicon-tags",
                    moduleId: "100860603",
                    href: "main.teacherManage"
                },
                "100860604": {
                    text: "班级管理",
                    icon: "glyphicon glyphicon-tags",
                    moduleId: "100860604",
                    href: "main.classManage"
                },
                "100860605": {
                    text: "课程管理",
                    icon: "glyphicon glyphicon-tags",
                    moduleId: "100860605",
                    href: "main.courseManage"
                },
                "100860606": {
                    text: "课程分配",
                    icon: "glyphicon glyphicon-tags",
                    moduleId: "100860606",
                    href: "main.courseDistribute"
                },
                "100860607": {
                    text: "出勤管理",
                    icon: "glyphicon glyphicon-tags",
                    moduleId: "100860607",
                    href: "main.attendenceManage"
                },
                "100860608": {
                    text: "宣传管理",
                    icon: "glyphicon glyphicon-tags",
                    moduleId: "100860608",
                    href: "main.propagateManage"
                },
                "100860609": {
                    text: "制度管理",
                    icon: "glyphicon glyphicon-tags",
                    moduleId: "100860609",
                    href: "main.systemManage"
                },
                "100860610": {
                    text: "资产管理",
                    icon: "glyphicon glyphicon-tags",
                    moduleId: "100860610",
                    href: "main.accountManage"
                },
                "100860611": {
                    text: "权限管理",
                    icon: "glyphicon glyphicon-tags",
                    moduleId: "100860611",
                    href: "main.authorityManage"
                },
                "100860612": {
                    text: "信息管理",
                    icon: "glyphicon glyphicon-tags",
                    moduleId: "100860612",
                    href: "main.infoManage"
                },
                "100860613": {
                    text: "配置管理",
                    icon: "glyphicon glyphicon-tags",
                    moduleId: "100860613",
                    href: "main.configManage"
                }
            }[moduleId];
        };
        // 创建目录树
        var createBranchs = function(){
            $('#nav-tree').treeview({
                level: 1,
                expandIcon: 'glyphicon glyphicon-chevron-right',
                collapseIcon: 'glyphicon glyphicon-chevron-down',
                checkedIcon: 'glyphicon glyphicon-chevron-down',
                data: modules,
                color: '#fff',
                backColor: '#222',
                onhoverColor: '#333',
                showBorder: false,
                onNodeSelected: function(event, node) {
                    routeViews(node.moduleId);
                }
            });
        };
        // 添加权限模块
        $http.get('/api/authorityManage/get?username='+global_role.username).then(function (res) {
            // 将全局可用模块复制进入创建树 的模块组
            // 直接赋值的话, 会改变原始数组内容
            for(var t =0;t<global_modules.length;t++)
                modules.push(global_modules[t]);

            // 如果有权限模块, 则将其加入目录树中
            if(res.data.modules.length > 0){
                var moduleIds = res.data.modules;
                for(var i=0; i<moduleIds.length; i++)
                    extraModuleParent.nodes.push(getAuthorityModules(moduleIds[i]));
                modules.push(extraModuleParent);
            }
            console.log(modules);
            createBranchs();
        }, function (res) {
            toaster.pop("error", "服务器错误!"+(res.data.msg || ''), null, 2000, "toast-top-full-width");
        });
    };

    // 返回门户网
    $scope.toggleDoor = function () {
        window.location.href = "http://localhost:3000/index/homepage"
    };

    // 退出系统
    $scope.logout = function () {
        $cookies.remove('pass');
        $state.go("login");
    };

    // 设置公告栏
    $scope.announcement = undefined;
    var setAnnounceBar = function(){
        // 控制公告获取最大数量
        var announceNum = 8;

        // 获取公告信息, 并设置定时更换公告信息
        $http.get("/api/infoManage/getPage?pageNum=0"
            +"&pageSize="+ announceNum+"&tableIndex=0").then(function (res) {
            var announcements = res.data.items;
            if(announcements.length>0){
                var index = 0;
                $scope.announcement = announcements[index];
                // 设置定时器定时更换公告信息
                $interval(function () {
                    index = (index+1)<announcements.length? index+1: 0;
                    $scope.announcement = announcements[index];
                }, 10000);
            }else
                $scope.announcement = {
                    "type": "公告",
                    "content": "暂无"
                };
        }, function (res) {
            toaster.pop("error", "服务器错误!"+(res.data.msg || ''), null, 2000, "toast-top-full-width");
        });
    };

    createTree();
    setAnnounceBar();
}]);