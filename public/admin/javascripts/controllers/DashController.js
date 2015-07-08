angular.module('viands-admin')
.controller('DashController', function  (Credentials, $state, Restaurant) {
	var Dash = this;

	if(!Credentials.getToken())  {
		$state.go('home');
	} 
	else {
		
	}
})