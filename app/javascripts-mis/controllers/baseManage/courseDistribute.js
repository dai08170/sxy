/**
 * Created by lonelydawn on 2017-05-05.
 */

app.controller('courseDistributeCtrl', ['$scope', '$http', 'toaster', function($scope, $http, toaster){
    $scope.strArr = {
        "1":['第一节', '', '', '', '', '', '', ''],
        "2":['第二节', '', '', '', '', '', '', ''],
        "3":['第三节', '', '', '', '', '', '', ''],
        "4":['第四节', '', '', '', '', '', '', ''],
        "5":['第五节', '', '', '', '', '', '', '']
    };

    $scope.cols = ["","星期一","星期二","星期三","星期四","星期五","星期六","星期天"];
    // 标识课程表被选择位置
    $scope.pos = {
        row: 0,
        col: 0
    };

    $scope.classArr = [];
    $scope.courseArr = [];

    // 获取所有班级信息
    $http.get("/api/classManage/getAllClass").then(function (res) {
        $scope.classArr = res.data;
        if($scope.classArr.length>0) {
            $scope.classItem = $scope.classArr[0];
            $scope.toggleClass();
        }
    }, function (res) {
        toaster.pop("error", "服务器错误!" + (res.data.msg || ''), null, 2000, "toast-top-full-width");
    });

    // 获取所有课程信息
    $http.get("/api/courseManage/getAllCourses").then(function (res) {
        $scope.courseArr = res.data;
        if($scope.courseArr.length>0)
            $scope.courseItem = $scope.courseArr[0];
    }, function (res) {
        toaster.pop("error", "服务器错误!" + (res.data.msg || ''), null, 2000, "toast-top-full-width");
    });

    // 切换选择的班级
    $scope.toggleClass = function(){
        // 初始化课程表字段数组
        $scope.strArr = {
            "1":['第一节', '', '', '', '', '', '', ''],
            "2":['第二节', '', '', '', '', '', '', ''],
            "3":['第三节', '', '', '', '', '', '', ''],
            "4":['第四节', '', '', '', '', '', '', ''],
            "5":['第五节', '', '', '', '', '', '', '']
        };

        // 创建课程表
        var createCourseTable = function(data){
            for(var i=0;i<data.length;i++){
                var alo = data[i].allocation;
                var row = alo.substr(0,alo.indexOf("-")),col = alo.substr(alo.indexOf("-1"));
                for(var t=0;t<$scope.courseArr.length;t++)
                    if(data[i].course_id == $scope.courseArr[t].id){
                        $scope.strArr[row][col] = "《"+$scope.courseArr[t].name +"》\n上课地点:"
                            + data[i].address +"\n起止: "+data[i].begin_week+"-"+data[i].end_week+"周";
                    }
            }
        };

        // 获取课程表内容
        $http.get("/api/courseDistribute/getDistribution?class_id="+ $scope.classItem.id)
            .then(function (res) {
                createCourseTable(res.data);
            }, function (res) {
                toaster.pop("error", "服务器错误!" + (res.data.msg || ''), null, 2000, "toast-top-full-width");
            });
    };

    // 课程选择模态框显示
    $scope.toggleCourse = function(row, col){
        $scope.pos.row = row;
        $scope.pos.col = col;

        // 初始化模态框数据
        $scope.address = undefined;
        $scope.beginWeek = 1;
        $scope.endWeek = 20;
        if($scope.courseArr.length>0)
            $scope.courseItem = $scope.courseArr[0];
        if(col != 0)
            $("#courseModal").modal('show');
    };

    // 设置课程
    $scope.setCourse = function(){
        if($scope.beginWeek > $scope.endWeek)
            toaster.pop("warning", "课程起始周数不可大于结束周数", null, 2000, "toast-top-full-width");
        else {
            var data = {
                "creator_id": global_role.id,
                "class_id": $scope.classItem.id,
                "course_id": $scope.courseItem.id,
                "allocation": $scope.pos.row + "-" + $scope.pos.col,
                "address": $scope.address,
                "begin_week": $scope.beginWeek,
                "end_week": $scope.endWeek
            };
            $http.post("/api/courseDistribute/distribute", data).then(function (res) {
                if (res.data.flg == 1) {
                    toaster.pop("success", "创建成功!" + (res.data.msg || ""), null, 2000, "toast-top-full-width");
                    $scope.strArr[$scope.pos.row][$scope.pos.col] = "《" +
                        $scope.courseItem.name + "》\n上课地点:" + $scope.address + "\n起止: " +
                        $scope.beginWeek + "-" + $scope.endWeek + "周";
                } else
                    toaster.pop("danger", "创建失败!" + (res.data.msg || ""), null, 2000, "toast-top-full-width");
            }, function (res) {
                toaster.pop("error", "服务器错误!" + (res.data.msg || ''), null, 2000, "toast-top-full-width");
            });
        }
    };

    // 删除当前已选课程
    $scope.deleteDistribution = function(){
        var data = {
            "class_id": $scope.classItem.id,
            "allocation": $scope.pos.row+"-"+$scope.pos.col
        };
        $http.post("/api/courseDistribute/deleteDistribution", data).then(function (res) {
            if(res.data.flg == 1) {
                toaster.pop("success", "删除成功!" + (res.data.msg || ""), null,
                    2000, "toast-top-full-width");
                // 将课程表相应项置为空
                $scope.strArr[$scope.pos.row][$scope.pos.col] = '';
            } else
                toaster.pop("danger", "删除失败!" + (res.data.msg || ""), null,
                    2000, "toast-top-full-width");
        }, function(res){
        }, function (res) {
            toaster.pop("error", "服务器错误!" + (res.data.msg || ''), null, 2000, "toast-top-full-width");
        });
    };
}]);