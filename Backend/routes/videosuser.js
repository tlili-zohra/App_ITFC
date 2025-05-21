const express = require("express");
const router = express.Router();
const User = require("../model/user");

// Get all paid videos for a user
router.get("/:userId/paid-videos", async (req, res) => {
  try {
    const userId = req.params.userId;
    // Assuming you store paid videos as an array of video IDs in the user document
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    // If you store paid videos in user.paidVideos
    res.json({ paidVideos: user.paidVideos || [] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add a paid video to user's account
router.post("/:userId/paid-videos", async (req, res) => {
  try {
    const userId = req.params.userId;
    const { videoId } = req.body;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    if (!user.paidVideos) user.paidVideos = [];
    if (!user.paidVideos.includes(videoId)) {
      user.paidVideos.push(videoId);
      await user.save();
    }
    res.json({ paidVideos: user.paidVideos });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
