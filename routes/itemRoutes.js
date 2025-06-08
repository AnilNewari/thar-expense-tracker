const express = require('express');
const router = express.Router();
const Item = require('../models/item');
const auth = require('../middleware/auth');

// Create a new item
router.post('/', auth, async (req, res) => {
  try {
    const { itemName, itemUnit, itemBusinessId } = req.body;
    const newItem = new Item({ itemName, itemUnit, itemBusinessId });
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all items
router.get('/', auth, async (req, res) => {
  try {
    const items = await Item.find().populate('itemBusinessId', 'title');
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a single item by ID
router.get('/:id', auth, async (req, res) => {
  try {
    const item = await Item.findById(req.params.id).populate('itemBusinessId', 'title');
    if (!item) return res.status(404).json({ error: 'Item not found' });
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update item
router.put('/:id', auth, async (req, res) => {
  try {
    const { itemName, itemUnit, itemBusinessId } = req.body;
    const updated = await Item.findByIdAndUpdate(
      req.params.id,
      { itemName, itemUnit, itemBusinessId },
      { new: true }
    );
    if (!updated) return res.status(404).json({ error: 'Item not found' });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete item
router.delete('/:id', auth, async (req, res) => {
  try {
    const deleted = await Item.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Item not found' });
    res.json({ message: 'Item deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
