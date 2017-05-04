/**
 * Created by lonelydawn on 2017-05-04.
 */

app.controller('systemNoticeCtrl',['$scope', '$state','$http', '$cookies','toaster', function($scope, $state,$http, $cookies, toaster){
    var pageNum = 0;
    var pageSize = window.innerHeight< 771? 10: 18;
    var totalPages = 0;
    $scope.pageBtns = [];

    var tableIndex =0;

    $scope.announceTypes = ["全部"];
    $scope.announceType = $scope.announceTypes[0];

    // 分页条目数组
    $scope.dataArr = [];

    // 获取选择类型参数
    var getSelectType = function () {
        return ($scope.announceType == "全部")? "%": $scope.announceType;
    };

    // 切换类型选择
    $scope.toggleSelect = function(){
        getPage();
    };

    // 信息内容模态框显示
    $scope.contentDetailModalShow = function(con){
        $("#con").html(con.replace(/[\n\r]/g,"<br/>").replace(/ /g,"&nbsp;"));
        $("#contentDetailModal").modal('show');
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
            + "&pageSize=" + pageSize + "&tableIndex=" + tableIndex
            + "&type=" + getSelectType()).then(function (res) {
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

    var init = function(){
        $http.get("/api/infoManage/getAnnounceTypes").then(function (res) {
            for(var i =0; i<res.data.length; i++)
                $scope.announceTypes.push(res.data[i]);
            $scope.announceType = $scope.announceTypes[0];
        }, function (res) {
            toaster.pop("error", "服务器错误!"+(res.data.msg || ''), null, 2000, "toast-top-full-width");
        });
        getPage();
    };

    init();
}]);