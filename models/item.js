const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  itemName: { type: String, required: true },
  itemUnit: { type: String, required: true },
  itemBusinessId: { type: mongoose.Schema.Types.ObjectId, ref: 'Business', required: true }
});

module.exports = mongoose.model('Item', itemSchema);
