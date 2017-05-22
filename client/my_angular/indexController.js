app.controller('indexController', ['$scope', '$location', 'Factory', '$routeParams', function($scope, $location, Factory, $routeParams,){
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
		$scope.addBid = function(bid, id){
			Factory.addBid(bid, id, getProducts);
			$scope.newBid = {};
			$location.url('/bids');
		}
		$scope.addProduct = function(){
			console.log("CONTROLLER INITIATED");
			Factory.addProducts(getProducts);
			$location.url('/bids');
		}
		$scope.endBid = function(){
			Factory.endBid();
			$location.url('/result');
		}


	}]);