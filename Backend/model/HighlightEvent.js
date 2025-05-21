const mongoose = require("mongoose");

const highlightEventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  url: { type: String, required: true }, // URL to be clicked (e.g., livestream, video, etc.)
  eventDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model("HighlightEvent", highlightEventSchema);
