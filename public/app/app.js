var app = angular.module('myApp', []);
app.controller('stepsCtrl', ['$scope', function($scope){
    $scope.user = {};
    $scope.edu = [];
    $scope.exp = [];
    $scope.vol = [];
    $scope.addUser = function(){
        $scope.user = {
            f_name: $scope.f_name,
            l_name: $scope.l_name,
            obj: $scope.objective,
            cell: $scope.cell,
            home: $scope.home
        }
    }
    $scope.addEdu = function(){
        $scope.edu.push({
            instit_name: $scope.name_of_instit,
            deg: $scope.degree,
            yr_grad: $scope.year,
            f_study: $scope.f_study
        });
        console.log($scope.edu);
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
    $scope.removeItem = function(i, arr){
        arr.splice(i, 1);
    }
}]);
