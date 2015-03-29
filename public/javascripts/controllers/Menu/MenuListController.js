/**
 * Created by akash on 29/3/15.
 */
/**
 * Created by akash on 29/3/15.
 */
angular.module('viands')
    .controller('MenuListController', function($scope, $stateParams,  $timeout, $mdSidenav, $log, Restaurant, $rootScope) {
        var data = Restaurant.getRestaurant();
        console.log('Restaurant in gedit',data.restaurants[0].menu);

        console.log('Stateparams ', $stateParams.category);

        var menu = data.restaurants[0].menu;

        if ($stateParams.category)
        {
            $scope.items = [];
           for(var i = 0; i < menu.length; i++)
           {
               if(menu[i].category === $stateParams.category)
               {
                   $scope.items.push(menu[i]);
               }
           }
        }

        $scope.toggleRight = function(_id) {
            Restaurant.setCurId(_id);
            $mdSidenav('right').toggle()
                .then(function(){
                    $rootScope.$broadcast('EDIT_OPEN');
                    $log.debug("toggle RIGHT is done");
                });
        };

    });