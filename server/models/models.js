var mongoose = require('mongoose');
var Schema = mongoose.Schema


var UserSchema = new mongoose.Schema({
	name: {type:String, required: true, unique: true},
	bids: [{type:Schema.Types.ObjectId, ref: "Bid"}]

	}, {timestamps: true})


mongoose.model('User', UserSchema);

var ProductSchema = new mongoose.Schema({
	name: {type:String,required:true},
	bids: [{type:Schema.Types.ObjectId, ref:"Bid"}],
	highestbid:{type:Number, default:0},
	done:{type:Boolean, default:false}

}, {timestamps:true})
mongoose.model("Product", ProductSchema);

var BidSchema = new mongoose.Schema({
	value: {type:Number, required:true, min:[1, "You must atleast bet a dollar broskis"] },
	product:{type:Schema.Types.ObjectId, ref: "Product"},
	user:{type:Schema.Types.ObjectId, ref: "User"}
}, {timestamps:true})

mongoose.model("Bid", BidSchema);