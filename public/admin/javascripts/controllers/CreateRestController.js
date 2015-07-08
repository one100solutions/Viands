angular.module('viands-admin')
.controller('CreateRestController', function  (Credentials) {
	var Create = this;

	Create.text = "Fill the form to add a restautanr";

	Create.submit = function  () {
		
	if (Create.rest && Create.rest.location && Create.rest.name &&
			Create.rest.latitude && Create.rest.longitude && Create.rest.phone 
			&& Create.rest.username && Create.rest.password && Create.rest.confirm_password) {
			console.log(Create.rest);
		} else {
			Create.text = "Missing params";
		}
	}

})