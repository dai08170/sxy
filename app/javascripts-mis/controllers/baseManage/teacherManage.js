/**
 * Created by lonelydawn on 2017-05-05.
 */

app.controller('teacherManageCtrl',['$scope', '$state','$http', '$cookies','toaster', function($scope, $state,$http, $cookies, toaster){
    var pageNum = 0;
    var pageSize = window.innerHeight< 771? 10: 18;
    var totalPages = 0;
    $scope.pageBtns = [];

    // 初始化信息
    $scope.dataArr = [];
    $scope.keyword = '';

    $scope.item = undefined;
    $scope.isMale = $scope.item == undefined;
    $scope.isFemale = $scope.item == undefined;

    $scope.states = global_config.teacher_state;

    // 获取单页内容
    var getPage = function(){
        var getPageBtns = function(totalPages){
            $scope.pageBtns = ["<"];
            for(var i=0;i<totalPages;i++)
                $scope.pageBtns[i+1] = i+1;
            $scope.pageBtns[$scope.pageBtns.length] = ">";
            return $scope.pageBtns;
        };

        $http.get("/api/teacherManage/getPage?pageNum="+ pageNum
            +"&pageSize="+ pageSize+"&keyword="+$scope.keyword
        ).then(function (res) {
            $scope.dataArr = res.data.items;
            totalPages = Math.ceil(res.data.count / pageSize);
            $scope.pageBtns = getPageBtns(totalPages);
        }, function (res) {
            toaster.pop("error", "服务器错误!"+(res.data.msg || ''), null, 2000, "toast-top-full-width");
        });
    };


    // 搜索姓名关键字
    $scope.search = function(){
        pageNum = 0;
        getPage();
    };

    // 切换性别为男
    $scope.toggleMale = function(){
        $scope.isMale = true;
        $scope.isFemale = false;
        $scope.item.sex = "男";
    };

    // 切换性别为女
    $scope.toggleFemale = function(){
        $scope.isMale = false;
        $scope.isFemale = true;
        $scope.item.sex = "女";
    };

    // 更新模态框显示
    $scope.updateModalShow = function (item) {
        // 将字段赋值给模态框各字段
        $scope.item = {
            "id": item.id,
            "name": item.name,
            "sex": item.sex || '男',
            "salary": item.salary,
            "profile_number": item.profile_number,
            "state": item.state || $scope.states[0]
        };

        // 初始化信息
        $scope.isMale = $scope.item.sex != "女";
        $scope.isFemale = $scope.item.sex == "女";

        $("#teacherModal").modal('show');
    };

    // 更新学生信息
    $scope.update = function () {
        // if($scope.item.profile_number.length != 18)
        //     toaster.pop("warning", "请输入18位身份证号", null, 2000, "toast-top-full-width");
        // else{
        var data = {
            "id": $scope.item.id,
            "name": $scope.item.name,
            "sex": $scope.item.sex,
            "profile_number": $scope.item.profile_number,
            "salary": $scope.item.salary,
            "state": $scope.item.state
        };
        $http.post('/api/teacherManage/update', data).then(function (res) {
            if (res.data.flg == 1) {
                toaster.pop("success", "修改成功!" + (res.data.msg || ""), null,
                    2000, "toast-top-full-width");
                getPage();
            } else
                toaster.pop("danger", "修改失败!" + (res.data.msg || ""), null,
                    2000, "toast-top-full-width");
        }, function (res) {
            toaster.pop("error", "服务器错误!"+(res.data.msg || ''), null, 2000, "toast-top-full-width");
        });
        // }
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
