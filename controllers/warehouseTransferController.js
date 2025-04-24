// /controllers/warehouseTransferController.js

const WarehouseTransfer = require('../models/warehouseTransfer');

// Controller untuk membuat warehouse transfer baru
const createWarehouseTransfer = async (req, res) => {
  try {
    const { warehouse_transfer } = req.body;

    // Menyimpan transfer baru
    const newTransfer = new WarehouseTransfer({
      transaction_no: warehouse_transfer.transaction_no,
      transaction_date: new Date(warehouse_transfer.transaction_date),
      from_warehouse: {
        name: warehouse_transfer.from_warehouse_name,
        code: warehouse_transfer.from_warehouse_code,
      },
      to_warehouse: {
        name: warehouse_transfer.to_warehouse_name,
        code: warehouse_transfer.to_warehouse_code,
      },
      memo: warehouse_transfer.memo,
      warehouse_transfer_lines_attributes: warehouse_transfer.warehouse_transfer_lines_attributes.map(line => ({
        product: { 
          name: line.product_name,
          code: line.product_code || '' // Kalau product_code tidak ada, set ke string kosong
        },
        quantity: line.quantity,
      }))
    });

    // Simpan transfer ke database
    const savedTransfer = await newTransfer.save();

    // Kirim response sesuai format yang diinginkan
    res.status(201).json({
      warehouse_transfer: {
        id: savedTransfer._id,
        transaction_date: savedTransfer.transaction_date.toISOString().split('T')[0], // Format date "YYYY-MM-DD"
        transaction_no: savedTransfer.transaction_no,
        memo: savedTransfer.memo,
        from_warehouse: {
          id: savedTransfer._id, // Menggunakan ID transfer sebagai ID warehouse untuk contoh ini
          name: savedTransfer.from_warehouse.name,
          code: savedTransfer.from_warehouse.code,
        },
        to_warehouse: {
          id: savedTransfer._id, // Menggunakan ID transfer sebagai ID warehouse untuk contoh ini
          name: savedTransfer.to_warehouse.name,
          code: savedTransfer.to_warehouse.code,
        },
        warehouse_transfer_line_attributes: savedTransfer.warehouse_transfer_lines_attributes.map(line => ({
          id: line._id,
          quantity: line.quantity,
          product: {
            id: line.product._id, // ID dari produk
            name: line.product.name,
            code: line.product.code,
          }
        }))
      }
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to create warehouse transfer", message: error.message });
  }
};

// Controller untuk mengambil data warehouse transfer berdasarkan ID atau transaction_no
// Controller untuk mengambil data warehouse transfer berdasarkan ID atau transaction_no
const getWarehouseTransfer = async (req, res) => {
    try {
      const { id } = req.params;
  
      // Mencari data warehouse transfer berdasarkan _id atau transaction_no
      const transfer = await WarehouseTransfer.findOne({
        $or: [
          { _id: id },  // Mencari berdasarkan _id
          { transaction_no: id }  // Mencari berdasarkan transaction_no
        ]
      });
  
      if (!transfer) {
        return res.status(404).json({ error: 'Warehouse transfer not found' });
      }
  
      // Format response sesuai yang diinginkan
      res.json({
        warehouse_transfer: {
          id: transfer._id,
          transaction_date: transfer.transaction_date.toISOString().split('T')[0], // Format date "YYYY-MM-DD"
          transaction_no: transfer.transaction_no,
          memo: transfer.memo,
          from_warehouse: {
            id: transfer._id, // Misal, id warehouse diambil dari _id transfer (ubah sesuai kebutuhan)
            name: transfer.from_warehouse.name,
            code: transfer.from_warehouse.code,
          },
          to_warehouse: {
            id: transfer._id, // Misal, id warehouse diambil dari _id transfer (ubah sesuai kebutuhan)
            name: transfer.to_warehouse.name,
            code: transfer.to_warehouse.code,
          },
          warehouse_transfer_line_attributes: transfer.warehouse_transfer_lines_attributes.map(line => ({
            id: line._id,
            quantity: line.quantity,
            product: {
              id: line.product._id,
              name: line.product.name,
              code: line.product.code || '',
            }
          }))
        }
      });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch warehouse transfer", message: error.message });
    }
  };

  const addCommentToWarehouseTransfer = async (req, res) => {
    try {
      const { transaction_id } = req.params; // Mendapatkan transaction_id dari URL
      const { notes } = req.body.comment; // Mengambil comment notes dari body request
  
      // Mencari warehouse transfer berdasarkan transaction_no
      const transfer = await WarehouseTransfer.findOne({ transaction_no: transaction_id });
  
      if (!transfer) {
        return res.status(404).json({ error: 'Warehouse transfer not found' });
      }
  
      // Menambahkan comment baru ke transfer
      transfer.comments.push({ notes });
  
      // Menyimpan perubahan ke database
      await transfer.save();
  
      // Mengirimkan response dengan komentar yang baru ditambahkan
      res.status(201).json({
        warehouse_transfer: {
          id: transfer._id,
          transaction_date: transfer.transaction_date.toISOString().split('T')[0], // Format date "YYYY-MM-DD"
          transaction_no: transfer.transaction_no,
          memo: transfer.memo,
          from_warehouse: {
            id: transfer.from_warehouse._id,
            name: transfer.from_warehouse.name,
            code: transfer.from_warehouse.code,
          },
          to_warehouse: {
            id: transfer.to_warehouse._id,
            name: transfer.to_warehouse.name,
            code: transfer.to_warehouse.code,
          },
          warehouse_transfer_line_attributes: transfer.warehouse_transfer_lines_attributes.map(line => ({
            id: line._id,
            quantity: line.quantity,
            product: {
              id: line.product._id,
              name: line.product.name,
              code: line.product.code || '',
            }
          })),
          comments: transfer.comments,  // Mengembalikan komentar yang sudah ditambahkan
        }
      });
    } catch (error) {
      res.status(500).json({ error: "Failed to add comment to warehouse transfer", message: error.message });
    }
  };

  // Fungsi untuk mendapatkan komentar berdasarkan transaction_id
const getCommentsForWarehouseTransfer = async (req, res) => {
    try {
      const { transaction_id } = req.params; // Mendapatkan transaction_id dari URL
  
      // Mencari warehouse transfer berdasarkan transaction_no
      const transfer = await WarehouseTransfer.findOne({ transaction_no: transaction_id });
  
      // Jika tidak ditemukan transfer dengan transaction_id
      if (!transfer) {
        return res.status(404).json({ error: 'Warehouse transfer not found' });
      }
  
      // Mengembalikan komentar yang terkait dengan warehouse transfer
      res.status(200).json({
        warehouse_transfer: {
          id: transfer._id,
          transaction_date: transfer.transaction_date.toISOString().split('T')[0], // Format tanggal "YYYY-MM-DD"
          transaction_no: transfer.transaction_no,
          memo: transfer.memo,
          from_warehouse: {
            id: transfer.from_warehouse._id,
            name: transfer.from_warehouse.name,
            code: transfer.from_warehouse.code,
          },
          to_warehouse: {
            id: transfer.to_warehouse._id,
            name: transfer.to_warehouse.name,
            code: transfer.to_warehouse.code,
          },
          warehouse_transfer_line_attributes: transfer.warehouse_transfer_lines_attributes.map(line => ({
            id: line._id,
            quantity: line.quantity,
            product: {
              id: line.product._id,
              name: line.product.name,
              code: line.product.code || '',
            }
          })),
          comments: transfer.comments, // Mengembalikan komentar
        }
      });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch comments for warehouse transfer", message: error.message });
    }
  };

  // Fungsi untuk mendapatkan semua warehouse transfer
const getAllWarehouseTransfers = async (req, res) => {
    try {
      // Mengambil semua warehouse transfer dari database
      const transfers = await WarehouseTransfer.find();
  
      // Jika tidak ada data
      if (!transfers || transfers.length === 0) {
        return res.status(404).json({ error: 'No warehouse transfers found' });
      }
  
      // Mengembalikan semua data warehouse transfer
      res.status(200).json({
        warehouse_transfers: transfers.map(transfer => ({
          id: transfer._id,
          transaction_no: transfer.transaction_no,
          transaction_date: transfer.transaction_date.toISOString().split('T')[0], // Format date "YYYY-MM-DD"
          from_warehouse: {
            id: transfer.from_warehouse._id,
            name: transfer.from_warehouse.name,
            code: transfer.from_warehouse.code,
          },
          to_warehouse: {
            id: transfer.to_warehouse._id,
            name: transfer.to_warehouse.name,
            code: transfer.to_warehouse.code,
          },
          warehouse_transfer_line_attributes: transfer.warehouse_transfer_lines_attributes.map(line => ({
            id: line._id,
            quantity: line.quantity,
            product: {
              id: line.product._id,
              name: line.product.name,
              code: line.product.code || '',
            }
          })),
        }))
      });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch warehouse transfers", message: error.message });
    }
  };

// Fungsi untuk update warehouse transfer berdasarkan transaction_id
const updateWarehouseTransfer = async (req, res) => {
    try {
      const { id } = req.params; // Mendapatkan transaction_id dari URL
      const { warehouse_transfer } = req.body; // Mendapatkan data warehouse transfer dari body request
  
      // Mencari warehouse transfer berdasarkan transaction_id (id)
      const transfer = await WarehouseTransfer.findOne({ transaction_no: id });
  
      // Jika transfer tidak ditemukan
      if (!transfer) {
        return res.status(404).json({ error: 'Warehouse transfer not found' });
      }
  
      // Mengupdate informasi warehouse transfer
      transfer.from_warehouse.name = warehouse_transfer.from_warehouse_name || transfer.from_warehouse.name;
      transfer.to_warehouse.name = warehouse_transfer.to_warehouse_name || transfer.to_warehouse.name;
      transfer.memo = warehouse_transfer.memo || transfer.memo;
      transfer.transaction_date = warehouse_transfer.transaction_date ? new Date(warehouse_transfer.transaction_date) : transfer.transaction_date;
  
      // Mengupdate warehouse_transfer_lines_attributes
      warehouse_transfer.warehouse_transfer_lines_attributes.forEach(line => {
        const productLine = transfer.warehouse_transfer_lines_attributes.find(l => l._id.toString() === line.id);
  
        if (productLine) {
          // Update product name and quantity if productLine found
          productLine.product.name = line.product_name || productLine.product.name;
          productLine.product.code = line.product.code || productLine.product.code;  // Pastikan product.code ada
          productLine.quantity = line.quantity || productLine.quantity;
        } else {
          // Jika line tidak ditemukan, bisa ditambahkan sebagai baru jika diperlukan
          transfer.warehouse_transfer_lines_attributes.push({
            product: { name: line.product_name, code: line.product.code }, // Pastikan product.code ada
            quantity: line.quantity
          });
        }
      });
  
      // Menyimpan perubahan
      await transfer.save();
  
      // Mengirimkan response dengan data yang sudah diupdate
      res.status(200).json({
        warehouse_transfer: {
          id: transfer._id,
          transaction_date: transfer.transaction_date.toISOString().split('T')[0], // Format tanggal "YYYY-MM-DD"
          transaction_no: transfer.transaction_no,
          memo: transfer.memo,
          from_warehouse: {
            id: transfer.from_warehouse._id,
            name: transfer.from_warehouse.name,
            code: transfer.from_warehouse.code,
          },
          to_warehouse: {
            id: transfer.to_warehouse._id,
            name: transfer.to_warehouse.name,
            code: transfer.to_warehouse.code,
          },
          warehouse_transfer_line_attributes: transfer.warehouse_transfer_lines_attributes.map(line => ({
            id: line._id,
            quantity: line.quantity,
            product: {
              id: line.product._id,
              name: line.product.name,
              code: line.product.code || '',
            }
          })),
        }
      });
    } catch (error) {
      res.status(500).json({ error: "Failed to update warehouse transfer", message: error.message });
    }
  };
  

module.exports = {
  createWarehouseTransfer,
  getWarehouseTransfer,
  addCommentToWarehouseTransfer,
  getCommentsForWarehouseTransfer,
  getAllWarehouseTransfers,
  updateWarehouseTransfer
};
