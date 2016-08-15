app.controller('businessCtrl', ['$scope', '$http', '$location', '$window', function($scope, $http, $location, $window){
    //Gathers json from the server
    $scope.refresh = function(){
        $http.get('/Business/Details/' + $location.absUrl().split('/')[5] + '/data.json') //Gets Json data from Business/Details/:id/data.json
            .success(function(data){//Executes on success
                $scope.data = data; //sets $scope.data to newly aquired data, allows access to it on details page
            })
            .error(function(data){//Executes of Err, may lead to err page in future
                console.log('Error: ' + data);
            });
        }

        $scope.newBusiness = function(){
            //Creates an Object of Business Info
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
            //Sends data obj to server to get created and saved
            $http.post('/Business/Add', data)
                .success(function(data){//Executes on success
                    $window.location.href = data; //Redirects user to Business Profile Page
                })
                .error(function(data){//Executes on err
                    console.log('success');
                })
        }

        //Allows user to remove job, not functional at the moment
        $scope.removeJob = function(id){
            var data = {id: id}; //Stores job Id
            $http.post('/Job/Remove/' + data.id, data)//Sends Id to server to delete job
                .success(function(data){//Executes on Success
                    refresh();//Refreshs info on details page
                })
                .error(function(data){//Executes on Err
                    console.log('Error: ' + data);
                })
        }
}]);
