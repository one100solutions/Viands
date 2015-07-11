angular.module('viands-admin')
.factory('Restaurant', function  ($http) {
	// body...
	return {
		create: function  (data) {
			return $http.post('/admin', data)
		}
	}
})