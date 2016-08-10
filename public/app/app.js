var app = angular.module('myApp', []);
app.controller('stepsCtrl', ['$scope', function($scope){
    $scope.edu = [];
    $scope.exp = [];
    $scope.vol = [];
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
