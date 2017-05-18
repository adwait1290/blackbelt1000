app.factory('Factory', ['$location', '$http', function($location, $http){
	var factory = {};
	factory.register = function(user){
		$http({
			url: '/register', 
			method: 'POST',
			data: user
		}).then(function(res){
			console.log(res);
			$location.url('/dashboard');
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
			$location.url('/dashboard');
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
	},
	factory.index = function(callback){
		$http({
			url:'/getOne',
			method: "GET"
		}).then(function(res){
			callback(res.data);
		}, function(err){
			console.log(err);
		})
	},
	factory.getEvents = function(callback){
		$http({
			url: "/events",
			method: "GET"
		}).then(function(res){
			callback()
		}, function(err){
			console.log(err);
		})
	},
	factory.getOneUser = function(id, callback){
		$http({
			url: "/user/" + id,
			method: "GET"
		}).then(function(res){
			callback(res.data);
		}, function(err){
			console.log(err);
		})
	},
	factory.addEvent = function(event,callback){
		$http({
			url: "/event/",
			method: "POST",
			data: event
		}).then(function(res){
			callback(res.data);
		}, function(err){
			console.log(err);
		})
	},
	factory.doneEvent = function(event_id, callback){
		$http({
			url: "/doneevent/",
			method: "POST",
			data: event_id
		}).then(function(res){
			callback(res.data);
		}, function(err){
			console.log(err);
		})
	}
	return factory;
}])