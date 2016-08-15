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



}]);
