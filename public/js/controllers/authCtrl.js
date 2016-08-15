app.controller('authCtrl', ['$scope', '$http', '$window', function($scope, $http, $window){
    $scope.refresh = function(){
        $http.get('/Auth/user.json')
            .success(function(data){
                $scope.data = data;
            })
            .error(function(data){
                console.log('Error: ' + data);
            });
        }

    $scope.signup = function(){
        var data = {
            email: $scope.email,
            password: $scope.password
        }

        $http.post('/Auth/Signup', data)
            .success(function(data, status){
                if(data){$window.location.href = '/Member/NewUser';}
                else{$window.location.href = '/Auth/Signup';}
            })
            .error(function(data, status){
                console.log('Error: ' + data);
            })
    }

    $scope.login = function(){
        var data = {
            email: $scope.email,
            password: $scope.password
        }

        $http.post('/Auth/Login', data)
            .success(function(data, status){
                if(data){$window.location.href = '/Member/Profile'}
                else{$window.location.href = '/Auth/Login'}
            })
            .error(function(data, status){
                console.log('Error: ' + data);
            })
    }


}]);
