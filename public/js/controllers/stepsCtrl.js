app.controller('stepsCtrl', ['$scope', '$http', '$window', function($scope, $http, $window){

    $scope.edu = [];
    $scope.exp = [];
    $scope.vol = [];

    $scope.addEdu = function(){
        $scope.edu.push({
            instit_name: $scope.eduData.instit_name,
            degree: $scope.eduData.degree,
            f_study: $scope.eduData.f_study,
            yr_grad: $scope.eduData.yr_grad
        });
    }

    $scope.addExp = function(){
        $scope.exp.push({
            jb_position: $scope.jobData.jb_position,
            jb_description: $scope.jobData.jb_description,
            company_name: $scope.jobData.company_name,
            start_date: $scope.jobData.start_date,
            end_date: $scope.jobData.end_date
        });
    }

    $scope.addVol = function(){
        $scope.vol.push({
            org: $scope.volData.org,
            role: $scope.volData.role,
            cause: $scope.volData.cause,
            desc: $scope.volData.desc
        });
    }

    $scope.createUser = function(){
        $scope.user = {
            first: $scope.usrData.first,
            last: $scope.usrData.last,
            obj: $scope.usrData.obj,
            cell: $scope.usrData.cell,
            home: $scope.usrData.home
        }

        var data = {
            user: $scope.user,
            exp: $scope.exp,
            edu: $scope.edu,
            vol: $scope.vol
        }

        $http.post('/Member/newUser', data)
            .success(function(data, status){
                $window.location.href = '/Member/Profile';
            })
            .error(function(data, status){
                console.log('Err: ' + data);
                $window.location.href = '/Err';
            })
    }

    $scope.removeItem = function(i, arr){
        arr.splice(i, 1);
    }

    //Functions for page changes
    $scope.contact = "home";
    $scope.page = 1;
    $scope.next = function(){
        $scope.page++;
    }
    $scope.back = function(){
        $scope.page--;
    }
}]);
