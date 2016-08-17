app.controller('adminCtrl', ['$scope', '$http', function($scope, $http){

    $scope.refresh = function(){
        $http.get('/Admin/data.json')
            .success(function(data){
                $scope.data = data;
            })
            .error(function(data){
                console.log('Err: ' + data);
            })
    }

    $scope.page = 1;

    $scope.display = function(i){
        $scope.page = i;
    }

    

}]);
