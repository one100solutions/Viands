angular.module('viands-admin',['ui.router'])

.config( function  ($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise('/home');

	$stateProvider
		.state('home', {
			url:'/home',
			templateUrl:'/admin/templates/home.ejs',
			controller:'HomeController as Home'
		})

        .state('dashboard',{
            url: '/dashboard',
            templateUrl:'/admin/templates/dashboard.ejs',
            controller:'DashController as Dash'
        })

        .state('dashboard.createRestaurant', {
        	url: '/dashboard/create',
        	templateUrl: '/admin/templates/create.ejs',
        	controller: 'CreateRestController as CreateRest'
        })
    ;
});