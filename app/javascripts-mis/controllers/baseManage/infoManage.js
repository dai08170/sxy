/**
 * Created by lonelydawn on 2017-04-20.
 */

app.controller('infoManageCtrl',['$scope', '$state','$http', '$cookies','toaster', function($scope, $state,$http, $cookies, toaster){
    var pageNum = 0;
    var pageSize = window.innerHeight< 771? 10: 18;
    var totalPages = 0;
    $scope.pageBtns = [];

    // 标识所用当前模块所用表名
    var tableIndex= 0;
    var createMode = true;

    console.log(global_role);
    // 初始化模块
    $scope.isMessageBoard = false;
    $scope.isAnnounce = true;

    $scope.announceType = undefined;
    $scope.announceTypes = [];
    $scope.content = undefined;

    // 分页条目数组
    $scope.dataArr = [];

    // 切换至系统公告模块
    $scope.toggleAnnounce = function(){
        $scope.isMessageBoard = false;
        $scope.isAnnounce = true;
        tableIndex =0;
        pageNum = 0;
        getPage();
    };

    // 切换至留言板模块
    $scope.toggleMessageBoard = function(){
        $scope.isMessageBoard = true;
        $scope.isAnnounce = false;
        tableIndex= 1;
        pageNum = 0;
        getPage();
    };

    // 信息内容模态框显示
    $scope.contentDetailModalShow = function(con){
        $("#con").html(con.replace(/[\n\r]/g,"<br/>").replace(/ /g,"&nbsp;"));
        $("#contentDetailModal").modal('show');
    };

    // 公告模态框显示
    $scope.createAnnounceModalShow = function(){
        createMode = true;
        $scope.content = undefined;
        $scope.announceType = $scope.announceTypes[0] || '';
        $("#announceModal").modal('show');
    };

    // 内容模态框显示
    $scope.contentModalShow = function () {
        $("#contentModal").modal('show');
    };

    // 重置内容输入框内容
    $scope.resetContent = function(){
        $scope.content = undefined;
    };

    // 创建系统公告
    $scope.createAnnounce = function(){
        var data = {
            content: $scope.content,
            type: $scope.announceType,
            creator_id: global_role.id,
            tableIndex: tableIndex
        };
        $http.post("/api/infoManage/createAnnounce", data).then(function (res) {
            if(res.data.flg == 1) {
                toaster.pop("success", "创建成功!" + (res.data.msg || ""), null, 2000, "toast-top-full-width");
                getPage();
            } else
                toaster.pop("danger", "创建失败!" + (res.data.msg || ""), null, 2000, "toast-top-full-width");
        }, function (res) {
            toaster.pop("error", "服务器错误!"+(res.data.msg || ''), null, 2000, "toast-top-full-width");
        });
    };

    // 更新模态框显示
    $scope.updateAnnounceModalShow =function(item){
        $scope.announceId = item.id;
        $scope.createMode = false;
        $scope.content = item.content;
        $scope.announceType = item.type;
        $("#announceModal").modal('show');
    };

    // 修改系统公告
    $scope.updateAnnounce = function(){
        var data = {
            id: $scope.announceId,
            content: $scope.content,
            type: $scope.announceType,
            creator_id: global_role.id,
            tableIndex: tableIndex
        };
        $http.post("/api/infoManage/createAnnounce", data).then(function (res) {
            if(res.data.flg == 1)
                toaster.pop("success", "修改成功!" + (res.data.msg || ""), null, 2000, "toast-top-full-width");
            else
                toaster.pop("danger", "修改失败!" + (res.data.msg || ""), null, 2000, "toast-top-full-width");
        }, function (res) {
            toaster.pop("error", "服务器错误!"+(res.data.msg || ''), null, 2000, "toast-top-full-width");
        });
    };

    // 删除
    $scope.delete = function(id){
        var data = {
            id: id,
            tableIndex: tableIndex
        };
        $http.post("/api/infoManage/delete", data).then(function (res) {
            if(res.data.flg == 1){
                toaster.pop("success", "删除成功!" + (res.data.msg || ""), null,
                    2000, "toast-top-full-width");
                getPage();
            } else
                toaster.pop("error", "删除失败!" + (res.data.msg || ""), null,
                    2000, "toast-top-full-width");
            }, function (res) {
                toaster.pop("error", "服务器错误!"+(res.data.msg || ''), null, 2000, "toast-top-full-width");
        });
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

        $http.get("/api/infoManage/getPage?pageNum="+ pageNum
            +"&pageSize="+ pageSize+"&tableIndex="+tableIndex).then(function (res) {
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

    var init = function () {
        $http.get("/api/infoManage/getAnnounceTypes").then(function (res) {
            $scope.announceTypes = res.data;
        }, function (res) {
            toaster.pop("error", "服务器错误!"+(res.data.msg || ''), null, 2000, "toast-top-full-width");
        });

        getPage();
    };
    init();
}]);