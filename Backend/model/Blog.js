const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: String,
  content: String,
  author: String,
  images: [String], // Array of image URLs or paths
  coverImage: String, // The chosen cover image (URL or path)
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Blog", blogSchema);
