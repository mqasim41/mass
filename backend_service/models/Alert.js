const mongoose = require("mongoose");
const { Schema } = mongoose;

const AlertSchema = new Schema({
    camera: String,
    message: String,
}, { timestamps: true });

const Alert = mongoose.model('Alert', AlertSchema);

module.exports = { Alert };