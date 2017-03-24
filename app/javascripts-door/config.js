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

    $urlRouterProvider.otherwise('/index');
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
        .state('index.page1',{
            url: '/page1',
            views: {
                'content': {
                    templateUrl: '/partial/door/page1.html',
                    controller: 'page1Ctrl'
                }
            }
        })
        .state('index.page2',{
            url: '/page2',
            views: {
                'content': {
                    templateUrl: '/partial/door/page2.html',
                    controller: 'page2Ctrl'
                }
            }
        })
        .state('index.page3',{
            url: '/page3',
            views: {
                'content': {
                    templateUrl: '/partial/door/page3.html',
                    controller: 'page3Ctrl'
                }
            }
        })
        .state('index.page4',{
            url: '/page4',
            views: {
                'content': {
                    templateUrl: '/partial/door/page4.html',
                    controller: 'page4Ctrl'
                }
            }
        });
}]);
