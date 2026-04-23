const express = require('express');
const multer = require('multer');
const path = require('path');
const Product = require('../models/Product');

const router = express.Router();

// Multer configuration for image uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '..', 'uploads'));
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + '-' + file.originalname.replace(/\s+/g, '-');
    cb(null, uniqueName);
  }
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Tipo de archivo no permitido. Solo se aceptan imágenes.'), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB max
});

// GET /api/products — List all products (optional ?categoria= filter)
router.get('/', (req, res) => {
  try {
    const { categoria } = req.query;
    const products = Product.getAll(categoria);
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener productos' });
  }
});

// GET /api/products/featured — Get featured products
router.get('/featured', (req, res) => {
  try {
    const products = Product.getFeatured();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener productos destacados' });
  }
});

// GET /api/products/:id — Get single product
router.get('/:id', (req, res) => {
  try {
    const product = Product.getById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener producto' });
  }
});

// POST /api/products — Create product with image upload
router.post('/', upload.single('imagen'), (req, res) => {
  try {
    const productData = {
      ...req.body,
      imagen: req.file ? `/uploads/${req.file.filename}` : ''
    };
    const newProduct = Product.create(productData);
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(500).json({ error: 'Error al crear producto' });
  }
});

// PUT /api/products/:id — Update product
router.put('/:id', upload.single('imagen'), (req, res) => {
  try {
    const productData = { ...req.body };
    if (req.file) {
      productData.imagen = `/uploads/${req.file.filename}`;
    }
    const updated = Product.update(req.params.id, productData);
    if (!updated) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Error al actualizar producto' });
  }
});

// DELETE /api/products/:id — Delete product
router.delete('/:id', (req, res) => {
  try {
    const deleted = Product.remove(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    res.json({ message: 'Producto eliminado correctamente' });
  } catch (err) {
    res.status(500).json({ error: 'Error al eliminar producto' });
  }
});

module.exports = router;
