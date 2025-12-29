// Vercel Serverless Function Entry Point
// ไม่ใช้ Socket.io เพราะ Vercel serverless ไม่รองรับ WebSocket

const express = require('express');
const cors = require('cors');
const connectDB = require('../config/db');
const authRoutes = require('../routes/auth');
const loanRoutes = require('../routes/loans');
const customerRoutes = require('../routes/customers');
const paymentRoutes = require('../routes/payments');
const dashboardRoutes = require('../routes/dashboard');
const settingsRoutes = require('../routes/settings');

// สร้าง Express app
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || '*',
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'API is running',
    timestamp: new Date().toISOString()
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/loans', loanRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/settings', settingsRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    error: err.message || 'Internal server error'
  });
});

// Export สำหรับ Vercel
module.exports = app;
