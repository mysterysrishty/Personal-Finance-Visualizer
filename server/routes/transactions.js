const express = require("express");
const router = express.Router();
const Transaction = require("../models/Transaction");
const { authMiddleware } = require("./auth");

// Get all transactions (user-specific)
router.get("/", authMiddleware, async (req, res) => {
  try {
    const transactions = await Transaction.find({ user: req.userId })
      .populate("category")
      .sort({ date: -1 });
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Add a new transaction (user-specific)
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { amount, date, description, category } = req.body;
    if (!amount || !date || !description || !category) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const transaction = new Transaction({
      amount,
      date,
      description,
      category,
      user: req.userId,
    });
    await transaction.save();
    res.status(201).json(transaction);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Update a transaction (user-specific)
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const { amount, date, description, category } = req.body;
    const transaction = await Transaction.findOneAndUpdate(
      { _id: req.params.id, user: req.userId },
      { amount, date, description, category },
      { new: true }
    );
    if (!transaction) return res.status(404).json({ error: "Not found" });
    res.json(transaction);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// Delete a transaction (user-specific)
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const transaction = await Transaction.findOneAndDelete({
      _id: req.params.id,
      user: req.userId,
    });
    if (!transaction) return res.status(404).json({ error: "Not found" });
    res.json({ message: "Transaction deleted" });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
