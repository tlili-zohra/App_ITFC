const express = require("express");
const Admin = require("../model/admin");
const Folder = require("../model/folder");
const Blog = require("../model/blog");
const Video = require("../model/video");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken"); // Add this at the top with your other requires

// Admin login
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const admin = await Admin.findOne({ username });
    if (!admin) {
      return res.status(400).json({ error: "Invalid username or password" });
    }
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid username or password" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: admin._id, username: admin.username },
      process.env.JWT_SECRET, // from env process.env.JWT_SECRET
      { expiresIn: "1d" }
    );

    res.json({
      message: "Admin login successful",
      admin: { id: admin._id, username: admin.username, email: admin.email },
      token, // Return the token
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add a blog post (with image upload support and date)
exports.addBlog = async (req, res) => {
  try {
    const { title, content, author, date } = req.body;
    const coverImage = req.files.cover
      ? `/uploads/${req.files.cover[0].filename}`
      : "";
    const images = req.files.images
      ? req.files.images.map((f) => `/uploads/${f.filename}`)
      : [];

    const blog = new Blog({
      title,
      content,
      author,
      coverImage,
      images,
      createdAt: date ? new Date(date) : new Date(), // <-- save date, default to now
    });

    await blog.save();
    res.status(201).json({ blog });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to add blog" });
  }
};

// Get all blogs
exports.getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json({ blogs });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch blogs" });
  }
};

// Update a blog post
exports.updateBlog = async (req, res) => {
  try {
    const blogId = req.params.id;
    const { title, content, author, date } = req.body;

    // Parse existing images/cover from form-data if present
    let existingImages = [];
    if (req.body.existingImages) {
      existingImages = JSON.parse(req.body.existingImages);
    }
    let existingCover = req.body.existingCover || null;

    // Handle new uploads
    let coverImage = existingCover;
    if (req.files && req.files.cover && req.files.cover.length > 0) {
      coverImage = "/uploads/" + req.files.cover[0].filename;
    }

    let images = existingImages;
    if (req.files && req.files.images && req.files.images.length > 0) {
      images = [
        ...existingImages,
        ...req.files.images.map((file) => "/uploads/" + file.filename),
      ];
    }

    // Update the blog in the database
    const updatedBlog = await Blog.findByIdAndUpdate(
      blogId,
      {
        title,
        content,
        author,
        coverImage,
        images,
        createdAt: date ? new Date(date) : new Date(),
      },
      { new: true }
    );

    res.json(updatedBlog);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Remove a blog post
exports.removeBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findByIdAndDelete(id);
    if (!blog) {
      return res.status(404).json({ error: "Blog post not found" });
    }
    res.json({ message: "Blog post removed successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add a video (mp4 supported)
exports.addVideo = async (req, res) => {
  try {
    const { title, url, description, category } = req.body;
    const video = new Video({ title, url, description, category });
    await video.save();
    res.status(201).json({ message: "Video added successfully", video });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a video
exports.updateVideo = async (req, res) => {
  try {
    const { id } = req.params;
    const video = await Video.findByIdAndUpdate(id, req.body, { new: true });
    if (!video) {
      return res.status(404).json({ error: "Video not found" });
    }
    res.json({ message: "Video updated successfully", video });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Remove a video
exports.removeVideo = async (req, res) => {
  try {
    const { id } = req.params;
    const video = await Video.findByIdAndDelete(id);
    if (!video) {
      return res.status(404).json({ error: "Video not found" });
    }
    res.json({ message: "Video removed successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add a highlight event (with title and url)
exports.addHighlightEvent = async (req, res) => {
  try {
    const HighlightEvent = require("../model/highlightevent");
    const { title, url, eventDate } = req.body;
    const event = new HighlightEvent({ title, url, eventDate });
    await event.save();
    res
      .status(201)
      .json({ message: "Highlight event added successfully", event });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a highlight event
exports.updateHighlightEvent = async (req, res) => {
  try {
    const HighlightEvent = require("../model/highlightevent");
    const { id } = req.params;
    const event = await HighlightEvent.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!event) {
      return res.status(404).json({ error: "Highlight event not found" });
    }
    res.json({ message: "Highlight event updated successfully", event });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Remove a highlight event
exports.removeHighlightEvent = async (req, res) => {
  try {
    const HighlightEvent = require("../model/highlightevent");
    const { id } = req.params;
    const event = await HighlightEvent.findByIdAndDelete(id);
    if (!event) {
      return res.status(404).json({ error: "Highlight event not found" });
    }
    res.json({ message: "Highlight event removed successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all folders, filter by job title if provided
exports.getFolders = async (req, res) => {
  try {
    const { jobTitle } = req.query;
    let filter = {};
    if (jobTitle) {
      filter.jobTitle = jobTitle;
    }
    const folders = await Folder.find(filter);
    res.json(folders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
