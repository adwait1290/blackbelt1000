app.controller('userController', ['$scope', '$location', 'Factory', '$routeParams',function($scope, $location, Factory, $routeParams){
	function currentUser(){
		Factory.currentUser(function(data){
			$scope.currentuser = data;

		})
	}
	function getOneUser(){
		Factory.getOneUser($routeParams._id, function(data){
			console.log(data);
			$scope.datuser = data;
			
		})
	}
			
	
		currentUser();
		getOneUser();

	}
])