const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// ✅ CORS Configuration for Cross-Domain Cookies
app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://localhost:5174',
    'https://gig-flow-ruddy.vercel.app',
    'https://gig-flow.vercel.app'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],
  exposedHeaders: ['Set-Cookie']
}));

// Handle preflight requests
app.options('*', cors());

// Body parser middleware
app.use(express.json());

// Additional headers for cookie support
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});

// Test route
app.get('/', (req, res) => {
  res.json({ 
    message: 'GigFlow API is running',
    endpoints: {
      auth: '/api/auth',
      gigs: '/api/gigs',
      orders: '/api/orders'
    }
  });
});

// Import routes
const authRoutes = require('./routes/auth');
const gigRoutes = require('./routes/gigs');
const orderRoutes = require('./routes/orders');

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/gigs', gigRoutes);
app.use('/api/orders', orderRoutes);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB connected successfully'))
  .catch(err => console.log('❌ MongoDB connection error:', err));

// 404 handler (should be LAST)
app.use((req, res) => {
  res.status(404).json({ 
    message: 'Route not found',
    requestedPath: req.originalUrl 
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📡 CORS enabled for Vercel domain`);
});