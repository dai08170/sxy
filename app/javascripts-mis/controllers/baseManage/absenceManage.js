/**
 * Created by lonelydawn on 2017-04-20.
 */

app.controller('absenceManageCtrl',['$scope', '$state','$http', '$cookies','toaster', function($scope, $state,$http, $cookies, toaster){
    var pageNum = 0;
    var pageSize = window.innerHeight< 771? 8: 16;
    var totalPages = 0;
    $scope.pageBtns = [];

    // 初始化信息
    var date = new Date();

    $scope.dataArr = [];
    $scope.keyword = '';

    $scope.graphTypes = ["缺勤支出柱状图","缺勤收入柱状图","缺勤支出扇形图","缺勤收入扇形图"];

    $scope.courseArr = [];
    // 获取所有课程
    $http.get('/api/courseManage/getAllCourses').then(function (res) {
        $scope.courseArr = res.data;
    }, function (res) {
        toaster.pop("error", "服务器错误!"+(res.data.msg || ''), null, 2000, "toast-top-full-width");
    });

    // 获取所有班级
    $http.get("/api/classManage/getAllClass").then(function(res){
        $scope.classArr = res.data;
    }, function (res) {
        toaster.pop("error", "服务器错误!"+(res.data.msg || ''), null, 2000, "toast-top-full-width");
    });

    // 获取单页内容
    var getPage = function(){
        var getPageBtns = function(totalPages){
            $scope.pageBtns = ["<"];
            for(var i=0;i<totalPages;i++)
                $scope.pageBtns[i+1] = i+1;
            $scope.pageBtns[$scope.pageBtns.length] = ">";
            return $scope.pageBtns;
        };

        $http.get("/api/absenceManage/getPage?pageNum="+ pageNum
            +"&pageSize="+ pageSize+"&keyword="+$scope.keyword
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

    // 缺勤切换至统计
    $scope.toggleCount = function(){
        $scope.isCount = true;
        $scope.item.absence_reason = undefined;
    }

    // 缺勤切换至不统计
    $scope.toggleNotCount = function(){
        $scope.isCount = false;
    }

    $("#absenceDate").datepicker();
    // 创建模态框显示
    $scope.createModalShow = function () {
        $scope.action = "创建";
        $scope.update = false;

        $scope.isCount = true;

        $scope.courseItem = $scope.courseArr[0];
        $scope.item = {
            absence_date: (1900+date.getYear())+"-"+ getDoubleBitNumber(date.getMonth()+1)
                +"-"+getDoubleBitNumber(date.getDate())
        };
        $("#absenceModal").modal('show');
    };

    // 新建缺勤
    $scope.createAbsence = function () {
        var data = {
            "course_id": $scope.courseItem.id,
            "course_name": $scope.courseItem.name,
            "student_num": $scope.item.student_num,
            "absence_date": $scope.item.absence_date,
            "is_count": $scope.isCount,
            "absence_reason": $scope.item.absence_reason || ''
        };
        $http.post("/api/absenceManage/create", data).then(function(res){
            if(res.data.flg == 1) {
                toaster.pop("success", "创建成功!" + (res.data.msg || ""), null, 2000, "toast-top-full-width");
                getPage();
            } else
                toaster.pop("danger", "创建失败!" + (res.data.msg || ""), null, 2000, "toast-top-full-width");
        }, function(res){
            toaster.pop("error", "服务器错误!"+(res.data.msg || ''), null, 2000, "toast-top-full-width");
        });
    };

    // 更新模态框显示
    $scope.updateModalShow = function (item) {
        $scope.action = "修改";
        $scope.update = true;

        // 将字段赋值给模态框各字段
        $scope.item = {
            "id": item.id,
            "student_num": item.student_num,
            "absence_date": item.absence_date,
            "absence_reason": item.absence_reason || ''
        };
        $scope.isCount = item.is_count==1;
        for(var i=0;i<$scope.courseArr.length;i++)
            if($scope.courseArr[i].id == item.course_id)
                $scope.courseItem = $scope.courseArr[i];

        $("#absenceModal").modal('show');
    };

    // 更新缺勤信息
    $scope.updateAbsence = function () {
        var data = {
            "id": $scope.item.id,
            "course_id": $scope.courseItem.id,
            "course_name": $scope.courseItem.name,
            "student_id": $scope.item.student_id,
            "student_num": $scope.item.student_num,
            "absence_date": $scope.item.absence_date,
            "is_count": $scope.isCount,
            "absence_reason": $scope.item.absence_reason
        };
        $http.post("/api/absenceManage/update", data).then(function (res) {
            if (res.data.flg == 1) {
                toaster.pop("success", "修改成功!" + (res.data.msg || ""), null,
                    2000, "toast-top-full-width");
                getPage();
            } else
                toaster.pop("danger", "修改失败!" + (res.data.msg || ""), null,
                    2000, "toast-top-full-width");
        }, function (res) {
            toaster.pop("error", "服务器错误!"+(res.data.msg || ''), null,
                2000, "toast-top-full-width");
        });
    };

    // 删除缺勤
    $scope.deleteAbsence = function (id) {
        var data = {
            "id": id
        };
        $http.post('/api/absenceManage/delete', data).then(function(res){
            if(res.data.flg == 1) {
                toaster.pop("success", "删除成功!" + (res.data.msg || ""), null,
                    2000, "toast-top-full-width");
                getPage();
            } else
                toaster.pop("danger", "删除失败!" + (res.data.msg || ""), null,
                    2000, "toast-top-full-width");
        }, function(res){
            toaster.pop("error", "服务器错误!"+(res.data.msg || ''), null,
                2000, "toast-top-full-width");
        });
    };

    getPage();

    /******************** 统计图 ******************************/
    $("#graphBeginDate").datepicker();
    $("#graphEndDate").datepicker();
    $scope.graphBeginDate = (1900+date.getYear())+"-01-01";
    $scope.graphEndDate = (1900+date.getYear())+"-"+
        getDoubleBitNumber(date.getMonth()+1)+"-"+getDoubleBitNumber(date.getDate());
    // 统计图模态框显示
    $scope.graphModalShow = function () {
        $("#graphModal").modal('show');
    };

    // 切换统计图
    $scope.toggleClass = function(){
        if($scope.classItem != undefined) {
            // 统计图下标
            var index = $scope.graphTypes.indexOf($scope.graphType);
            // 基于准备好的dom，初始化echarts实例
            var myChart = echarts.init(document.getElementById('graph'));

            // 创建缺勤支出柱状图
            var createClassAbsenceGraph = function (item) {
                // 指定图表的配置项和数据
                var option = {
                    color: ['#3398DB'],
                    title: {
                        text: $scope.graphType
                    },
                    toolbox: {
                        feature: {
                            dataView: {show: true, readOnly: true},
                            magicType: {show: true, type: ['line', 'bar']},
                            restore: {show: true},
                            saveAsImage: {show: true}
                        }
                    },
                    tooltip: {},
                    legend: {
                        data: ['金额']
                    },
                    xAxis: {
                        data: item.name
                    },
                    yAxis: {},
                    series: [{
                        name: '金额',
                        type: 'bar',
                        data: item.value
                    }]
                };
                myChart.setOption(option);
            };

            // 创建班级个课程缺勤情况统计图
            $http.get("/api/absenceManage/getAbsenceByCourse?classId=" + $scope.classItem.id +
                "&beginDate=" + $scope.graphBeginDate +
                "&endDate=" + $scope.graphEndDate).then(function (res) {
                var data = {
                    "name": [],
                    "value": []
                };
                // 为统计图的两个维度拆分数据
                for (var i = 0; i < res.data.length; i++) {
                    data.name.push(res.data[i].course_name);
                    data.value.push(res.data[i].count);
                }
                createClassAbsenceGraph(data);
            }, function (res) {
                toaster.pop("error", "服务器错误!" + (res.data.msg || ''), null, 2000, "toast-top-full-width");
            });
        }
    };
}]);