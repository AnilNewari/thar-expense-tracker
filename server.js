const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/business', require('./routes/businessRoutes'));
app.use('/api/items', require('./routes/itemRoutes'));
app.use('/api/expenses', require('./routes/expenseRoutes'));
app.use('/api/transactions', require('./routes/transactionRoutes'));
app.use('/api/auth', require('./routes/authRoutes'));

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  })
  .catch(err => console.log(err));
