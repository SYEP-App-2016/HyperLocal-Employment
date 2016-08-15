app.controller('jobCtrl', ['$scope', '$http', '$window', '$location', function($scope, $http, $window, $location){
    $scope.refresh = function(){
        // console.log($location.absUrl());
        $http.get('/Job/Details/' + $location.absUrl().split('/')[5] + '/data.json')
            .success(function(data){
                $scope.data = data;
                console.log(data);
            })
            .error(function(data){
                console.log('Error: ' + data);
            });
    }

    $scope.currentDate = "";

    $scope.postJob = function(){
        var data = {
            jb_position: $scope.jb_position,
            jb_desc: $scope.desc,
            jb_desc_teaser: $scope.teaser,
            jb_contact: $scope.contact,
            jb_type: $scope.jb_type,
            pay_rt: $scope.rt,
            sal: $scope.sal,
            catergory: $scope.catergory
        }

        $http.post('/Job/Add/' + $location.absUrl().split('/')[5], data)
            .success(function(data){
                console.log('reached!');
                $window.location.href = data;
            })
            .error(function(data){
                $window.location.href = '/Err';
            });
    }

}]);
