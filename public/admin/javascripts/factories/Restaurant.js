angular.module('viands-admin')
.factory('Restaurant', function  ($http) {
	// body...
	return {
		create: function  (data) {
			return $http.post('/create_restaurant', data)
		}
	}
})