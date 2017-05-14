/**
 * Created by lonelydawn on 2017-05-14.
 */

app.controller('absenceRecordCtrl',['$scope', '$state','$http', '$cookies','toaster', function($scope, $state,$http, $cookies, toaster){
    var pageNum = 0;
    var pageSize = window.innerHeight< 771? 8: 16;
    var totalPages = 0;
    $scope.pageBtns = [];

    $scope.keyword = '';

    // 获取单页内容
    var getPage = function(){
        var getPageBtns = function(totalPages){
            $scope.pageBtns = ["<"];
            for(var i=0;i<totalPages;i++)
                $scope.pageBtns[i+1] = i+1;
            $scope.pageBtns[$scope.pageBtns.length] = ">";
            return $scope.pageBtns;
        };

        $http.get("/api/absenceRecord/getPage?pageNum="+ pageNum
            +"&pageSize="+ pageSize+"&keyword="+$scope.keyword+"&studentId="+global_role.id
        ).then(function (res) {
            $scope.dataArr = res.data.items;
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

    // 搜索姓名关键字
    $scope.search = function(){
        pageNum = 0;
        getPage();
    };

    getPage();
}]);