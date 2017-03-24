/**
 * Created by lonelydawn on 2017-03-03.
 */



var app = angular.module('app', ['ui.router', 'jsonFormatter', 'toaster', 'ngAnimate', 'ngSanitize', 'ngCookies']);
// 标识登录角色
var global_role = undefined;
// 全局配置
var global_config = {
    modules: [
        {
            text: "个人信息",
            icon: "glyphicon glyphicon-tags",
            moduleId: "1008601",
            href: "main.sSelfInfo"
        }, {
            text: "宣传管理",
            moduleId: "1008602",
            selectable: false,
            nodes: [{
                text: "企业宣传",
                icon: "glyphicon glyphicon-tags",
                moduleId: "100860201",
                href: "main.companyPropagate"
            }, {
                text: "活动宣传",
                icon: "glyphicon glyphicon-tags",
                moduleId: "main.activityPropagate"
            }, {
                text: "课程宣传",
                icon: "glyphicon glyphicon-tags",
                moduleId: "100860203",
                href: "main.coursePropagate"
            }, {
                text: "优秀学子",
                icon: "glyphicon glyphicon-tags",
                moduleId: "100860204",
                href: "main.perfectStudent"
            }]
        }, {
            text: "课程建设",
            icon: "glyphicon glyphicon-th",
            moduleId: "1008603",
            href: "main.tCourseBuild"
        }, {
            text: "学院制度",
            selectable: false,
            moduleId: "1008604",
            nodes: [{
                text: "日常制度",
                icon: "glyphicon glyphicon-tags",
                moduleId: "100860401",
                href: "main.dailySystem"
            }, {
                text: "领导职责",
                icon: "glyphicon glyphicon-tags",
                moduleId: "100860402",
                href: "main.leaderDuty"
            }]
        }, {
            text: "信息建设",
            selectable: false,
            moduleId: "1008605",
            nodes: [{
                text: "留言板",
                icon: "glyphicon glyphicon-tags",
                moduleId: "100860501",
                href: "main.messageBoard"
            }, {
                text: "系统公告",
                icon: "glyphicon glyphicon-tags",
                moduleId: "100860502",
                href: "main.systemNotice"
            }]
        }, {
            text: "基础管理",
            selectable: false,
            moduleId: "1008606",
            nodes: [{
                text: "档案管理",
                icon: "glyphicon glyphicon-tags",
                moduleId: "100860601",
                href: "main.documentManage"
            }, {
                text: "课程管理",
                icon: "glyphicon glyphicon-tags",
                moduleId: "100860602",
                href: "main.courseManage"
            }, {
                text: "出勤管理",
                icon: "glyphicon glyphicon-tags",
                moduleId: "100860603",
                href: "main.attendenceManage"
            }, {
                text: "宣传管理",
                icon: "glyphicon glyphicon-tags",
                moduleId: "100860604",
                href: "main.propagateManage"
            }, {
                text: "制度管理",
                icon: "glyphicon glyphicon-tags",
                moduleId: "100860605",
                href: "main.systemManage"
            }, {
                text: "资产管理",
                icon: "glyphicon glyphicon-tags",
                moduleId: "100860606",
                href: "main.accountManage"
            }, {
                text: "权限管理",
                icon: "glyphicon glyphicon-tags",
                moduleId: "100860607",
                href: "main.authorityManage"
            }, {
                text: "信息管理",
                icon: "glyphicon glyphicon-tags",
                moduleId: "100860608",
                href: "main.infoManage"
            }, {
                text: "配置管理",
                icon: "glyphicon glyphicon-tags",
                moduleId: "100860609",
                href: "main.configManage"
            }]
        }
    ]
};

