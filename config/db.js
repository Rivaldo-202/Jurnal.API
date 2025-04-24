// /config/db.js

const mongoose = require('mongoose');
require('dotenv').config(); // Mengimpor dotenv untuk membaca .env

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI; // Mengambil koneksi URI dari .env
    mongoose.connect(mongoURI)
    .then(() => console.log('✅ MongoDB Atlas Connected!'))
    .catch((err) => console.error('❌ MongoDB Atlas connection error:', err));
    
    
    console.log('✅ MongoDB Atlas Connected!');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1); // Exit the process with failure
  }
};

module.exports = connectDB;
