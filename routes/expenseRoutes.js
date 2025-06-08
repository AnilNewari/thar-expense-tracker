const express = require('express');
const router = express.Router();
const Expense = require('../models/expense');
const auth = require('../middleware/auth');

// Create a new expense
router.post('/', auth, async (req, res) => {
  try {
    const {
      itemId,
      amount,
      quantity,
      businessId
    } = req.body;

    const userId = req.user._id;

    const newExpense = new Expense({
      itemId,
      amount,
      quantity,
      businessId,
      createdBy: userId,
      lastUpdatedBy: userId
    });

    const saved = await newExpense.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all expenses
router.get('/', auth, async (req, res) => {
  try {
    const expenses = await Expense.find()
      .populate('itemId', 'itemName itemUnit')
      .populate('createdBy', 'username')
      .populate('lastUpdatedBy', 'username')
      .populate('businessId', 'title');
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get single expense
router.get('/:id', auth, async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id)
      .populate('itemId', 'itemName itemUnit')
      .populate('createdBy', 'username')
      .populate('lastUpdatedBy', 'username')
      .populate('businessId', 'title');
    if (!expense) return res.status(404).json({ error: 'Expense not found' });
    res.json(expense);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update expense
router.put('/:id', auth, async (req, res) => {
  try {
    const { itemId, amount, quantity, businessId } = req.body;

    const updated = await Expense.findByIdAndUpdate(
      req.params.id,
      {
        itemId,
        amount,
        quantity,
        businessId,
        updatedAt: new Date(),
        lastUpdatedBy: req.user._id
      },
      { new: true }
    );

    if (!updated) return res.status(404).json({ error: 'Expense not found' });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete expense
router.delete('/:id', auth, async (req, res) => {
  try {
    const deleted = await Expense.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Expense not found' });
    res.json({ message: 'Expense deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
