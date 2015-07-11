angular.module('viands-admin')
.controller('CreateRestController', function  ($scope, Restaurant, Upload) {
	var Create = this;

	Create.text = "Fill the form to add a restautanr";

	Create.submit = function  () {
		console.log("R", Create.rest)
		
		if (Create.rest && Create.rest.location && Create.rest.name &&
			Create.rest.latitude && Create.rest.longitude && Create.rest.phone 
			&& Create.rest.username && Create.rest.password && Create.rest.confirm_password) {

				console.log("d",Create.rest);
				
				console.log($scope.files);

				Upload.upload({
                    url: '/admin',
                    fields: {'data': Create.rest},
                    file: [$scope.files[0], $scope.fileCsv[0]]
                }).progress(function (evt) {
                    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                    console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name);
                }).success(function (data, status, headers, config) {
                    console.log('file ' + config.file.name + 'uploaded. Response: ' ,data);
                }).error(function (data, status, headers, config) {
                    console.log('error status: ' + status);
                })
				
			} else {
				Create.text = "Missing params";
			}
		}

})