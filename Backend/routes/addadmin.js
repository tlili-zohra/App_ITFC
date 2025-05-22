const express = require("express");
const router = express.Router();
const Admin = require("../model/admin");
const bcrypt = require("bcrypt");

// Add new admin route
router.post("/newadmin", async (req, res) => {
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
router.get("/newadmin/:id", async (req, res) => {
  try {
    const admin = await Admin.findById(req.params.id); //.select("-password");
    if (!admin) return res.status(404).json({ error: "Admin not found" });
    res.json(admin);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 3. تحديث Admin
router.put("/newadmin/:id", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const updatedFields = { username, email };
    if (password) updatedFields.password = await bcrypt.hash(password, 10);

    const updatedAdmin = await Admin.findByIdAndUpdate(
      req.params.id,
      updatedFields,
      { new: true, runValidators: true }
    ); //.select("-password");

    if (!updatedAdmin)
      return res.status(404).json({ error: "Admin not found" });
    res.json({ message: "Admin updated successfully", admin: updatedAdmin });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 4. حذف Admin
router.delete("/newadmin/:id", async (req, res) => {
  try {
    const deletedAdmin = await Admin.findByIdAndDelete(req.params.id);
    if (!deletedAdmin)
      return res.status(404).json({ error: "Admin not found" });
    res.json({ message: "Admin deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ 5. جلب جميع المدراء
router.get("/newadmin", async (req, res) => {
  try {
    const admins = await Admin.find(); //.select("-password");
    res.json(admins);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
