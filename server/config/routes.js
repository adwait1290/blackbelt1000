var serverController = require('../controllers/server_controller.js')

module.exports = function(app){
	app.post('/register', serverController.register);
	app.post('/login', serverController.login);
	app.get('/logout', serverController.logout);
	app.get('/current', serverController.current);
	app.get('/getOne', serverController.index);

	app.get('/users', serverController.getUsers);
	app.get('/events', serverController.getEvents);
	app.get('/user/:id', serverController.getOneUser);
	app.post('/event/', serverController.addEvent);
	app.post('/doneevent', serverController.doneEvent)

}