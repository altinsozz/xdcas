const mongoose = require('mongoose');

const currencySchema = new mongoose.Schema({
  userId: String,
  code: String,
  amount: Number,
});

module.exports = mongoose.model('Currency', currencySchema);
