/**
 * Created by lonelydawn on 2017-05-11.
 */

app.controller('courseTableCtrl',['$scope', '$state', '$http', 'toaster', function($scope, $state, $http, toaster){
    $scope.strArr = {
        "1":['第一节', '', '', '', '', '', '', ''],
        "2":['第二节', '', '', '', '', '', '', ''],
        "3":['第三节', '', '', '', '', '', '', ''],
        "4":['第四节', '', '', '', '', '', '', ''],
        "5":['第五节', '', '', '', '', '', '', '']
    };

    $scope.cols = ["","星期一","星期二","星期三","星期四","星期五","星期六","星期天"];

    $scope.studentItem = undefined;
    $scope.infoMsg = '';
    $scope.courseArr = [];

    // 创建课程表
    var createCourseTable = function(data){
        for(var i=0;i<data.length;i++){
            var alo = data[i].allocation;
            var row = alo.substr(0,alo.indexOf("-")),col = alo.substr(alo.indexOf("-1"));
            for(var t=0;t<$scope.courseArr.length;t++)
                if(data[i].course_id == $scope.courseArr[t].id){
                    $scope.strArr[row][col] = "《"+$scope.courseArr[t].name +"》\n上课地点:"
                        + data[i].address +"\n起止:"+data[i].begin_week+"-"+
                        data[i].end_week +"周";
                }
        }
    };

    // 创建学生课程表(实际上是创建学生所在班级的课程表)
    var createStudentCourseTable = function(){
        // 获得学生所在班级
        var getClass = function(){
            // 获取课程表内容
            $http.get("/api/courseDistribute/getDistribution?class_id="+ $scope.studentItem.class_id)
                .then(function (res) {
                    createCourseTable(res.data);
                }, function (res) {
                    toaster.pop("error", "服务器错误!" + (res.data.msg || ''), null, 2000, "toast-top-full-width");
                });
        };

        // 获取学生信息(class_id)
        $http.get("/api/selfInfo/getStudent?id=" + global_role.id).then(function (res) {
            $scope.studentItem = res.data;
            if(res.data.class_name != undefined)
                $scope.infoMsg = " ("+ res.data.class_name +")";
            getClass();
        }, function (res) {
            toaster.pop("error", "服务器错误!" + (res.data.msg || ''), null, 2000, "toast-top-full-width");
        });
    };

    // 创建教师课程表
    var createTeacherCourseTable = function(){
        $http.get("/api/courseTable/getTeacherCourseTable?id="+global_role.id)
        .then(function (res) {
            createCourseTable(res.data);
        }, function (res) {
            toaster.pop("error", "服务器错误!" + (res.data.msg || ''), null, 2000, "toast-top-full-width");
        });
    };

    // 获取所有课程信息
    $http.get("/api/courseManage/getAllCourses").then(function (res) {
        $scope.courseArr = res.data;
        if($scope.courseArr.length>0) {
            if(global_role.type == "学生")
                createStudentCourseTable();
            else if(global_role.type == "教师")
                createTeacherCourseTable();
        }
    }, function (res) {
        toaster.pop("error", "服务器错误!" + (res.data.msg || ''), null, 2000, "toast-top-full-width");
    });
}]);
