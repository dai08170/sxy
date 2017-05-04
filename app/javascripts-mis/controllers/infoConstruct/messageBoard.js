/**
 * Created by lonelydawn on 2017-05-04.
 */

app.controller('messageBoardCtrl',['$scope', '$state','$http', '$cookies','toaster', function($scope, $state,$http, $cookies, toaster){
    var pageNum = 0;
    var pageSize = window.innerHeight< 771? 4: 8;
    var totalPages = 0;
    $scope.pageBtns = [];

    // 标识所用当前模块所用表名
    var tableIndex= 1;
    $scope.isAnonymous = false;

    // 分页条目数组
    $scope.dataArr = [];

    // 切换留言是否匿名
    $scope.toggleAnonymous = function(){
        $scope.isAnonymous = !$scope.isAnonymous;
    };

    // 创建留言信息
    $scope.createMessage = function () {
        if($scope.message.length > 140)
            toaster.pop("warning", "留言长度不可超过140个字符!", null, 2000, "toast-top-full-width");
        else {
            var data = {
                "tableIndex" :tableIndex,
                "creator_id": global_role.id,
                "content" : $scope.message,
                "is_anonymous": $scope.isAnonymous
            };
            $http.post("/api/infoManage/createMessage", data).then(function (res) {
                if(res.data.flg == 1) {
                    toaster.pop("success", "留言成功!" + (res.data.msg || ""), null, 2000, "toast-top-full-width");
                    getPage();
                } else
                    toaster.pop("danger", "留言失败!" + (res.data.msg || ""), null, 2000, "toast-top-full-width");
            }, function (res) {
                toaster.pop("error", "服务器错误!"+(res.data.msg || ''), null, 2000, "toast-top-full-width");
            });
        }
    };

    // 获取单页内容
    var getPage = function(){
        var getPageBtns = function(totalPages){
            $scope.pageBtns = ["<"];
            for(var i=0;i<totalPages;i++)
                $scope.pageBtns[i+1] = i+1;
            $scope.pageBtns[$scope.pageBtns.length] = ">";
            return $scope.pageBtns;
        };

        $http.get("/api/infoManage/getPage?pageNum=" + pageNum
            + "&pageSize=" + pageSize + "&tableIndex=" + tableIndex).then(function (res) {
            var tmpArr = res.data.items;
            // 检索数组, 如果留言条目匿名, 则将名称显示为 *****
            for(var i=0; i<tmpArr.length; i++)
                if(tmpArr[i].is_anonymous)
                    tmpArr[i].creator_name = "*****";

            $scope.dataArr = tmpArr;
            totalPages = Math.ceil(res.data.count / pageSize);
            $scope.pageBtns = getPageBtns(totalPages);
        }, function (res) {
            toaster.pop("error", "服务器错误!"+(res.data.msg || ''), null, 2000, "toast-top-full-width");
        });
    };

    // 点击分页按钮
    $scope.pageClick = function(value){
        // 转发事件 获取当前页
        if(value == "<" && pageNum >0)
            pageNum--;
        else if(value == ">" && pageNum< totalPages-1)
            pageNum++;
        else if(value == "<" || value == ">")
            console.log(pageNum);
        else pageNum = value-1;

        // 刷新页面
        getPage();
    };

    getPage();
}]);