const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  password: { type: String, required: true }, // new field
  userType: { type: String, enum: ['staff', 'manager', 'admin'], default: 'staff' }
});

module.exports = mongoose.model('User', userSchema);
