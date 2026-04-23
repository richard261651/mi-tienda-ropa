const express = require('express');
const multer = require('multer');
const path = require('path');
const Product = require('../models/Product');
const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, '..', 'uploads')),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname.replace(/\s+/g, '-'))
});
const upload = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 } });

router.get('/', async (req, res) => {
  try {
    const products = await Product.getAll(req.query.categoria);
    res.json(products);
  } catch (err) { res.status(500).json({ error: 'Error al obtener productos' }); }
});

router.get('/featured', async (req, res) => {
  try {
    const products = await Product.getFeatured();
    res.json(products);
  } catch (err) { res.status(500).json({ error: 'Error al obtener productos destacados' }); }
});

router.get('/:id', async (req, res) => {
  try {
    const product = await Product.getById(req.params.id);
    if (!product) return res.status(404).json({ error: 'Producto no encontrado' });
    res.json(product);
  } catch (err) { res.status(500).json({ error: 'Error al obtener producto' }); }
});

router.post('/', upload.single('imagen'), async (req, res) => {
  try {
    const productData = { ...req.body, imagen: req.file ? `/uploads/${req.file.filename}` : '' };
    const newProduct = await Product.create(productData);
    res.status(201).json(newProduct);
  } catch (err) { res.status(500).json({ error: 'Error al crear producto' }); }
});

router.put('/:id', upload.single('imagen'), async (req, res) => {
  try {
    const productData = { ...req.body };
    if (req.file) productData.imagen = `/uploads/${req.file.filename}`;
    const updated = await Product.update(req.params.id, productData);
    if (!updated) return res.status(404).json({ error: 'Producto no encontrado' });
    res.json(updated);
  } catch (err) { res.status(500).json({ error: 'Error al actualizar producto' }); }
});

router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Product.remove(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Producto no encontrado' });
    res.json({ message: 'Producto eliminado correctamente' });
  } catch (err) { res.status(500).json({ error: 'Error al eliminar producto' }); }
});

module.exports = router;
