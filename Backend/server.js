const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

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

// Admin routes
const adminRoutes = require("./routes/admin");
app.use("/adminlogin", adminRoutes);

// Add admin route
const addAdminRoutes = require("./routes/addadmin");
app.use("/addadmin", addAdminRoutes);

// Paid videos routes
const videosUserRoutes = require("./routes/videosuser");
app.use("/videosuser", videosUserRoutes);

// --- START SERVER ---
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
