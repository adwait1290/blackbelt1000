var app = angular.module('app', ['ngRoute', 'ngMessages']);

app.config(function($routeProvider){
	$routeProvider
		.when('/', {
			templateUrl: 'partials/login.html',
			controller: 'LoginController'
		})
		.when('/bids', {
			templateUrl: 'partials/dashboard.html', 
			controller: 'indexController'
		})
		.when('/result', {
			templateUrl: 'partials/result.html',
			controller: 'resultController'
		})
		.otherwise({
			redirectTo: '/'
		})
})