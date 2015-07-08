angular.module('viands-admin')
.controller('HomeController', function  (Credentials, $state) {
	var Home = this;

	Home.text = "Enter log in credentials";
	Home.submit = function  () {
		console.log('a',Home.user.name, Home.user.password);
		Credentials.login({
			username: Home.user.name,
			password: Home.user.password
		}).then(function  (data) {
			if(!data.token) {
				 Home.text = "Sth wrong happened"
			} else {
				Home.text = "Verified. Good to go"
				$state.go('dashboard');
			}
		})
	}
})