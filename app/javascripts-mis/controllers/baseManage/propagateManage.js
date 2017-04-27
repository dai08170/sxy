/**
 * Created by lonelydawn on 2017-04-20.
 */

app.controller('propagateManageCtrl',['$scope', '$state','$http', '$cookies','toaster', function($scope, $state,$http, $cookies, toaster){
    $scope.pageSize = window.innerHeight < 771 ? 5 : 10;

    $scope.propagateTypes = global_data.propagate_types;
    $scope.propagateType = $scope.propagateTypes[2];

    $scope.tableData =undefined;

    $scope.pageBtns = [];

    // 将对象数组转化为 字符串数组
    var getNameArray = function(arr){
        var tmpArr = [];
        for(var i=0; i<arr.length; i++)
            tmpArr[i] = arr[i].name;
        return tmpArr;
    };

    // 显示企业宣传模态框
    $scope.companyTypeModalShow = function(){
        $http.get('/api/configManage/getCurrent?tableIndex=0').then(function(res){
            // 返回的是对象数组, 需要转换为字符串数组
            $scope.companyTypes = getNameArray(res.data);
            // 显示模态框
            $("#companyTypeModal").modal('show');
        }, function (res) {
            toaster.pop("error", "已有配置项数据获取失败!"+(res.data.msg || ''), null, 2000, "toast-top-full-width");
        });
    };

    // 创建宣传
    $scope.createModalShow = function(){
        // 初始化公司宣传模态框
        var initCompanyModal = function(){
            $scope.companyTitle = undefined;
            $scope.propagateContent = undefined;
            $scope.companyName = undefined;
            $scope.companyType = undefined;
            $scope.companyAddress = undefined;
            $scope.companyPhone = undefined;
        };
        // 初始化活动宣传模态框
        var initActivityModal = function(){
            $scope.activityTitle = undefined;
            $scope.propagateContent = undefined;
            $scope.activityName = undefined;
            $scope.activityMan = undefined;
            $scope.activityPhone = undefined;
            /**
             * table index 如下:
             * 0 sxy_industry_type
             * 1 sxy_class_type
             * 2 sxy_course_type
             * 3 sxy_title_type
             * 4 sxy_role_type
             * 5 sxy_announce_type
             * 6 sxy_activity_type
             * 7 sxy_material_type
             * 8 sxy_account_type
             */
            $http.get('/api/configManage/getCurrent?tableIndex=6').then(function(res){
                // 返回的是对象数组, 需要转换为字符串数组
                $scope.activityTypes = getNameArray(res.data);
                $scope.activityType = $scope.activityTypes[0];
            }, function (res) {
                toaster.pop("error", "已有配置项数据获取失败!"+(res.data.msg || ''), null, 2000, "toast-top-full-width");
            });
        };
        // 初始化课程宣传模态框
        var initCourseModal = function () {
            $scope.courseTitle = undefined;
            $scope.propagateContent = undefined;
            $http.get('/api/courseManage/getCurrent?tableIndex=6').then(function(res){
                // 返回的是对象数组, 需要转换为字符串数组
                $scope.activityTypes = getNameArray(res.data);
                $scope.activityType = $scope.activityTypes[0];
            }, function (res) {
                toaster.pop("error", "已有配置项数据获取失败!"+(res.data.msg || ''), null, 2000, "toast-top-full-width");
            });
        };
        // 初始化优秀学子模态框
        var initStudentModal = function () {

        };

        var index = $scope.propagateTypes.indexOf($scope.propagateType);
        switch(index){
            case 0:
                initCompanyModal();
                $("#companyPropagateModal").modal({show:true, backdrop: true, keyboard: true });
                break;
            case 1:
                initActivityModal();
                $("#activityPropagateModal").modal({show:true, backdrop: true, keyboard: true });
                break;
            case 2:
                initCourseModal();
                $("#coursePropagateModal").modal({show:true, backdrop: true, keyboard: true });
                break;
            case 3:
                initStudentModal();
                $("#excellentStudentModal").modal({show:true, backdrop: true, keyboard: true });
                break;
        }
    };

    // 创建公司宣传
    $scope.createCompanyPropagate = function(){

    };

    // 创建活动宣传
    $scope.createActivityPropagate = function(){

    };

    // 创建课程宣传
    $scope.createCoursePropagate = function(){

    };

    // 创建优秀学子
    $scope.createExcellentStudent = function(){

    };

    // 显示宣传内容模态框
    $scope.contentModalShow = function(){
        $("#contentModal").modal("show");
    };

    // 重置内容输入框内容
    $scope.resetContent = function(){
        $scope.propagateContent = undefined;
    };

    // 点击选择企业类型
    $scope.toggleSelect = function(type){
        $(".company-type").removeClass("btn-info");
        var ev = event || window.event;
        $(ev.target).addClass("btn-info");
        $scope.companyType = type;
        $("#companyTypeModal").modal('hide');
    };

    // 分页选项
    var options = {
        currentPage :0,
        maxPages: 4,
        pageSize: $scope.pageSize,
        pageBtns: ["<",1,2,3,4,5,">"]
    };
    $scope.pageBtns = options.pageBtns;

    // 获取分页数据
    var getPropagatePage = function(){
        $http.get('/api/propagateManage/getPage?tableIndex=' +
            $scope.propagateTypes.indexOf($scope.propagateType) + "&pageNum=" +
        options.currentPage + "&pageSize=" +options.pageSize).then(function (res) {
            console.log(res.data);
        }, function (res) {

        });
    };

    // 点击分页按钮触发事件
    $scope.pageClick = function(value){
        // 转发事件 获取当前页
        if(value == "<" && options.currentPage >0)
            options.currentPage--;
        else if(value == ">" && options.currentPage< options.maxPages)
            options.currentPage++;
        else options.currentPage = value;
        getPropagatePage();
    };

    // 初始获取数据
    getPropagatePage();
}]);