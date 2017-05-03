/**
 * Created by lonelydawn on 2017-05-03.
 */

app.controller('propagateCtrl',['$scope', '$state', '$stateParams', '$http', '$cookies','toaster', function($scope, $state, $stateParams, $http, $cookies, toaster) {
    $scope.pageSize = window.innerHeight < 771 ? 3 : 6;
    $scope.pageNum = $stateParams.pageNum || 0;
    $scope.totalPages = 0;
    $scope.pageBtns = [];

    // typeIndex 在router路由转发时配置
    var typeIndex = $stateParams.typeIndex;
    // 保存搜索的文本
    $scope.searchText = $stateParams.searchText || '';

    $scope.propagateArr = [];

    $scope.propagateTypes = global_data.propagate_types;
    $scope.propagateType = $scope.propagateTypes[typeIndex];


    // 跳转到详细宣传内容页面
    $scope.forward = function (item) {
        $state.go("main.propagateDetail",
            {
                item: item,
                typeIndex: typeIndex,
                pageNum: $scope.pageNum,
                searchText: $scope.searchText
            }
        );
    };

    // 获取宣传内容页
    $scope.getPropagatePages = function(){
        // 获取分页按键
        var getPageBtns = function(totalPages){
            $scope.pageBtns = ["<"];
            for(var i=0;i<totalPages;i++)
                $scope.pageBtns[i+1] = i+1;
            $scope.pageBtns[$scope.pageBtns.length] = ">";
            return $scope.pageBtns;
        };

        $http.get("/api/collegePropagate/search?txt=" + $scope.searchText
            + "&pageNum=" + $scope.pageNum
            + "&pageSize=" +$scope.pageSize
            + "&tableIndex=" + typeIndex).then(function (res) {
            $scope.propagateArr = res.data.items;
            $scope.totalPages = Math.ceil(res.data.count / $scope.pageSize);
            $scope.pageBtns = getPageBtns($scope.totalPages);
        }, function (res) {
            toaster.pop("error", "服务器错误!"+(res.data.msg || ''), null, 2000, "toast-top-full-width");
        })
    };

    // 点击分页按钮触发事件
    $scope.pageClick = function(value){
        // 转发事件 获取当前页
        if(value == "<" && $scope.pageNum >0)
            $scope.pageNum--;
        else if(value == ">" && $scope.pageNum< $scope.totalPages-1)
            $scope.pageNum++;
        else if(value == "<" || value == ">")
            console.log($scope.pageNum);
        else $scope.pageNum = value-1;

        // 刷新页面
        $scope.getPropagatePages();
    };

    // 搜索宣传内容
    $scope.search = function(){
        $scope.pageNum = 0;
        $scope.getPropagatePages();
    };

    // 初始化操作
    var init = function(){
        $scope.getPropagatePages();
    };
    init();
}]);