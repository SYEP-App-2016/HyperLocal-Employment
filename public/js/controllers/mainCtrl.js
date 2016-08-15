app.controller('mainCtrl', ['$scope', '$http', '$filter', function($scope, $http, $filter){
    $scope.refresh = function(){
        $http.get('/Job/jobs.json')
            .success(function(data){
                $scope.data = data;
                console.log(data);
            })
            .error(function(data){
                console.log('Error: ' + data);
            });
    }

    $scope.currentDate = "";

    $scope.addJob = function(){
        data = {
            jb_position: 'test',
            catergory: 'test'
        }

        $http.post('/Job/addJob', data)
            .success(function(data, status){
                $scope.PostDataResponse = data;
            })
            .error(function(data, status){
                console.log('Error: ' + data);
            })

        $scope.refresh();
    }
}]);
