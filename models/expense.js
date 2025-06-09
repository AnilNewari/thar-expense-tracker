const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
  itemId: { type: mongoose.Schema.Types.ObjectId, ref: 'Item', required: true },
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
  amount: { type: Number, required: true },
  quantity: { type: Number, required: true }
});

module.exports = mongoose.model('Expense', expenseSchema);
