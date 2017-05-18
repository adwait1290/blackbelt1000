app.controller('LoginController', ['$scope', '$location', 'Factory', function($scope, $location, Factory){
	$scope.register = function(newUser){
		Factory.register(newUser);
	};
	$scope.login = function(user){
		Factory.login(user);
	};
}])