const fs = require('fs');
const path = require('path');

const DATA_FILE = path.join(__dirname, '..', 'data', 'products.json');

// Helper to read products from JSON file
function readProducts() {
  try {
    const data = fs.readFileSync(DATA_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
}

// Helper to write products to JSON file
function writeProducts(products) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(products, null, 2), 'utf-8');
}

// Get all products, optionally filtered by category
function getAll(categoria) {
  const products = readProducts();
  if (categoria) {
    return products.filter(p => p.categoria.toLowerCase() === categoria.toLowerCase());
  }
  return products;
}

// Get featured products
function getFeatured() {
  const products = readProducts();
  return products.filter(p => p.destacado === true);
}

// Get a single product by ID
function getById(id) {
  const products = readProducts();
  return products.find(p => p.id === id) || null;
}

// Create a new product
function create(productData) {
  const products = readProducts();
  const newId = String(Date.now());
  const newProduct = {
    id: newId,
    nombre: productData.nombre || 'Sin nombre',
    descripcion: productData.descripcion || '',
    precio: Number(productData.precio) || 0,
    categoria: productData.categoria || 'General',
    imagen: productData.imagen || '',
    destacado: productData.destacado === 'true' || productData.destacado === true,
    tallas: productData.tallas ? JSON.parse(productData.tallas) : ['M'],
    stock: Number(productData.stock) || 0
  };
  products.push(newProduct);
  writeProducts(products);
  return newProduct;
}

// Update an existing product
function update(id, productData) {
  const products = readProducts();
  const index = products.findIndex(p => p.id === id);
  if (index === -1) return null;

  const existing = products[index];
  products[index] = {
    ...existing,
    nombre: productData.nombre || existing.nombre,
    descripcion: productData.descripcion || existing.descripcion,
    precio: productData.precio ? Number(productData.precio) : existing.precio,
    categoria: productData.categoria || existing.categoria,
    imagen: productData.imagen || existing.imagen,
    destacado: productData.destacado !== undefined
      ? (productData.destacado === 'true' || productData.destacado === true)
      : existing.destacado,
    tallas: productData.tallas ? JSON.parse(productData.tallas) : existing.tallas,
    stock: productData.stock ? Number(productData.stock) : existing.stock
  };
  writeProducts(products);
  return products[index];
}

// Delete a product
function remove(id) {
  const products = readProducts();
  const index = products.findIndex(p => p.id === id);
  if (index === -1) return false;
  products.splice(index, 1);
  writeProducts(products);
  return true;
}

module.exports = { getAll, getFeatured, getById, create, update, remove };
