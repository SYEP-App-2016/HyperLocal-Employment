app.controller('userCtrl', ['$scope', '$http', '$window', function($scope, $http, $window){
    $scope.refresh = function(){
        $http.get('/Member/Profile.json')
            .success(function(data){
                $scope.usr = data.usr;
                $scope.edu = data.edu;
                $scope.exp = data.exp;
                $scope.vol = data.vol;
            })
            .error(function(data){
                console.log('Error: ' + data);
            })
    }
    $scope.dEdu = false;
    $scope.dExp = false;
    $scope.dVol = false;

    $scope.show = function(i){
        if(i == 'Edu'){$scope.dEdu = !$scope.dEdu}
        if(i == 'Exp'){$scope.dEdu = !$scope.dExp}
        if(i == 'Vol'){$scope.dEdu = !$scope.dVol}
    }

    $scope.addEdu = function(){
        var data = {
            usr: $scope.usr,
            eduData: $scope.eduData
        }
        $http.post('/Member/addEdu', data)
            .success(function(data){
                refresh();
            })
            .error(function(data){
                console.log('Err');
            })
    }

    // $scope.edu = [];
    // $scope.exp = [];
    // $scope.vol = [];
    //
    // var data = {};
    //
    // $scope.addEdu = function(){
    //     $scope.edu.push({
    //         instit_name: $scope.name_of_instit,
    //         deg: $scope.degree,
    //         yr_grad: $scope.year,
    //         f_study: $scope.f_study
    //     });
    // }
    //
    // $scope.addExp = function(){
    //     $scope.exp.push({
    //         jb_position: $scope.jb_position,
    //         jb_description: $scope.jb_description,
    //         company_name: $scope.company_name,
    //         start_date: $scope.start_date,
    //         end_date: $scope.end_date
    //     });
    // }
    //
    // $scope.addVol = function(){
    //     $scope.vol.push({
    //         org: $scope.org,
    //         role: $scope.role,
    //         cause: $scope.cause,
    //         desc: $scope.desc
    //     });
    // }
    //
    // $scope.createUser = function(){
    //     $scope.user = {
    //         f_name: $scope.first,
    //         l_name: $scope.last,
    //         obj: $scope.obj,
    //         cell: $scope.cell,
    //         home: $scope.home
    //     }
    //
    //     var data = {
    //         user: $scope.user,
    //         exp: $scope.exp,
    //         edu: $scope.edu,
    //         vol: $scope.vol
    //     }
    //
    //     $http.post('/Member/newUser', data)
    //         .success(function(data, status){
    //             $window.location.href = '/Member/Profile';
    //         })
    //         .error(function(data, status){
    //             console.log('Err: ' + data);
    //             $window.location.href = '/Err';
    //         })
    // }
    //
    // $scope.removeItem = function(i, arr){
    //     arr.splice(i, 1);
    // }
    //
    // //Functions for page changes
    // $scope.contact = "home";
    // $scope.page = 1;
    // $scope.next = function(){
    //     $scope.page++;
    // }
    // $scope.back = function(){
    //     $scope.page--;
    // }
}]);
