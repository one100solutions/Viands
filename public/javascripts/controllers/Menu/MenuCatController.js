/**
 * Created by akash on 29/3/15.
 */
angular.module('viands')
    .controller('MenuCatController', function($scope, $timeout, $mdSidenav, $log, Restaurant) {
        $scope.close = function() {
            $mdSidenav('left').close()
                .then(function(){
                    $log.debug("close LEFT is done");
                });
        };



        $scope.category = [{
            name: 'South Indian',
            value: 1
        },{
            name: 'North Indian',
            value: 2
        },{
            name: 'Chinese',
            value: 3
        },{
            name: 'Snacks',
            value: 4
        },{
            name: 'Juices',
            value: 5
        }];


    });