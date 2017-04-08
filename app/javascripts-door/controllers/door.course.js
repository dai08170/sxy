/**
 * Created by lonelydawn on 2017-04-02.
 */

app.controller('courseCtrl',['$scope','$state',function($scope){
    var data = global_config.course;

    $scope.courseShow = data.courseShow;
    $scope.weekCourses = data.weekCourse;
    $scope.publicCourses = data.publicCourse;

    //格局商学直播课程体系
    $scope.weekdays = $scope.weekCourses.weekday;
    $scope.courses = $scope.weekCourses.course;
    $scope.selectedName = $scope.weekdays[0];
    $scope.course = $scope.courses[0];

    $scope.changeWeekCourse = function(){
        var index= $scope.weekdays.indexOf($scope.selectedName);
        console.log("下标为:"+index);
        $scope.course = $scope.courses[index];
    };

    $scope.courseModalShow = function(item){
        if(item!=undefined && item.trim()!=""){
            $scope.courseName = item;
            $("#CourseModal").modal("show");
        }
    };

    //格局课程公益课程体系
}]);