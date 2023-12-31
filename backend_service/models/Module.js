const mongoose = require("mongoose");

const moduleSchema = new mongoose.Schema(
{
	cameraName: {type:String, unique:true},
	cameraLocation: String
});

const User = mongoose.model('Module', moduleSchema);

module.exports = User;