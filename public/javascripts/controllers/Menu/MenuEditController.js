/**
 * Created by akash on 29/3/15.
 */
/**
 * Created by akash on 29/3/15.
 */
angular.module('viands')
    .controller('MenuEditController', function($scope, $timeout, $mdSidenav, $log, Restaurant, $mdToast) {
        $scope.progress = false;

        $scope.$on('EDIT_OPEN', function () {
            populateEditBar();
        });

        var index = -1;
        var menu;

        var  populateEditBar= function () {
            if (Restaurant.getCurId())
            {
                var curId = Restaurant.getCurId();
                if (Restaurant.getRestaurant())
                {
                     menu =  Restaurant.getRestaurant().restaurants[0].menu;

                    for (var i = 0; i < menu.length; i++)
                    {
                        if(menu[i]._id === curId)
                        {
                            $scope.food = menu[i];
                            index = i;
                            break;
                        }
                    }

                    console.log($scope.food);

                }
            }
        };


        var close = function() {
            $mdSidenav('right').close()
                .then(function(){
                    $log.debug("close RIGHT is done");
                });
        };

        $scope.save = function () {
            $scope.progress = true;
            menu[index] = $scope.food;
            Restaurant.save(menu)
                .then(function (payload) {
                    console.log('On saving', payload);
                    if(payload.data.err === false)
                    {
                        $scope.progress = false;
                        $mdToast.show($mdToast.simple().content('Menu Changed!'));
                        close();
                    }
                    else
                    {
                        $mdToast.show($mdToast.simple().content('This is not happening!!'));
                    }
                }, function (reason) {
                    console.log(reason);
                    $mdToast.show($mdToast.simple().content('Your end is near.'));
                })
        }

    });