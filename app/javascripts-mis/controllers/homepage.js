/**
 * Created by lonelydawn on 2017-03-10.
 */

app.controller('homepageCtrl',['$http', '$scope', '$state', '$cookies', 'toaster', function($http, $scope, $state, $cookies, toaster){

    // 初始化用户信息
    var initClientInfo = function() {
        // 获取用户个人信息
        var getUserInfo = function(module){
            $http.get("/api/selfInfo/"+ module +"?id=" + global_role.id)
                .then(function (res) {
                    if (res.data == undefined)
                        toaster.pop("danger", "该用户不存在!" + (res.data.msg || ''), null, 2000,
                            "toast-top-full-width");
                    else if (res.data.profile_number == '' || res.data.profile_number == undefined)
                        toaster.pop("danger", "用户信息不存在！请联系管理员！" + (res.data.msg || ''),
                            null, 2000, "toast-top-full-width");
                    else $scope.client = res.data;
                }, function (res) {
                    toaster.pop("error", "服务器错误!" + (res.data.msg || ''), null, 2000, "toast-top-full-width");
                });
        }

        // 如果全局角色丢失, 系统不能运行, 提示错误信息
        if(global_role == undefined)
            toaster.pop("error", "系统错误:全局角色身份丢失！请联系管理员！", null, 2000, "toast-top-full-width");
        else {
            // 显示欢迎用户的姓名
            $scope.greetings = "Hi, "+(global_role.name || "user");

            // 根据用户类型显示不同模块
            if (global_role.type == "学生")
                getUserInfo("getStudent");
            else if (global_role.type == "教师")
                getUserInfo("getTeacher");
        }
        console.log(global_role);
    };
    // 视图跳转到个人信息
    $scope.goSelfInfo = function () {
        $state.go("main.selfInfo");
    };

    // 初始化课程信息
    var getCoursesInfo = function(){
        var courses = {
            "fields": ["名称", "类型", "教师", "开始日期"],
            "value":[{
                "title": "马克思主义哲学",
                "type": "公共选修课",
                "teacher": "李大钊",
                "begin_date": "2016-03-13"
            },{
                "title": "高等数学",
                "type": "公共必修课",
                "teacher": "陈景润",
                "begin_date": "2016-03-13"
            }]
        };
        courses.value.push({
            "title": "...",
            "type": "...",
            "teacher": "...",
            "begin_date": "..."
        });
        return courses;
    };
    // 初始化作业信息
    var getHomeworkInfo = function(){
        var homework = {
            "fields": ["名称", "课程", "发布日期", "截止日期"],
            "value":[{
                "title": "第七章课后习题",
                "course": "马克思主义哲学",
                "create_time": "2017-03-13",
                "expire_time": "2017-04-01"
            },{
                "title": "傅里叶函数解题",
                "course": "高等数学",
                "create_time": "2017-03-13",
                "expire_time": "2017-04-22"
            }]
        };
        homework.value.push({
            "title": "...",
            "course": "...",
            "create_time": "...",
            "expire_time": "..."
        });
        return homework;
    };
    // 初始化企业宣传信息
    var getCompanyPropagateInfo = function(){
      var info =[
          {
              "id": 1,
              "title": "北极熊科技有限公司宣讲会将于3月22日在中山报告厅召开！",
              "type": "宣讲会"
          },{
              "id": 2,
              "title": "4月21日，华为高科春季招聘会于本校召开！",
              "type": "招聘会"
          },{
              "id": 3,
              "title": "东软智能科技网招开始，点击查看详情！",
              "type": "网招"
          }
      ];
      return info;
    };
    // 初始化活动宣传信息
    var getActivityPropagateInfo = function(){
        var info =[
            {
                "id": 1,
                "title": "3月15日，苏北百企联合春季招聘会隆重召开！",
                "type": "热点"
            },{
                "id": 2,
                "title": "2月28日，校园二手货交易活动开始，为时3天！",
                "type": "交易"
            },{
                "id": 3,
                "title": "4月1日，我爱竞赛网青年科技大赛复赛开始！",
                "type": "比赛"
            }
        ];
        return info;
    };
    // 初始化模块
    var init = function(){
        $scope.greetings = "Hi, "+ (JSON.parse($cookies.get("pass")).username || 'someone');
        $scope.cPropagate = getCompanyPropagateInfo();
        $scope.aPropagate = getActivityPropagateInfo();
        $scope.courses = getCoursesInfo();
        $scope.homework = getHomeworkInfo();
        initClientInfo();
        $("#myCarousel").carousel({
            interval: 5000
        });
    };

    init();
}]);