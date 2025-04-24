// /models/taxModel.js

const mongoose = require('mongoose');

// Schema untuk Tax
const taxSchema = new mongoose.Schema({
  name: { type: String, required: true },
  rate: { type: Number, required: true },
  is_witholding: { type: Boolean, required: true },
  is_compound: { type: Boolean, required: false }, // Menambahkan is_compound
  sell_tax_account_name: { type: String, required: true },
  buy_tax_account_name: { type: String, required: true },
  custom_id: { type: String, required: false } // Menambahkan custom_id
}, { timestamps: true });

const Tax = mongoose.model('Tax', taxSchema);

module.exports = Tax;
