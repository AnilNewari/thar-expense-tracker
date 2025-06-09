const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['sale', 'expense', 'investment', 'income'],
    required: true
  },
  amount: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdDate: {
    type: String,
    default: () => {
      const now = new Date();
      return now.toISOString().split("T")[0]; // YYYY-MM-DD
    },
  },
  businessId: { type: mongoose.Schema.Types.ObjectId, ref: 'Business', required: true },
  description: { type: String }
});

module.exports = mongoose.model('Transaction', transactionSchema);