app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$httpProvider', 'JSONFormatterConfigProvider', function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider, JSONFormatterConfigProvider) {
    // 在请求中设置 X-Requested-With 向服务器声明这是一个XHR请求
    $httpProvider.defaults.headers.common = {
        'X-Requested-With': 'XMLHttpRequest'
    };

    // 默认启用html5模式，使用history api
    $locationProvider.html5Mode({
        enabled: true,
        requireBases: false
    });

    JSONFormatterConfigProvider.hoverPreviewEnabled = true;
    window.httpProvider = $httpProvider;
    $httpProvider.defaults.headers.common.pageSize = 1000;
    $httpProvider.defaults.headers.common.pageNum = 1;
    $httpProvider.defaults.headers.common["Cache-Control"] = "no-cache";
    $httpProvider.defaults.headers.common.Pragma = "no-cache";

    $urlRouterProvider.otherwise('/login');
    $stateProvider
        .state('login', {
            url: '/login',
            views: {
                'rootView@': {
                    templateUrl: '/partial/mis/login.html',
                    controller: 'loginCtrl'
                }
            }
        })
        .state('error', {
            url: '/error',
            views: {
                'rootView@': {
                    templateUrl: '/partial/mis/error.html',
                    controller: 'errorCtrl'
                }
            }
        })
        .state('main',{
            url: '/main',
            views: {
                'rootView@': {
                    templateUrl: '/partial/mis/main.html',
                    controller: 'mainCtrl'
                }
            }
        })
        .state('main.homepage',{
            url: '/homepage',
            views: {
                'content': {
                    templateUrl: '/partial/mis/homepage.html',
                    controller: 'homepageCtrl'
                }
            }
        })
        .state('main.sSelfInfo',{
            url: '/sSelfInfo',
            views: {
                'content': {
                    templateUrl: '/partial/mis/sSelfInfo.html',
                    controller: 'sSelfInfoCtrl'
                }
            }
        })
        .state('main.tSelfInfo',{
            url: '/tSelfInfo',
            views: {
                'content': {
                    templateUrl: '/partial/mis/tSelfInfo.html',
                    controller: 'tSelfInfoCtrl'
                }
            }
        })
        .state('main.companyPropagate',{
            url: '/companyPropagate',
            views: {
                'content': {
                    templateUrl: '/partial/mis/companyPropagate.html',
                    controller: 'companyPropagateCtrl'
                }
            }
        })
        .state('main.activityPropagate',{
            url: '/activityPropagate',
            views: {
                'content': {
                    templateUrl: '/partial/mis/activityPropagate.html',
                    controller: 'activityPropagateCtrl'
                }
            }
        })
        .state('main.coursePropagate',{
            url: '/coursePropagate',
            views: {
                'content': {
                    templateUrl: '/partial/mis/coursePropagate.html',
                    controller: 'coursePropagateCtrl'
                }
            }
        })
        .state('main.perfectStudent',{
            url: '/perfectStudent',
            views: {
                'content': {
                    templateUrl: '/partial/mis/perfectStudent.html',
                    controller: 'perfectStudentCtrl'
                }
            }
        })
        .state('main.sCourseBuild',{
            url: '/sCourseBuild',
            views: {
                'content': {
                    templateUrl: '/partial/mis/sCourseBuild.html',
                    controller: 'sCourseBuildCtrl'
                }
            }
        })
        .state('main.tCourseBuild',{
            url: '/tCourseBuild',
            views: {
                'content': {
                    templateUrl: '/partial/mis/tCourseBuild.html',
                    controller: 'tCourseBuildCtrl'
                }
            }
        })
        .state('main.dailySystem',{
            url: '/dailySystem',
            views: {
                'content': {
                    templateUrl: '/partial/mis/dailySystem.html',
                    controller: 'dailySystemCtrl'
                }
            }
        })
        .state('main.leaderDuty',{
            url: '/leaderDuty',
            views: {
                'content': {
                    templateUrl: '/partial/mis/leaderDuty.html',
                    controller: 'leaderDutyCtrl'
                }
            }
        })
        .state('main.messageBoard',{
            url: '/messageBoard',
            views: {
                'content': {
                    templateUrl: '/partial/mis/messageBoard.html',
                    controller: 'messageBoardCtrl'
                }
            }
        })
        .state('main.systemNotice',{
            url: '/systemNotice',
            views: {
                'content': {
                    templateUrl: '/partial/mis/systemNotice.html',
                    controller: 'systemNoticeCtrl'
                }
            }
        })
        .state('main.documentManage',{
            url: '/documentManage',
            views: {
                'content': {
                    templateUrl: '/partial/mis/documentManage.html',
                    controller: 'documentManageCtrl'
                }
            }
        })
        .state('main.courseManage',{
            url: '/courseManage',
            views: {
                'content': {
                    templateUrl: '/partial/mis/courseManage.html',
                    controller: 'courseManageCtrl'
                }
            }
        })
        .state('main.attendenceManage',{
            url: '/attendenceManage',
            views: {
                'content': {
                    templateUrl: '/partial/mis/attendenceManage.html',
                    controller: 'attendenceManageCtrl'
                }
            }
        })
        .state('main.propagateManage',{
            url: '/propagateManage',
            views: {
                'content': {
                    templateUrl: '/partial/mis/propagateManage.html',
                    controller: 'propagateManageCtrl'
                }
            }
        })
        .state('main.systemManage',{
            url: '/systemManage',
            views: {
                'content': {
                    templateUrl: '/partial/mis/systemManage.html',
                    controller: 'systemManageCtrl'
                }
            }
        })
        .state('main.accountManage',{
            url: '/accountManage',
            views: {
                'content': {
                    templateUrl: '/partial/mis/accountManage.html',
                    controller: 'accountManageCtrl'
                }
            }
        })
        .state('main.authorityManage',{
            url: '/authorityManage',
            views: {
                'content': {
                    templateUrl: '/partial/mis/authorityManage.html',
                    controller: 'authorityManageCtrl'
                }
            }
        })
        .state('main.infoManage',{
            url: '/infoManage',
            views: {
                'content': {
                    templateUrl: '/partial/mis/infoManage.html',
                    controller: 'infoManageCtrl'
                }
            }
        })
        .state('main.configManage',{
            url: '/configManage',
            views: {
                'content': {
                    templateUrl: '/partial/mis/configManage.html',
                    controller: 'configManageCtrl'
                }
            }
        });
}]);
