var serverController = require('../controllers/server_controller.js')

module.exports = function(app){
	app.post('/register', serverController.register);
	app.post('/login', serverController.login);
	app.get('/logout', serverController.logout);
	app.get('/current', serverController.current);

	app.post('/addProduct', serverController.addProduct);
	app.get('/bids', serverController.bids);
	app.post('/product/:id', serverController.addBid);
	app.post('/endBid', serverController.endBid);
	app.post('/startBid', serverController.startBid);


}