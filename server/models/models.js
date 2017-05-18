var mongoose = require('mongoose');
var Schema = mongoose.Schema


var UserSchema = new mongoose.Schema({
	name: {type:String, required: true, unique: true},
	events: [{type:Schema.Types.ObjectId, ref: "Event"}]
	}, {timestamps: true})


mongoose.model('User', UserSchema);

var EventSchema = new mongoose.Schema({
	title: {type:String, required: true, min:[5, "Your title must be 5 characters!"]},
	description: {type:String, required: true, min:[10, "Your title must be 10 characters!"]},
	creator: {type:Schema.Types.ObjectId, ref: "User"},
	friend: {type:Schema.Types.ObjectId, ref: "User"},
	done: {type:Boolean, default: false}
}, {timestamps: true})



mongoose.model("Event", EventSchema);