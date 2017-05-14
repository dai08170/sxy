/**
 * Created by lonelydawn on 2017-04-20.
 */

app.controller('accountManageCtrl',['$scope', '$state','$http', '$cookies','toaster', function($scope, $state,$http, $cookies, toaster){
    var pageNum = 0;
    var pageSize = window.innerHeight< 771? 8: 16;
    var totalPages = 0;
    $scope.pageBtns = [];

    // 初始化信息
    $scope.dataArr = [];
    $scope.keyword = '';
    $scope.action = undefined;
    $scope.sum = 0;

    $scope.actionType = global_config.account_action;
    $scope.accountType = [];

    $scope.graphTypes = ["资产支出直观图","资产收入直观图","资产支出比例图","资产收入比例图"];
    $scope.graphType = undefined;


    // 获取所有资产类型
    $http.get('/api/configManage/getCurrent?tableIndex=8').then(function (res) {
        for(var i=0;i<res.data.length;i++)
            $scope.accountType.push(res.data[i].name);
    }, function (res) {
        toaster.pop("error", "服务器错误!"+(res.data.msg || ''), null, 2000, "toast-top-full-width");
    });

    // 获取资产总额
    var getSum = function(){
        $http.get('/api/accountManage/getSum').then(function (res) {
            $scope.sum = res.data.sum;
        }, function (res) {
            toaster.pop("error", "服务器错误!"+(res.data.msg || ''), null, 2000, "toast-top-full-width");
        });
    }

    // 获取单页内容
    var getPage = function(){
        var getPageBtns = function(totalPages){
            $scope.pageBtns = ["<"];
            for(var i=0;i<totalPages;i++)
                $scope.pageBtns[i+1] = i+1;
            $scope.pageBtns[$scope.pageBtns.length] = ">";
            return $scope.pageBtns;
        };

        $http.get("/api/accountManage/getPage?pageNum="+ pageNum
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

    // 创建模态框显示
    $scope.createModalShow = function () {
        $scope.action = "创建";
        $scope.update = false;
        $scope.item = {
            "type": $scope.accountType[0],
            "action": $scope.actionType[0]
        };
        $("#accountModal").modal('show');
    };

    // 新建资产
    $scope.createAccount = function () {
        var data = {
            "name": $scope.item.name,
            "val": $scope.item.val,
            "type": $scope.item.type,
            "action": $scope.item.action,
            "creator_id": global_role.id
        };
        $http.post("/api/accountManage/create", data).then(function(res){
            if(res.data.flg == 1) {
                toaster.pop("success", "创建成功!" + (res.data.msg || ""), null, 2000, "toast-top-full-width");
                getSum();
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
            "name": item.name,
            "val": item.val,
            "type": item.type,
            "action": item.action
        };

        $("#accountModal").modal('show');
    };

    // 更新资产信息
    $scope.updateAccount = function () {
        var data = {
            "id": $scope.item.id,
            "name": $scope.item.name,
            "val": $scope.item.val,
            "type": $scope.item.type,
            "action": $scope.item.action,
            "creator_id": global_role.id
        };
        $http.post("/api/accountManage/update", data).then(function (res) {
            if (res.data.flg == 1) {
                toaster.pop("success", "修改成功!" + (res.data.msg || ""), null,
                    2000, "toast-top-full-width");
                getSum();
                getPage();
            } else
                toaster.pop("danger", "修改失败!" + (res.data.msg || ""), null,
                    2000, "toast-top-full-width");
        }, function (res) {
            toaster.pop("error", "服务器错误!"+(res.data.msg || ''), null,
                2000, "toast-top-full-width");
        });
    };

    // 删除资产
    $scope.deleteAccount = function (id) {
        var data = {
            "id": id
        };
        $http.post('/api/accountManage/delete', data).then(function(res){
            if(res.data.flg == 1) {
                toaster.pop("success", "删除成功!" + (res.data.msg || ""), null,
                    2000, "toast-top-full-width");
                getSum();
                getPage();
            } else
                toaster.pop("danger", "删除失败!" + (res.data.msg || ""), null,
                    2000, "toast-top-full-width");
        }, function(res){
            toaster.pop("error", "服务器错误!"+(res.data.msg || ''), null,
                2000, "toast-top-full-width");
        });
    };

    getSum();
    getPage();

    /******************** 统计图 ******************************/
    var date = new Date();
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
    $scope.toggleGraph = function(){
        if($scope.graphType != undefined) {
            // 统计图下标
            var index = $scope.graphTypes.indexOf($scope.graphType);
            // 收支类型
            var type = (index == 0 || index == 2) ? "支出" : "收入";
            // 基于准备好的dom，初始化echarts实例
            var myChart = echarts.init(document.getElementById('graph'));

            // 创建资产支出柱状图
            var createAccountOutcomeBar = function (item) {
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

            // 创建资产收入柱状图
            var createAccountIncomeBar = function (item) {
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

            // 创建资产支出扇形图
            var createAccountOutcomePie = function (item, origin) {
                var option = {
                    title: {
                        text: '资产支出扇形图',
                        x: 'center'
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    legend: {
                        orient: 'vertical',
                        left: 'left',
                        data: item.name
                    },
                    series: [
                        {
                            name: '金额',
                            type: 'pie',
                            radius: '55%',
                            center: ['50%', '60%'],
                            data: origin
                        }
                    ]
                };
                myChart.setOption(option);
            };

            // 创建资产收入扇形图
            var createAccountIncomePie = function (item, origin) {
                var option = {
                    title: {
                        text: '资产支出扇形图',
                        x: 'center'
                    },
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },
                    legend: {
                        orient: 'vertical',
                        left: 'left',
                        data: item.name
                    },
                    series: [
                        {
                            name: '金额',
                            type: 'pie',
                            radius: '55%',
                            center: ['50%', '60%'],
                            data: origin
                        }
                    ]
                };
                myChart.setOption(option);
            };

            // 创建收支分类统计图, 4大统计图同一接口
            $http.get("/api/accountManage/getAccountByType?type=" + type + "&beginDate=" +
                $scope.graphBeginDate + "&endDate=" + $scope.graphEndDate).then(function (res) {
                var data = {
                    "name": [],
                    "value": []
                };
                // 为统计图的两个维度拆分数据
                for (var i = 0; i < res.data.length; i++) {
                    data.name.push(res.data[i].name);
                    data.value.push(res.data[i].value);
                }
                switch (index) {
                    case 0:
                        createAccountOutcomeBar(data);
                        break;
                    case 1:
                        createAccountIncomeBar(data);
                        break;
                    case 2:
                        createAccountOutcomePie(data, res.data);
                        break;
                    case 3:
                        createAccountIncomePie(data, res.data);
                        break;
                }
            }, function (res) {
                toaster.pop("error", "服务器错误!" + (res.data.msg || ''), null, 2000, "toast-top-full-width");
            });
        }
    };
}]);