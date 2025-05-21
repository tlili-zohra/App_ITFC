const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin");
//console.log("adminController:", adminController);
// Admin login route
router.post("/", adminController.login);

// Add blog post
router.post("/", adminController.addBlog);

// Add video
router.post("/", adminController.addVideo);

// Add highlight event
router.post("/", adminController.addHighlightEvent);

// Get folders, filter by job title if provided
router.get("/", adminController.getFolders);

module.exports = router;
