// /controllers/taxController.js

const Tax = require('../models/taxModel');

// Fungsi untuk menambahkan pajak baru
const addTax = async (req, res) => {
  try {
    const { tax } = req.body;

    // Membuat objek pajak baru
    const newTax = new Tax({
      name: tax.name,
      rate: tax.rate,
      is_witholding: tax.is_witholding,
      sell_tax_account_name: tax.sell_tax_account_name,
      buy_tax_account_name: tax.buy_tax_account_name,
    });

    // Menyimpan pajak baru ke database
    const savedTax = await newTax.save();

    // Mengembalikan response
    res.status(201).json({
      company_tax: {
        id: savedTax._id,
        name: savedTax.name,
        created_at: savedTax.createdAt,
        updated_at: savedTax.updatedAt,
        custom_id: null,
        use_witholding: savedTax.is_witholding,
        rate: savedTax.rate.toFixed(1), // Format decimal
        sell_tax_account: {
          id: 6977,  // Example account ID, replace with dynamic data if necessary
          name: savedTax.sell_tax_account_name,
        },
        buy_tax_account: {
          id: 6953,  // Example account ID, replace with dynamic data if necessary
          name: savedTax.buy_tax_account_name,
        },
      },
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add tax', message: error.message });
  }
};

// Fungsi untuk mendapatkan pajak berdasarkan id
const getTaxById = async (req, res) => {
    try {
      const { id } = req.params; // Mendapatkan id pajak dari URL
  
      // Mencari pajak berdasarkan id
      const tax = await Tax.findById(id);
  
      if (!tax) {
        return res.status(404).json({ error: 'Tax not found' });
      }
  
      // Mengembalikan data pajak yang ditemukan
      res.status(200).json({
        company_tax: {
          id: tax._id,
          name: tax.name,
          rate: tax.rate.toFixed(1),  // Format rate decimal
          custom_id: null,  // Custom ID bisa ditambahkan jika diperlukan
          buy_tax_account: {
            id: 6953,  // Example account ID, replace with dynamic data if necessary
            name: tax.buy_tax_account_name,
          },
          sell_tax_account: {
            id: 6977,  // Example account ID, replace with dynamic data if necessary
            name: tax.sell_tax_account_name,
          },
        },
      });
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve tax', message: error.message });
    }
  };

  // Fungsi untuk memperbarui pajak berdasarkan id
const updateTaxById = async (req, res) => {
    try {
      const { id } = req.params; // Mendapatkan id pajak dari URL
      const { tax } = req.body; // Mendapatkan data pajak dari body request
  
      // Mencari pajak berdasarkan id
      const updatedTax = await Tax.findByIdAndUpdate(id, {
        name: tax.name || undefined,
        rate: tax.rate || undefined,
        is_witholding: tax.is_witholding || undefined,
        is_compound: tax.is_compound || undefined,  // Update is_compound
        sell_tax_account_name: tax.sell_tax_account_name || undefined,
        buy_tax_account_name: tax.buy_tax_account_name || undefined,
        custom_id: tax.custom_id || undefined  // Update custom_id
      }, { new: true }); // Mengembalikan data yang sudah diperbarui
  
      if (!updatedTax) {
        return res.status(404).json({ error: 'Tax not found' });
      }
  
      // Mengembalikan response dengan data yang sudah diupdate
      res.status(200).json({
        company_tax: {
          id: updatedTax._id,
          name: updatedTax.name,
          rate: updatedTax.rate.toFixed(1),  // Format rate decimal
          custom_id: updatedTax.custom_id || null,  // Jika custom_id kosong
          buy_tax_account: {
            id: 6953,  // Example account ID, replace with dynamic data if necessary
            name: updatedTax.buy_tax_account_name,
          },
          sell_tax_account: {
            id: 6977,  // Example account ID, replace with dynamic data if necessary
            name: updatedTax.sell_tax_account_name,
          },
        },
      });
    } catch (error) {
      res.status(500).json({ error: 'Failed to update tax', message: error.message });
    }
  };

  // Fungsi untuk menghapus pajak berdasarkan id
const deleteTaxById = async (req, res) => {
    try {
      const { id } = req.params; // Mendapatkan id pajak dari URL
  
      // Mencari dan menghapus pajak berdasarkan id
      const deletedTax = await Tax.findByIdAndDelete(id);
  
      if (!deletedTax) {
        return res.status(404).json({ error: 'Tax not found' });
      }
  
      // Mengembalikan response setelah penghapusan
      res.status(200).json({
        message: 'Tax successfully deleted',
        deleted_tax_id: deletedTax._id,
      });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete tax', message: error.message });
    }
  };

module.exports = {
  addTax,
  getTaxById,
  updateTaxById,
  deleteTaxById
};
