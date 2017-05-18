app.controller('indexController', ['$scope', '$location', 'Factory', function($scope, $location, Factory){
	function currentUser(){
		Factory.currentUser(function(data){
			$scope.currentuser = data;
		});
	}
	function getEvents(){
		Factory.index(function(data){
			$scope.events = data;
		})
	}
	function getUsers(){
		Factory.getUsers(function(data){
			$scope.allusers = data;
		})
	}
	function getOne(){
		Factory.index(function(data){
			console.log(data);
			$scope.nowuser = data;
		})
	}

	getEvents();
	currentUser();
	getUsers();
	getOne();
		$scope.addEvent = function(event){
			Factory.addEvent(event, getEvents);
			$scope.newEvent = {};
			$location.url('/dashboard');
		}
		$scope.doneEvent = function(id){
			Factory.doneEvent(id, getEvents);
		}

	}]);