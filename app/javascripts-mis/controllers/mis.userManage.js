/**
 * Created by lonelydawn on 2017-03-14.
 */

app.controller('userManageCtrl',['$scope', '$state','$http', '$cookies','toaster', function($scope, $state,$http, $cookies, toaster){
	$scope.userTypes = global_config.userType;

	$scope.newUserType = $scope.userTypes[0];
    $scope.newUserName = undefined;
    $scope.newUserAccount = undefined;
    $scope.newUserPassword = undefined;


	$scope.users = [];
	$scope.accountExist = true;

	// 创建用户
	$scope.createUser = function(){
		if($scope.newUserName.length > 10)
			toaster.pop("warning", "新建用户名称长度不可超过20!", null, 2000, "toast-top-full-width");
        else if($scope.newUserAccount.length > 20)
            toaster.pop("warning", "新建用户账号长度不可超过20!", null, 2000, "toast-top-full-width");
        else if($scope.newUserPassword.length > 20)
            toaster.pop("warning", "新建用户密码长度不可超过20!", null, 2000, "toast-top-full-width");
        else{
        	var newUser = {
        		"name": $scope.newUserName,
				"username": $scope.newUserAccount,
				"password": $scope.newUserPassword,
				"type": $scope.newUserType
			};

            $http.post("/api/userManage/create", newUser).then(function(res){
                if(res.data.flg == 1){
                    toaster.pop("success", "创建成功!" + (res.data.msg || ""), null, 2000, "toast-top-full-width");
                    $scope.resetNewUser();
                }
                else
                    toaster.pop("danger", "创建失败!" + (res.data.msg || ""), null, 2000, "toast-top-full-width");
            }, function(res){
                toaster.pop("danger", "创建失败!" + (res.data.msg || ""), null, 2000, "toast-top-full-width");
            });
		}
	};

	// 清空录入新建用户信息
    $scope.resetNewUser = function(){
        $scope.newUserType = $scope.userTypes[0];
        $scope.newUserName = undefined;
        $scope.newUserAccount = undefined;
        $scope.newUserPassword = undefined;
    };

    // 反转用户账号是否可用
    $scope.reverseUserDisabled = function(){
      $scope.searchedUserDisabled = !$scope.searchedUserDisabled;
    };

    // 查询用户
	$scope.searchUserByAccount = function(){
        if($scope.searchAccount == undefined || $scope.searchAccount =='')
            toaster.pop("warning", "请输入待查询账号!", null, 2000, "toast-top-full-width");
        else {
        	$http.get("/api/userManage/search?username="+$scope.searchAccount).then(function(res){
				$scope.accountExist = res.data.exists;
				if(!$scope.accountExist)
					toaster.pop("warning", "查询失败!"+ (res.data.msg || ''), null, 2000, "toast-top-full-width");
				else {
                    $scope.searchedUserName = res.data.user.name;
                    $scope.searchedUserAccount = res.data.user.username;
                    $scope.searchedUserPassword = res.data.user.password;
                    $scope.searchedUserType = res.data.user.type;
                    // 0为false 1为true
                    $scope.searchedUserDisabled = res.data.user.state? true: false;
                    $("#userModal").modal("show");
                }
            },function(res){
                toaster.pop("warning", "查询失败!"+ (res.data.msg || ''), null, 2000, "toast-top-full-width");
			});
		}
	};

	// 删除用户
	$scope.deleteUser = function(){
	    var data = {
            "username": $scope.searchedUserAccount
        };
        $http.post('/api/userManage/delete', data).then(function(res){
            if(res.data.flg == 1){
                toaster.pop("success", "删除成功!" + (res.data.msg || ""), null,
                    2000, "toast-top-full-width");
                $("#userModal").modal("hide");
            } else
                toaster.pop("error", "删除失败!" + (res.data.msg || ""), null,
                    2000, "toast-top-full-width");
        }, function(res){
            toaster.pop("error", "删除失败!" + (res.data.msg || ""), null,
                2000, "toast-top-full-width");
        });
    };

	// 修改用户
	$scope.updateUser = function(){
        var data = {
            "username": $scope.searchedUserAccount,
            "name": $scope.searchedUserName,
            "password": $scope.searchedUserPassword,
            "type": $scope.searchedUserType,
            "state": $scope.searchedUserDisabled
        };
        $http.post("/api/userManage/update", data).then(function(res){
            if(res.data.flg == 1){
                toaster.pop("success", "修改成功!" + (res.data.msg || ""), null,
                    2000, "toast-top-full-width");
                $("#userModal").modal("hide");
            } else
                toaster.pop("error", "修改失败!" + (res.data.msg || ""), null,
                    2000, "toast-top-full-width");
        }, function(res){
            toaster.pop("error", "修改失败!" + (res.data.msg || ""), null,
                2000, "toast-top-full-width");
        });
    };
}]);