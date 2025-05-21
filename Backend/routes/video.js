const express = require("express");
const router = express.Router();
const multer = require("multer");
//Multer Setup for mp4 Uploads
const Video = require("../model/video");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/videos/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage });

// Upload mp4 video
router.post("/upload", upload.single("video"), async (req, res) => {
  try {
    const { title, description, category } = req.body;
    const video = new Video({
      title,
      description,
      category,
      url: req.file.path,
      fileType: req.file.mimetype,
    });
    await video.save();
    res.status(201).json({ message: "Video uploaded", video });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
