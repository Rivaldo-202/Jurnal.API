// /models/warehouseTransfer.js

const mongoose = require('mongoose');

// Membuat schema untuk Warehouse
const warehouseSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Menambahkan required pada `name`
  code: { type: String, required: true }, // Menambahkan required pada `code`
});

// Membuat schema untuk Product
const productSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Menambahkan required pada `name`
  code: { type: String, required: true, default: '' }, // Menambahkan required pada `code`
});

// Membuat schema untuk Comment
const commentSchema = new mongoose.Schema({
  notes: { type: String, required: true }, // Menambahkan required pada `notes`
  created_at: { type: Date, default: Date.now }
});

// Schema untuk WarehouseTransfer
const warehouseTransferSchema = new mongoose.Schema({
    transaction_no: { type: String, required: true },
    transaction_date: { type: Date, required: true },
    from_warehouse: {
      name: { type: String, required: true },
      code: { type: String, required: true }
    },
    to_warehouse: {
      name: { type: String, required: true },
      code: { type: String, required: true }
    },
    memo: { type: String },
    warehouse_transfer_lines_attributes: [
      {
        product: {
          name: { type: String, required: true },
          code: { type: String, required: true }
        },
        quantity: { type: Number, required: true }
      }
    ],
    comments: [commentSchema] // Menambahkan validasi komentar
}, { timestamps: true });

// Membuat model WarehouseTransfer
const WarehouseTransfer = mongoose.model('WarehouseTransfer', warehouseTransferSchema);

module.exports = WarehouseTransfer;
