angular.module('viands')
.controller('HomeController', function ($scope, Restaurant, $state, $mdToast) {
	// body...
        $scope.progress = false;
        $scope.login = function () {
            $scope.progress = true;
            Restaurant.loginRestaurant({
                username: $scope.user.name,
                password: $scope.user.password
            }).then (function (payload) {
                var data = payload.data;
                console.log(data);
                $scope.progress = false;
                if(data.err === false)
                {
                    $state.go('dashboard');
                }
                else
                {
                    $mdToast.show(
                        $mdToast.simple()
                            .content('Incorrect Credentials')
                            .position('bottom right')
                            .hideDelay(3000)
                    );
                }
            })

        }
});