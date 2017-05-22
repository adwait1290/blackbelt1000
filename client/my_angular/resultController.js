app.controller('resultController', ['$scope', '$location', 'Factory', '$routeParams', function($scope, $location, Factory, $routeParams,){
	function currentUser(){
		Factory.currentUser(function(data){
			$scope.currentuser = data;
		})
	}
	function getProducts(){
		Factory.getProducts(function(data){
			$scope.products = data;
		})
	}
	
		currentUser();
		getProducts();
		$scope.startBid = function(){
			Factory.startBid(getProducts);
			$location.url('/bids');
		}

	}]);