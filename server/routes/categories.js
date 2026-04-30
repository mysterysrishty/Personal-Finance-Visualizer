const express = require("express");
const router = express.Router();
const Category = require("../models/Category");
const { authMiddleware } = require("./auth");

// Get all categories (user-specific)
router.get("/", authMiddleware, async (req, res) => {
  try {
    const categories = await Category.find({ user: req.userId });
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Add a new category (user-specific)
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { name, color } = req.body;
    if (!name) return res.status(400).json({ error: "Name is required" });
    const category = new Category({ name, color, user: req.userId });
    await category.save();
    res.status(201).json(category);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Delete a category by ID (user-specific)
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Category.findOneAndDelete({
      _id: id,
      user: req.userId,
    });
    if (!deleted) return res.status(404).json({ error: "Category not found" });
    res.json({ message: "Category deleted" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
