var app = angular.module('app', ['ngRoute', 'ngMessages']);

app.config(function($routeProvider){
	$routeProvider
		.when('/', {
			templateUrl: 'partials/login.html',
			controller: 'LoginController'
		})
		.when('/dashboard', {
			templateUrl: 'partials/dashboard.html', 
			controller: 'indexController'
		})
		.when('/user/:_id', {
			templateUrl: "partials/user.html",
			controller: "userController"
		})
		.otherwise({
			redirectTo: '/'
		})
})