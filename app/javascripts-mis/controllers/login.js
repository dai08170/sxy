/**
 * Created by lonelydawn on 2017-03-06.
 */

app.controller('loginCtrl', ['$scope', '$http', '$state', '$cookies', 'toaster', function ($scope, $http, $state, $cookies, toaster) {
    if($cookies.get('pass')!=undefined){
        global_role = JSON.parse($cookies.get('pass')).role;
        $state.go('main.homepage');
    }

    $scope.loginIn = function () {
        if ($scope.username == undefined || $scope.password == undefined) toaster.pop("warning", "请输入用户名或密码", null, 2000, "toast-top-full-width");else {
            var json = {
                username: $scope.username,
                password: $scope.password
            };
            $http.post('/api/login', json).then(function (res) {
                if (!res.data.in) toaster.pop("error", "用户名或密码错误!", null, 2000, "toast-top-full-width");else {
                    var pass ={
                        "username": json.username,
                        "password": json.password,
                        "role": res.data.role
                        // "modules": res.data.modules
                    };
                    // 设置 cookie 过期时间
                    var date = new Date();
                    var expires = new Date(1900+date.getYear(), date.getMonth(),
                        date.getDate()+1, date.getHours(), date.getMinutes(),
                        date.getSeconds());

                    $cookies.putObject('pass',pass,{
                        "expires": expires
                    });
                    // 初始化全局角色
                    global_role = res.data.role;
                    $state.go('main.homepage');
                }
            }, function (res) {
                toaster.pop("error", "用户名或密码错误", null, 2000, "toast-top-full-width");
            });
        }
    };
}]);