const mongoose = require("mongoose");

const folderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: false },
  isLoggedIn: { type: Boolean, default: false },
  info: Object,
  cvFile: String, // Path or URL to uploaded CV (can be mp4, pdf, etc.)
  cvFileType: String, // e.g., "mp4", "pdf"
  jobTitle: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Folder", folderSchema);
