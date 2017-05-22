var mongoose = require('mongoose');
var User = mongoose.model('User');
var Product = mongoose.model('Product');
var Bid = mongoose.model('Bid');

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

	
	bids: function(req,res){
		Product.find({}).populate('bids').populate({path:'bids', populate:{ path: 'user'}}).exec(function(err,data){
			console.log(data);
			if(data == null){
				res.status(400).send("Bids not found");
			}
			else{
				
				res.json(data);

			}
		})
	},
	addBid: function(req,res){
		console.log(req.body);
		Product.findOne({_id: req.params.id}).exec(function(err, product){
			console.log("*********** PRODUCT IS " + product);
			if(err){
				res.status(400).send(err);
			}
			else{
				var b = new Bid(req.body);
				if (b.value > product.highestbid) {
					b.user = req.session.user._id;
					b.done = false;
					product.highestbid = req.body.value;
					b.product = product;
					b.save(function(err, new_bid){
						if(err){
							res.status(400).send("Bid not saved");

						}
						else{
							product.bids.push(new_bid);
							product.save(function(err, updated_product){
								if(err){
									res.status(400).send("Product not Updated");
								}
								else {
									User.findOne({_id: req.session.user._id}).exec(function(err,user){
									if(err){
										res.status(400).send(err);
									}
									else{
										user.bids.push(new_bid);
										user.save(function(err, saved_user){
											if(err){
												res.status(400).send(err);
											}
											else{
												res.sendStatus(200);
											}
										})
									}
							})


								}
							})
							
						}
				})
				}
				else {
					res.status(400).send("Your value must be higher than the previous bid and also greater than zero!");
				}
			}
		})
	},
	addProduct: function(req,res){
		console.log("*********** PRODUCTS BEING ADDED");
		for(var x=0; x<3; x++){
			var p = new Product({name: "product"+ x});
			p.save(function(err, products){
				if(err){
					console.log(err);
					res.status(400).send(err);
				}
			})
		}
	},	
	endBid: function(req,res){
		var array = [];
		
		Product.find({}).where('done', false).exec(function(err, products){
			if(err){
				res.status(400).send(err);
			}
			else{
				
					if(products[0].highestbid == 0 || products[1].highestbid == 0 || products[2].highestbid == 0){
						res.status(400).send("You cannot end the bidding till all the items have bids");
					}
					else{
						products[0].done = true;
						products[1].done = true;
						products[2].done = true;

						products[0].save(function(err, updated_product){
							console.log("updated");
							if(err){
								res.status(400).send(err);
							}
						})
						products[1].save(function(err, updated_product){
							console.log("updated");
							if(err){
								res.status(400).send(err);
							}
						})
						products[2].save(function(err, updated_product){
							console.log("updated");
							if(err){
								res.status(400).send(err);
							}
						})
					}

				
				
					
			
				
				}
			})
			
		},
		startBid: function(req,res){
			Product.find({}).exec(function(err,products){
				if(err){
					res.status(400).send(err);
				}
				else{
					products[0].done = false;
					products[1].done = false;
					products[2].done = false;
					products[0].bids = [];
					products[1].bids = [];
					products[2].bids = [];
					products[0].highestbid = 0;
					products[1].highestbid = 0;
					products[2].highestbid = 0;
					products[0].save(function(err, updated_product){
						console.log("updated");
						if(err){
							res.status(400).send(err);
						}
					})
					products[1].save(function(err, updated_product){
						console.log("updated");
						if(err){
							res.status(400).send(err);
						}
					})
					products[2].save(function(err, updated_product){
						console.log("updated");
						if(err){
							res.status(400).send(err);
						}
					})					
				}
			})
		}
	}

		
