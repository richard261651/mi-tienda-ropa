const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const productRoutes = require('./routes/products');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000', 'http://127.0.0.1:5173', 'https://mi-tienda-ropa-2.onrender.com'],
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded images as static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// API Routes
app.use('/api/products', productRoutes);

// Health check
app.get('/', (req, res) => {
  res.json({
    message: 'NUXELIT API funcionando correctamente',
    version: '1.0.0',
    endpoints: {
      products: '/api/products',
      featured: '/api/products/featured',
      uploads: '/uploads'
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(500).json({ error: err.message || 'Error interno del servidor' });
});

app.listen(PORT, () => {
  console.log(`🚀 NUXELIT API corriendo en http://localhost:${PORT}`);
  console.log(`📦 Productos: http://localhost:${PORT}/api/products`);
});
