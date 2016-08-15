app.controller('jobCtrl', ['$scope', '$http', '$window', '$location', function($scope, $http, $window, $location){
    //Gathers json from server
    $scope.refresh = function(){
        $http.get('/Job/Details/' + $location.absUrl().split('/')[5] + '/data.json') //gets Json data from /Job/Details/:id/data.json
            .success(function(data){ //Executes on success
                $scope.data = data; //sets $scope.data to newly aquired data, allows access to it on details page
            })
            .error(function(data){ //Executes on Err, may lead to err page in future
                console.log('Error: ' + data);
            });
    }

    $scope.postJob = function(){
        //Creates an Object of Job info
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
        //Sends obj data to server, Job gets created and saved
        $http.post('/Job/Add/' + $location.absUrl().split('/')[5], data)
            .success(function(data){//Executes on success
                $window.location.href = data; //Redirects user to Business Profile page
            })
            .error(function(data){//Executes on Err
                $window.location.href = '/Err';
            });
    }

}]);
