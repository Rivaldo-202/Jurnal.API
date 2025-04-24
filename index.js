// index.js

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const warehouseTransferRoutes = require('./routes/warehouseTransferRoutes');
const taxRoutes = require('./routes/taxRoutes');
const connectDB = require('./config/db');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware untuk parsing body JSON
app.use(bodyParser.json());

// Koneksi ke MongoDB Atlas
connectDB();

// Gunakan rute warehouse transfer
app.use(warehouseTransferRoutes);
// Gunakan routes yang sudah dibuat
app.use(taxRoutes);

// Menjalankan server
app.listen(PORT, () => {
  console.log(`🚀 Server berjalan di http://localhost:${PORT}`);
});
