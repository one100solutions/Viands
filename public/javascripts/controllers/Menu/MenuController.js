/**
 * Created by akash on 29/3/15.
 */
angular.module('viands')
    .controller('MenuController', function ($scope, $timeout, $mdSidenav, $log, $state, Restaurant) {
        $scope.toggleLeft = function() {
            $mdSidenav('left').toggle()
                .then(function(){
                    $log.debug("toggle left is done");
                });
        };

        $scope.toggleRight = function() {
            $mdSidenav('right').toggle()
                .then(function(){
                    $log.debug("toggle RIGHT yis done");
                });
        };

        $state.go('dashboard.menuList');


        $scope.restaurant = Restaurant.getRestaurant();
    });