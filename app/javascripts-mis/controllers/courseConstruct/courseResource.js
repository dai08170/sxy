/**
 * Created by lonelydawn on 2017-05-11.
 */

app.controller('courseResourceCtrl',['$scope', '$state', '$http', 'toaster', 'FileUploader', function($scope, $state, $http, toaster, FileUploader){
    var pageNum = 0;
    var pageSize = window.innerHeight< 771? 10: 18;
    var totalPages = 0;
    $scope.pageBtns = [];

    $scope.isStudent = false;
    $scope.isTeacher = false;

    // 初始化信息
    $scope.dataArr = [];
    $scope.keyword = '';

    // 上传控制bar
    var uploader = $scope.uploader = new FileUploader({
        url: '/api/courseResource/upload',
        onAfterAddingFile: function(item) {
            item.title = item.file.name;
            item.file.name = global_role.id + '' + Date.now()
                + item.file.name.substr(item.file.name.lastIndexOf("."));
        },
        onWhenAddingFileFailed: function() {
            toaster.pop("warning", "请选择正确的文件类型!", null, 2000, "toast-top-full-width");
        },
        onCompleteAll: function() {
            for(var i=0;i<uploader.queue.length;i++){
                var data = {
                    "course_id": $scope.item.id,
                    "title": uploader.queue[i].title,
                    "ware_path": "uploads/"+uploader.queue[i].file.name
                };
                $http.post("/api/courseResource/uploadResource", data).then(function (res) {
                    if(res.data.flg == 1)
                        toaster.pop("success", "上传成功!" + (res.data.msg || ""), null, 2000, "toast-top-full-width");
                    else
                        toaster.pop("danger", "上传失败!" + (res.data.msg || ""), null, 2000, "toast-top-full-width");
                }, function (res) {
                    toaster.pop("error", "服务器错误!"+(res.data.msg || ''), null, 2000, "toast-top-full-width");
                });
            }
        }
    });

    // 获取分页键
    var getPageBtns = function(totalPages){
        $scope.pageBtns = ["<"];
        for(var i=0;i<totalPages;i++)
            $scope.pageBtns[i+1] = i+1;
        $scope.pageBtns[$scope.pageBtns.length] = ">";
        return $scope.pageBtns;
    };

    // 获取学生单页内容
    var getStudentCoursePage = function(){
        $http.get("/api/courseResource/getStudentCoursePage?pageNum="+ pageNum
            +"&pageSize="+ pageSize+"&keyword="+$scope.keyword+"&id="+global_role.id
        ).then(function (res) {
            $scope.dataArr = res.data.items;
            totalPages = Math.ceil(res.data.count / pageSize);
            $scope.pageBtns = getPageBtns(totalPages);
        }, function (res) {
            toaster.pop("error", "服务器错误!"+(res.data.msg || ''), null, 2000, "toast-top-full-width");
        });
    };

    // 获取教师单页内容
    var getTeacherCoursePage = function(){
        $http.get("/api/courseResource/getTeacherCoursePage?pageNum="+ pageNum
            +"&pageSize="+ pageSize+"&keyword="+$scope.keyword+"&id="+global_role.id
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
        if(global_role.type == "学生")
            getStudentCoursePage();
        else if(global_role.type == "教师")
            getTeacherCoursePage();
    };

    // 下载课程资料模态框显示
    $scope.downloadModalShow = function (item) {
        $scope.item = item;
        $scope.wareArr = [];
        $http.get("/api/courseResource/getResource?course_id=" + item.id).then(function (res) {
            $scope.wareArr = res.data;
        }, function (res) {
            toaster.pop("error", "服务器错误!"+(res.data.msg || ''), null, 2000, "toast-top-full-width");
        });
        $("#downloadModal").modal('show');
    };

    // 上传课程资料模态框显示
    $scope.uploadModalShow = function (item) {
        $scope.item = item;
        $("#uploadModal").modal('show');
    };

    // 上传课件
    $scope.uploadResource = function(){
        uploader.uploadAll();
    };

    // 判定登录身份, 显示不同内容
    if(global_role.type == "学生") {
        $scope.isStudent = true;
        getStudentCoursePage();
    } else if(global_role.type == "教师") {
        $scope.isTeacher = true;
        getTeacherCoursePage();
    }

}]);