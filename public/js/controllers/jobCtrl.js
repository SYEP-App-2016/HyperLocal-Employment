app.controller('jobCtrl', ['$scope', '$http', '$window', '$location', function($scope, $http, $window, $location){
    //Gathers json from server
    $scope.refresh = function(){
        $http.get('/Job/Details/' + $location.absUrl().split('/')[5] + '/data.json') //gets Json data from /Job/Details/:id/data.json
            .success(function(data){ //Executes on success
                $scope.data = data; //sets $scope.data to newly aquired data, allows access to it on details page
                console.log(data);
            })
            .error(function(data){ //Executes on Err, may lead to err page in future
                console.log('Error: ' + data);
            });
    }

    $scope.id = $location.absUrl().split('/')[5]

    $scope.sal = 'hr';

    $scope.reqSkills = [];
    $scope.err_message2 = 'Skill already inputted';
    $scope.same = false;

    $scope.addSkill = function(){
        var skill = $scope.skill;
        $scope.same = false;
        for(var i = 0; i < $scope.reqSkills.length; i++){
            if($scope.reqSkills[i] == skill)
                $scope.same = true;
        }
        if(!$scope.same){
            $scope.reqSkills.push(skill);
            $scope.same = false;
        }
    }

    $scope.removeItem = function(i, arr){
        arr.splice(i, 1);
    }

    $scope.postJob = function(){
        //Creates an Object of Job info
        var data = {
            position: $scope.position,
            desc: $scope.desc,
            teaser: $scope.teaser,
            contact: {
                phone: $scope.contact.phone,
                email: $scope.contact.email
            },
            type: $scope.type,
            pay_rt: $scope.pay_rt,
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
