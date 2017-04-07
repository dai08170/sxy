/**
 * Created by lonelydawn on 2017-03-24.
 */

var app = angular.module('app', ['ui.router', 'jsonFormatter', 'toaster', 'ngAnimate', 'ngSanitize', 'ngCookies']);
// 全局配置
var global_config = {

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

    $urlRouterProvider.otherwise('/index/homepage');
    $stateProvider
        .state('index', {
            url: '/index',
            views: {
                'rootView@': {
                    templateUrl: '/partial/door/index.html',
                    controller: 'indexCtrl'
                }
            }
        })
        .state('index.homepage', {
            url: '/homepage',
            views: {
                'content': {
                    templateUrl: '/partial/door/homepage.html',
                    controller: 'homepageCtrl'
                }
            }
        })
        .state('index.teaching',{
            url: '/teaching',
            views: {
                'content': {
                    templateUrl: '/partial/door/teaching.html',
                    controller: 'teachingCtrl'
                }
            }
        })
        .state('index.course',{
            url: '/course',
            views: {
                'content': {
                    templateUrl: '/partial/door/course.html',
                    controller: 'courseCtrl'
                }
            }
        })
        .state('index.jiangsu',{
            url: '/jiangsu',
            views: {
                'content': {
                    templateUrl: '/partial/door/jiangsu.html',
                    controller: 'jiangsuCtrl'
                }
            }
        })
        .state('index.xuzhou',{
            url: '/xuzhou',
            views: {
                'content': {
                    templateUrl: '/partial/door/xuzhou.html',
                    controller: 'xuzhouCtrl'
                }
            }
        })
        .state('index.branch',{
            url: '/branch',
            views: {
                'content': {
                    templateUrl: '/partial/door/branch.html',
                    controller: 'branchCtrl'
                }
            }
        })
        .state('index.appDownload',{
            url: '/appDownload',
            views: {
                'content': {
                    templateUrl: '/partial/door/appDownload.html',
                    controller: 'appDownloadCtrl'
                }
            }
        })
        .state('index.contact',{
            url: '/contact',
            views: {
                'content': {
                    templateUrl: '/partial/door/contact.html',
                    controller: 'contactCtrl'
                }
            }
        });
}]);
