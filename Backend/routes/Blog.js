const express = require("express");
const router = express.Router();
const adminController = require("../controllers/admin");
const multer = require("multer");
const path = require("path");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

router.post(
  "/blogmanager",
  upload.fields([
    { name: "cover", maxCount: 1 },
    { name: "images", maxCount: 10 },
  ]),
  adminController.addBlog
);

// Get all blogs
router.get("/blogmanager", adminController.getBlogs);
router.delete("/blogmanager/:id", adminController.removeBlog);
//router.put("/blogmanager/:id", adminController.updateBlog);
router.put(
  "/blogmanager/:id",
  upload.fields([
    { name: "cover", maxCount: 1 },
    { name: "images", maxCount: 10 },
  ]),
  adminController.updateBlog
);
module.exports = router;
