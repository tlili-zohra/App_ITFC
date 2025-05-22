const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const fs = require("fs");
require("dotenv").config();
//app.use(cors());
const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;
// Ensure uploads directory exists
const uploadsDir = "./uploads";
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// --- MIDDLEWARE ---
app.use(cors());
app.use(express.json());

// --- MONGOOSE CONNECTION ---
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => console.log(err));

// --- IMPORT MODELS ---
const User = require("./model/user");

// --- ROUTES ---
/*app.get("/", (req, res) => {
  res.send("API is running...");
});
*/
// User routes
const userRoutes = require("./routes/user");
app.use("/users", userRoutes);
//const auth = require("../middleware/auth");
// Admin routes
const adminRoutes = require("./routes/admin");
app.use("/adminlogin", adminRoutes);

// Add admin route
const addAdminRoutes = require("./routes/addadmin");
app.use("/adminlogin/dashbordadmin", addAdminRoutes);
// Blog routes
const BlogAdminRoutes = require("./routes/Blog");
app.use("/adminlogin/dashbordadmin", BlogAdminRoutes);
// Paid videos routes
const videosUserRoutes = require("./routes/videosuser");
app.use("/adminlogin/dashbordadmin", videosUserRoutes);

// Static uploads route
app.use("/uploads", express.static("uploads"));

// --- GLOBAL ERROR HANDLER ---
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

// --- START SERVER ---
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
