app.controller('businessCtrl', ['$scope', '$http', '$location', '$window', function($scope, $http, $location, $window){
    $scope.refresh = function(){
        $http.get('/Business/Details/' + $location.absUrl().split('/')[5] + '/data.json')
            .success(function(data){
                $scope.data = data;
                console.log(data);
            })
            .error(function(data){
                console.log('Error: ' + data);
            });
        }

        $scope.newBusiness = function(){
            var data = {
                name: $scope.name,
                address: $scope.address,
                address_2: $scope.address_2,
                city: $scope.city,
                state: $scope.state,
                zip: $scope.zip,
                history: $scope.history,
                url: $scope.url
            }

            $http.post('/Business/Add', data)
                .success(function(data){
                    $window.location.href = data;
                })
                .error(function(data){
                    console.log('success');
                })
        }

        $scope.removeJob = function(id){
            var data = {id: id};
            console.log(data);
            $http.post('/Job/Remove/' + data.id, data)
                .success(function(data){
                    // refresh();
                })
                .error(function(data){
                    console.log('Error: ' + data);
                })
        }
}]);
