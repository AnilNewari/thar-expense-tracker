const mongoose = require('mongoose');
const businessSchema = new mongoose.Schema({
  title: { type: String, required: true }
});
module.exports = mongoose.model('Business', businessSchema);
