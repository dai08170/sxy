/**
 * Created by lonelydawn on 2017-04-20.
 */

app.controller('authorityManageCtrl',['$scope', '$state','$http', '$cookies','toaster', function($scope, $state,$http, $cookies, toaster){
    // var quill = new Quill('#editor', {
    //     modules:{
    //         toolbar: [
    //             ['bold','italic','underline','strike'],
    //             // [{'font':[]}],
    //             [{'align': ''}, {'align': 'center'}, {'align': 'right'}],
    //             [{'header': [false, 3, 2, 1]}],
    //             [{'list': 'ordered'},{'list':'bullet'}],
    //             [{'color':[]},{'background':[]}],
    //             ['image']
    //         ]
    //     }
    // });

    $scope.getEditorContent = function(){
        console.log(quill.getContext);
    };
}]);