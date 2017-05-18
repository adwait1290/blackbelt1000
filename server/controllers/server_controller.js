var mongoose = require('mongoose');
var User = mongoose.model('User');
var Event = mongoose.model('Event');

module.exports = {
	register: function(req, res){
		console.log(req.body);
		var user = new User(req.body);
		user.save(function(err, data){
			console.log(data);
			if(err){
				console.log(err);
				res.status(400).send("User did not save.")
			}
			else{
				req.session.user = data;
				// console.log("Server controller line 13. Printing off session ", req.session.user);
				res.sendStatus(200);
			}
		})
	},
	login: function(req, res){
		User.findOne({name: req.body.name}, function(err, data){
			if(data == null){
				res.status(400).send("User not found.")
			}
			else{
				req.session.user = data;
				res.sendStatus(200);
			}
		})
	},
	current: function(req, res){
		if(req.session.user){
			res.json(req.session.user);
		}else{
			res.status(401).send("No user in session.");
		}
	},
	logout: function(req, res){
		req.session.destroy();
		res.redirect('/')
	},

	
	index: function(req,res){
		User.findOne({name: req.session.user.name}).populate('events').populate({path:'events', populate:{ path: 'friend'}}).exec(function(err, results){
			if(err){
				console.log(err);
			}
			else{
			res.json(results);
			}
		})
	},
	getUsers: function(req,res){
		User.find({}).populate('events').exec(function(err, results){
			if(err){
				res.status(400).send(err);
			}
			else{
				
				res.json(results);

			}
			
		})
	},
	getEvents: function(req,res){
		Event.find({user: req.session.user}).exec(function(err,data){
			if(err){
				res.status(400).send(err);
			}
			else{
				console.log(data);
				res.json(data);
			}
		})
	},
	addEvent: function(req,res){

		User.findOne({_id: req.session.user._id}, function(err,user){
			console.log(user);
				if(err){
					console.log(err);
					res.status(400).send(err);
				}
				else{ 
					console.log(req.body);
					var e = new Event(req.body);
					e.creator = req.session.user._id;
					e.done = false;
					console.log(e);
					e.save(function(err,new_event){
					if(err){
						console.log(err);
						res.status(400).send("Event not added");

					}
					else{
						user.events.push(new_event);
						user.save(function(err, updated_user){
							if(err){
								res.status(400).send(err);
							}
							else {
								res.sendStatus(200);
							}
						})
						
					}
		})


				}
			})
		},
	doneEvent: function(req,res){
		console.log(req);
		Event.findOne({_id: req.body._id}).exec(function(err,event){
			if(err){
				console.log(err);
				res.status(400).send(err);
			}
			else{
				if(event.done == false) {


					event.update({done: true}, function(err, updated_event){
						if(err){
							console.log(err);
							res.status(400).send(err);
						}
						else{
							res.sendStatus(200);
							return;
						}
					})
					return;
				}
				else{
					event.update({done: false}, function(err, updated_event){
						if(err){
							console.log(err);
							res.status(400).send(err);
						}
						else{
							res.sendStatus(200);
							return;
						}
					})
				}
			}
		})
	},
		

		
	getOneUser: function(req,res){
		User.findOne({_id: req.params.id}).populate('events').populate({path:'events', populate:{ path: 'friend'}}).exec(function(err,result){
			console.log(result);
			if(err){
				res.status(400).send(err);
			}
			else{
				res.json(result);
			}
		})
	},
}