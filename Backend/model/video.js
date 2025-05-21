const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema({
  title: String,
  url: String, // Can be a link or a local path to the mp4 file
  description: String,
  category: String,
  createdAt: { type: Date, default: Date.now },
  fileType: { type: String, default: "mp4" }, // Optional: specify file type
});

module.exports = mongoose.model("Video", videoSchema);
