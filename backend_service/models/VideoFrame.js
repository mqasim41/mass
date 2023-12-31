// models/VideoFrame.js

const mongoose = require('mongoose');
const { Schema } = mongoose;

const videoFrameSchema = new Schema({
  user: String,
  camera: String,
  image: String,
  alert: 
  {
    type: Schema.Types.ObjectId, 
    ref: 'Alert'
  }
}, { timestamps: true });

const VideoFrame = mongoose.model('VideoFrame', videoFrameSchema);

module.exports = { VideoFrame };
