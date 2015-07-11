angular.module('viands-admin')
.controller('CreateBannerController', function  ($scope, Upload) {

	var Banner = this;

	Banner.text = "Banner";

	Banner.submit = function  () {
		console.log(Banner.banner, $scope.files)
		if (Banner.banner.name && Banner.banner.url && $scope.files) {
			console.log('Upload')
			Upload.upload({
				url: '/admin/offers/createBanner',
				fields: {
					'data': Banner.banner
				},
				file: [$scope.files[0]]
			}).progress(function (evt) {
                    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                    Banner.text = 'progress: ' + progressPercentage + '% ';
                }).success(function (data, status, headers, config) {
                    Banner.text = 'file ' + config.file.name + 'uploaded. Response: ' ,data;
                }).error(function (data, status, headers, config) {
                    Banner.text = 'error status: ' + status;
                })
		}
	}
})