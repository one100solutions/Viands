angular.module('viands')
    .factory('Restaurant', function  ($http) {
        var restaurantDetails;

        var restaurantToken;

        var editFoodId;

        var getRestaurantDetail = function () {
            return restaurantDetails;
        };

        var getRestaurantToken = function () {
            return restaurantToken;
        };

        var getEditFoodId = function () {
            return editFoodId;
        };

        var setEditFoodId = function (id) {
            editFoodId = id;
        };


        var login = function (data) {
            getRestaurants();
          return  $http.post('/login_restaurant', data)
                    .success(function (payload) {
                        console.log('payload in service', payload);
                            if (payload.err === false)
                            {
                                restaurantToken = payload.Restaurant.token
                            }
                        });
        }

        var getRestaurants = function () {
            $http.get('/restaurants')
                .success(function (payload) {
                    console.log('Data is ', payload);
                    restaurantDetails = payload;
                });
        };

        var saveMenu = function (menu) {
            restaurantDetails.restaurants[0].menu = menu;
            menu = JSON.stringify(menu);
            return $http.post('/change_menu',{
                menu: menu,
                token: getRestaurantToken()
            });
        }

        return {
            loginRestaurant: login,
            getRestaurant: getRestaurantDetail,
            getToken: getRestaurantToken,
            setCurId: setEditFoodId,
            getCurId: getEditFoodId,
            save: saveMenu
        }
});