app.controller('adminCtrl', ['$scope', '$http', function($scope, $http){

    $scope.refresh = function(){
        $http.get('/Admin/users.json')
            .success(function(data){
                $scope.data = data;
            })
            .error(function(data){
                console.log('Err: ' + data);
            })
    }

}]);
