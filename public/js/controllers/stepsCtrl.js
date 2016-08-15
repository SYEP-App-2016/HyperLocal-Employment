app.controller('stepsCtrl', ['$scope', '$http', '$window', function($scope, $http, $window){

    $scope.edu = [];
    $scope.exp = [];
    $scope.vol = [];

    var data = {};

    $scope.addEdu = function(){
        $scope.edu.push({
            instit_name: $scope.name_of_instit,
            deg: $scope.degree,
            yr_grad: $scope.year,
            f_study: $scope.f_study
        });
    }

    $scope.addExp = function(){
        $scope.exp.push({
            jb_position: $scope.jb_position,
            jb_description: $scope.jb_description,
            company_name: $scope.company_name,
            start_date: $scope.start_date,
            end_date: $scope.end_date
        });
    }

    $scope.addVol = function(){
        $scope.vol.push({
            org: $scope.org,
            role: $scope.role,
            cause: $scope.cause,
            desc: $scope.desc
        });
    }

    $scope.createUser = function(){
        $scope.user = {
            f_name: $scope.first,
            l_name: $scope.last,
            obj: $scope.obj,
            cell: $scope.cell,
            home: $scope.home
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
