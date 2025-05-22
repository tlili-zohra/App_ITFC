const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin");
//const auth = require("../middleware/auth");
// Public login route
router.post("/", adminController.login);
// Protect all routes below this line
//router.use(auth);

// Video routes
router.post("/videos", adminController.addVideo);
router.put("/videos/:id", adminController.updateVideo);
router.delete("/videos/:id", adminController.removeVideo);

// Highlight event routes
router.post("/highlightevents", adminController.addHighlightEvent);
router.put("/highlightevents/:id", adminController.updateHighlightEvent);
router.delete("/highlightevents/:id", adminController.removeHighlightEvent);

// Example: get folders (if needed)
router.get("/folders", adminController.getFolders);

module.exports = router;
