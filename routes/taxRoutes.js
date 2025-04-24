// /routes/taxRoutes.js

const express = require('express');
const router = express.Router();
const { addTax } = require('../controllers/taxController');
const { getTaxById } = require('../controllers/taxController');
const { updateTaxById } = require('../controllers/taxController');
const { deleteTaxById } = require('../controllers/taxController');

// Endpoint untuk menambahkan pajak baru
router.post('/api/v1/taxes', addTax);
// Endpoint untuk mendapatkan pajak berdasarkan id
router.get('/api/v1/taxes/:id', getTaxById);
// Endpoint untuk memperbarui pajak berdasarkan id
router.patch('/api/v1/taxes/:id', updateTaxById);
// Endpoint untuk menghapus pajak berdasarkan id
router.delete('/api/v1/taxes/:id', deleteTaxById);

module.exports = router;
