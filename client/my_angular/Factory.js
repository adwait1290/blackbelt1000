app.factory('Factory', ['$location', '$http', function($location, $http){
	var factory = {};
	factory.register = function(user){
		$http({
			url: '/register', 
			method: 'POST',
			data: user
		}).then(function(res){
			console.log(res);
			$location.url('/bids');
		}, function(res){
			console.log(res);
		})
	};
	factory.currentUser = function(callback){
		$http({
			url: '/current', 
			method: 'GET'
		}).then(function(res){
			callback(res.data);
		}, function(res){
			$location.url('/')
			console.log(res);
		})

	};
	factory.login = function(user){
		$http({
			url:'/login', 
			method: 'POST',
			data: user
		}).then(function(res){
			$location.url('/bids');
		}, function(res){
			console.log(res);
		})
	};
	factory.getUsers = function(callback){
		$http({
			url:"/users",
			method: "GET"
		}).then(function(res){
			callback(res.data);
		}, function(err){
			console.log(err);
		})
	};
	factory.getProducts = function(callback){
		$http({
			url:'/bids',
			method:"GET"
		}).then(function(res){
			console.log(res.data);
			callback(res.data);
		}, function(err){
			console.log(err);
		})
	};
	factory.addBid = function(bid, id, callback){
		$http({
			url:'/product/' + id,
			method:"POST",
			data: bid
		}).then(function(res){
			callback(res.data);
		}, function(err){
			alert(err.data);
		})
	};
	factory.addProducts = function(callback){
		console.log("FACTORY INITIATED");
		$http({
			url:"/addProduct",
			method:"POST"
		}).then(function(res){
			callback(res.data);
		}, function(err){
			console.log(err);
		})
	};
	factory.endBid = function(callback){
		$http({
			url:'/endBid',
			method:"POST"
		}).then(function(res){
			callback();
		}, function(err){
			alert(err.data);
		})
	};
	factory.startBid = function(callback){
		$http({
			url: '/startBid',
			method: "POST"
		}).then(function(res){
			callback(res.data);
		}, function(err){
			console.log(err.data);
		})
	};
	return factory;
}])