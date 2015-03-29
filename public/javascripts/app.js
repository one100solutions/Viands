angular.module('viands',['ui.router','ngMaterial'])

.config( function  ($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise('/home');

	$stateProvider
		.state('home', {
			url:'/home',
			templateUrl:'/templates/home.ejs',
			controller:'HomeController'
		})

        .state('dashboard',{
            url: '/dashboard',
            templateUrl:'/templates/dashboard.ejs',
            controller:'MenuController'
        })

        .state('dashboard.menuList',{
            url:'/list/:category',
            templateUrl: '/templates/menuCategory.ejs',
            controller: 'MenuListController'
        })
    ;
});