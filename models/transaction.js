const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['sale', 'expense', 'investment', 'income'],
    required: true
  },
  referenceId: { type: mongoose.Schema.Types.ObjectId, default: null }, // Optional
  amount: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  businessId: { type: mongoose.Schema.Types.ObjectId, ref: 'Business', required: true },
  description: { type: String }
});

module.exports = mongoose.model('Transaction', transactionSchema);
