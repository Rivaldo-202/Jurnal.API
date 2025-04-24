// /routes/warehouseTransferRoutes.js

const express = require('express');
const { createWarehouseTransfer } = require('../controllers/warehouseTransferController');
const { getWarehouseTransfer } = require('../controllers/warehouseTransferController');
const { addCommentToWarehouseTransfer } = require('../controllers/warehouseTransferController');
const { getCommentsForWarehouseTransfer } = require('../controllers/warehouseTransferController');
const { getAllWarehouseTransfers } = require('../controllers/warehouseTransferController');
const { updateWarehouseTransfer } = require('../controllers/warehouseTransferController');

const router = express.Router();

// POST endpoint untuk membuat warehouse transfer baru
router.post('/api/v1/warehouse_transfers', createWarehouseTransfer);
// Endpoint untuk menampilkan warehouse transfer berdasarkan ID atau transaction_no
router.get('/api/v1/warehouse_transfers/:id', getWarehouseTransfer);
// Route untuk menambahkan comment pada warehouse transfer berdasarkan transaction_id
router.post('/api/v1/warehouse_transfers/:transaction_id/comments', addCommentToWarehouseTransfer);
// Mendapatkan komentar untuk warehouse transfer berdasarkan transaction_id
router.get('/api/v1/warehouse_transfers/:transaction_id/comments', getCommentsForWarehouseTransfer);
// Mendapatkan semua warehouse transfers
router.get('/api/v1/warehouse_transfers', getAllWarehouseTransfers);
// Endpoint untuk update warehouse transfer berdasarkan transaction_id
router.patch('/api/v1/warehouse_transfers/:id', updateWarehouseTransfer);

module.exports = router;
