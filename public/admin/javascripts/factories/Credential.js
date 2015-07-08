angular.module('viands-admin')
.factory('Credentials', function  ($http) {
	var token = null;

	return {
		login: function  (cred) {
			return $http.post('/admin_login', cred).then(function  (data) {
				console.log(data);
				token = data.data.token;
				return data.data;
			});
		},

		getToken: function  () {
			return token;
		}
	}
})