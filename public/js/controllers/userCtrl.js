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
        if(i == 'Edu'){
            $scope.dEdu = !$scope.dEdu;
            $scope.eduData = {};
        }
        if(i == 'Exp'){
            $scope.dExp = !$scope.dExp;
            $scope.expData = {};
        }
        if(i == 'Vol'){
            $scope.dVol = !$scope.dVol;
            $scope.volData = {};
        }
    }

    $scope.addEdu = function(){
        var data = {
            usr: $scope.usr,
            eduData: {
                instit_name: $scope.eduData.instit_name,
                deg: $scope.eduData.deg,
                yr_grad: $scope.eduData.yr_grad,
                f_study: $scope.eduData.f_study
            }
        }
        console.log(data);
        $http.post('/Member/addEdu', data)
            .success(function(data){
                $scope.show('Edu');
                refresh();
            })
            .error(function(data){
                console.log('Err');
            })
    }

    $scope.addExp = function(){
        var data = {
            usr: $scope.usr,
            exp: {
                jb_position: $scope.jobData.jb_position,
                jb_description: $scope.jobData.jb_description,
                company_name: $scope.jobData.company_name,
                start_date: $scope.jobData.start_date,
                end_date: $scope.jobData.end_date
            }
        }

        console.log(data);

        $http.post('Member/addExp', data)
            .success(function(data){
                $scope.show('Exp');
                refresh();
            })
            .error(function(data){
                console.log('Err');
            })
    }

    $scope.addVol = function(){
        var data = {
            usr: $scope.usr,
            vol: {
                org: $scope.volData.org,
                role: $scope.volData.role,
                cause: $scope.volData.cause,
                desc: $scope.volData. desc
            }
        }

        console.log(data);

        $http.post('Member/addVol', data)
            .success(function(data){
                $scope.show('Vol');
                refresh();
            })
            .error(function(data){
                console.log('Err');
            })
    }
}]);
