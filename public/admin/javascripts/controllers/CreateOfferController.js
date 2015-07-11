angular.module('viands-admin')
.controller('CreateOfferController', function  ($scope, Upload) {
	
	var Offer = this;

	Offer.text = "Offer";

	Offer.submit = function  () {
		console.log(Offer.offer, $scope.files)
		if (Offer.offer.name && Offer.offer.url && $scope.files) {
			console.log('Upload')
			Upload.upload({
				url: '/admin/offers/createOffer',
				fields: {
					'data': Offer.offer
				},
				file: [$scope.files[0]]
			}).progress(function (evt) {
                    var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                    Offer.text = 'progress: ' + progressPercentage + '% ';
                }).success(function (data, status, headers, config) {
                	console.log(data);
                    Offer.text = 'file ' + config.file.name + 'uploaded. Response: ' + data.msg;
                    Offer.text = "Offer";
                    Offer.offer = {};
                }).error(function (data, status, headers, config) {
                    Offer.text = 'error status: ' + status;
                    console.log(data)
                })
		}
	}
})