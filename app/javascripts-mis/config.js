/**
 * Created by lonelydawn on 2017-03-03.
 */



var app = angular.module('app', ['ui.router', 'jsonFormatter', 'toaster', 'ngAnimate', 'ngSanitize', 'ngCookies', 'angular-loading-bar', 'perfect_scrollbar', 'angularFileUpload']);
// 标识登录角色
var global_role = undefined;
// 标识全局资源基路径
var global_baseurl = "uploads/";
// 全局配置
var global_modules = [
        {
            text: "个人信息",
            icon: "glyphicon glyphicon-tags",
            moduleId: "1008601",
            href: "main.sSelfInfo"
        }, {
            text: "宣传管理",
            moduleId: "1008602",
            selectable: false,
            state: {
                expanded: false
            },
            nodes: [{
                text: "企业宣传",
                icon: "glyphicon glyphicon-tags",
                moduleId: "100860201",
                href: "main.companyPropagate"
            }, {
                text: "活动宣传",
                icon: "glyphicon glyphicon-tags",
                moduleId: "100860202",
                href: "main.activityPropagate"
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
            state: {
                expanded: false
            },
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
            state: {
                expanded: false
            },
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
            state: {
                expanded: false
            },
            nodes: [{
                text: "用户管理",
                icon: "glyphicon glyphicon-tags",
                moduleId: "100860601",
                href: "main.userManage"
            }, {
                text: "班级管理",
                icon: "glyphicon glyphicon-tags",
                moduleId: "100860610",
                href: "main.classManage"
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
    ];
// 全局数据
var global_config = {
    "config_options": ["行业", "班级", "课程", "职称", "角色", "公告", "活动", "物资", "收支"],
    "user_types": ["学生", "教师"],
    "config_state": ["在读", "毕业", "不明"],
    "regulation_types": ["日常制度", "领导职责"],
    "propagate_types": ["企业宣传", "活动宣传", "课程宣传", "优秀学子"]
};

app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$httpProvider', 'JSONFormatterConfigProvider', 'cfpLoadingBarProvider', function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider, JSONFormatterConfigProvider, cfpLoadingBarProvider) {
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
    cfpLoadingBarProvider.includeSpinner = true;

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
                    templateUrl: '/partial/mis/selfInfo/sSelfInfo.html',
                    controller: 'sSelfInfoCtrl'
                }
            }
        })
        .state('main.tSelfInfo',{
            url: '/tSelfInfo',
            views: {
                'content': {
                    templateUrl: '/partial/mis/selfInfo/tSelfInfo.html',
                    controller: 'tSelfInfoCtrl'
                }
            }
        })
        .state('main.companyPropagate',{
            url: '/companyPropagate',
            params: {
                "typeIndex": 0,
                "pageNum": 0,
                "searchText": ''
            },
            views: {
                'content': {
                    templateUrl: '/partial/mis/collegePropagate/companyPropagate.html',
                    controller: 'propagateCtrl'
                }
            }
        })
        .state('main.activityPropagate',{
            url: '/activityPropagate',
            params: {
                "typeIndex": 1,
                "pageNum": 0,
                "searchText": ''
            },
            views: {
                'content': {
                    templateUrl: '/partial/mis/collegePropagate/activityPropagate.html',
                    controller: 'propagateCtrl'
                }
            }
        })
        .state('main.coursePropagate',{
            url: '/coursePropagate',
            params: {
                "typeIndex": 2,
                "pageNum": 0,
                "searchText": ''
            },
            views: {
                'content': {
                    templateUrl: '/partial/mis/collegePropagate/coursePropagate.html',
                    controller: 'propagateCtrl'
                }
            }
        })
        .state('main.excellentStudent',{
            url: '/excellentStudent',
            params: {
                "typeIndex": 3,
                "pageNum": 0,
                "searchText": ''
            },
            views: {
                'content': {
                    templateUrl: '/partial/mis/collegePropagate/excellentStudent.html',
                    controller: 'propagateCtrl'
                }
            }
        })
        .state('main.propagateDetail',{
            url: '/propagateDetail',
            params: {
                "item": undefined,
                "typeIndex": 0,
                "pageNum": 0,
                "searchText": ''
            },
            views: {
                'content': {
                    templateUrl: '/partial/mis/collegePropagate/propagateDetail.html',
                    controller: 'propagateDetailCtrl'
                }
            }
        })
        .state('main.sCourseBuild',{
            url: '/sCourseBuild',
            views: {
                'content': {
                    templateUrl: '/partial/mis/courseConstruct/sCourseBuild.html',
                    controller: 'sCourseBuildCtrl'
                }
            }
        })
        .state('main.tCourseBuild',{
            url: '/tCourseBuild',
            views: {
                'content': {
                    templateUrl: '/partial/mis/courseConstruct/tCourseBuild.html',
                    controller: 'tCourseBuildCtrl'
                }
            }
        })
        .state('main.dailySystem',{
            url: '/dailySystem',
            views: {
                'content': {
                    templateUrl: '/partial/mis/collegeRegulation/dailySystem.html',
                    controller: 'dailySystemCtrl'
                }
            }
        })
        .state('main.leaderDuty',{
            url: '/leaderDuty',
            views: {
                'content': {
                    templateUrl: '/partial/mis/collegeRegulation/leaderDuty.html',
                    controller: 'leaderDutyCtrl'
                }
            }
        })
        .state('main.messageBoard',{
            url: '/messageBoard',
            views: {
                'content': {
                    templateUrl: '/partial/mis/infoConstruct/messageBoard.html',
                    controller: 'messageBoardCtrl'
                }
            }
        })
        .state('main.systemNotice',{
            url: '/systemNotice',
            views: {
                'content': {
                    templateUrl: '/partial/mis/infoConstruct/systemNotice.html',
                    controller: 'systemNoticeCtrl'
                }
            }
        })
        .state('main.userManage',{
            url: '/userManage',
            views: {
                'content': {
                    templateUrl: '/partial/mis/baseManage/userManage.html',
                    controller: 'userManageCtrl'
                }
            }
        })
        .state('main.classManage',{
            url: '/classManage',
            views: {
                'content': {
                    templateUrl: '/partial/mis/baseManage/classManage.html',
                    controller: 'classManageCtrl'
                }
            }
        })
        .state('main.courseManage',{
            url: '/courseManage',
            views: {
                'content': {
                    templateUrl: '/partial/mis/baseManage/courseManage.html',
                    controller: 'courseManageCtrl'
                }
            }
        })
        .state('main.attendenceManage',{
            url: '/attendenceManage',
            views: {
                'content': {
                    templateUrl: '/partial/mis/baseManage/attendenceManage.html',
                    controller: 'attendenceManageCtrl'
                }
            }
        })
        .state('main.propagateManage',{
            url: '/propagateManage',
            views: {
                'content': {
                    templateUrl: '/partial/mis/baseManage/propagateManage.html',
                    controller: 'propagateManageCtrl'
                }
            }
        })
        .state('main.systemManage',{
            url: '/systemManage',
            views: {
                'content': {
                    templateUrl: '/partial/mis/baseManage/systemManage.html',
                    controller: 'systemManageCtrl'
                }
            }
        })
        .state('main.accountManage',{
            url: '/accountManage',
            views: {
                'content': {
                    templateUrl: '/partial/mis/baseManage/accountManage.html',
                    controller: 'accountManageCtrl'
                }
            }
        })
        .state('main.authorityManage',{
            url: '/authorityManage',
            views: {
                'content': {
                    templateUrl: '/partial/mis/baseManage/authorityManage.html',
                    controller: 'authorityManageCtrl'
                }
            }
        })
        .state('main.infoManage',{
            url: '/infoManage',
            views: {
                'content': {
                    templateUrl: '/partial/mis/baseManage/infoManage.html',
                    controller: 'infoManageCtrl'
                }
            }
        })
        .state('main.configManage',{
            url: '/configManage',
            views: {
                'content': {
                    templateUrl: '/partial/mis/baseManage/configManage.html',
                    controller: 'configManageCtrl'
                }
            }
        });
}]);
