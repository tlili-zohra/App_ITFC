const express = require("express");
const router = express.Router();
const Admin = require("../model/admin");
const bcrypt = require("bcrypt");

// Add new admin route
router.post("/", async (req, res) => {
  try {
    const { username, password, email } = req.body;
    // Check if admin exists
    const existingAdmin = await Admin.findOne({
      $or: [{ username }, { email }],
    });
    if (existingAdmin) {
      return res
        .status(400)
        .json({ error: "Username or email already exists" });
    }
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = new Admin({
      username,
      password: hashedPassword,
      email,
    });
    await admin.save();
    res.status(201).json({ message: "Admin added successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
