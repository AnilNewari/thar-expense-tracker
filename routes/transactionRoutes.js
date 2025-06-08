const express = require('express');
const router = express.Router();
const Transaction = require('../models/transaction');
const auth = require('../middleware/auth');

// Create a new transaction
router.post('/', auth, async (req, res) => {
  try {
    const {
      type,
      referenceId,
      amount,
      businessId,
      description
    } = req.body;

    const newTransaction = new Transaction({
      type,
      referenceId,
      amount,
      businessId,
      description,
      createdBy: req.user._id
    });

    const saved = await newTransaction.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all transactions
router.get('/', auth, async (req, res) => {
  try {
    const transactions = await Transaction.find()
      .populate('createdBy', 'username')
      .populate('businessId', 'title');
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get single transaction
router.get('/:id', auth, async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id)
      .populate('createdBy', 'username')
      .populate('businessId', 'title');
    if (!transaction) return res.status(404).json({ error: 'Transaction not found' });
    res.json(transaction);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a transaction
router.put('/:id', auth, async (req, res) => {
  try {
    const { type, referenceId, amount, businessId, description } = req.body;

    const updated = await Transaction.findByIdAndUpdate(
      req.params.id,
      {
        type,
        referenceId,
        amount,
        businessId,
        description
      },
      { new: true }
    );

    if (!updated) return res.status(404).json({ error: 'Transaction not found' });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete transaction
router.delete('/:id', auth, async (req, res) => {
  try {
    const deleted = await Transaction.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Transaction not found' });
    res.json({ message: 'Transaction deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
