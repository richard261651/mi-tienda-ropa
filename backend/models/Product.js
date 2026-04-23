const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  descripcion: { type: String, default: '' },
  precio: { type: Number, default: 0 },
  categoria: { type: String, default: 'General' },
  imagen: { type: String, default: '' },
  destacado: { type: Boolean, default: false },
  tallas: { type: [String], default: ['M'] },
  stock: { type: Number, default: 0 }
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

async function getAll(categoria) {
  if (categoria) return Product.find({ categoria: new RegExp(categoria, 'i') });
  return Product.find();
}

async function getFeatured() {
  return Product.find({ destacado: true });
}

async function getById(id) {
  return Product.findById(id);
}

async function create(productData) {
  const product = new Product({
    nombre: productData.nombre || 'Sin nombre',
    descripcion: productData.descripcion || '',
    precio: Number(productData.precio) || 0,
    categoria: productData.categoria || 'General',
    imagen: productData.imagen || '',
    destacado: productData.destacado === 'true' || productData.destacado === true,
    tallas: productData.tallas ? JSON.parse(productData.tallas) : ['M'],
    stock: Number(productData.stock) || 0
  });
  return product.save();
}

async function update(id, productData) {
  return Product.findByIdAndUpdate(id, {
    ...(productData.nombre && { nombre: productData.nombre }),
    ...(productData.descripcion && { descripcion: productData.descripcion }),
    ...(productData.precio && { precio: Number(productData.precio) }),
    ...(productData.categoria && { categoria: productData.categoria }),
    ...(productData.imagen && { imagen: productData.imagen }),
    ...(productData.destacado !== undefined && { destacado: produc
Veo que actualmente usa archivos JSON para guardar productos. Vamos a reemplazarlo con MongoDB. Ejecuta esto:

```powershell
@'
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  descripcion: { type: String, default: '' },
  precio: { type: Number, default: 0 },
  categoria: { type: String, default: 'General' },
  imagen: { type: String, default: '' },
  destacado: { type: Boolean, default: false },
  tallas: { type: [String], default: ['M'] },
  stock: { type: Number, default: 0 }
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);

async function getAll(categoria) {
  if (categoria) return Product.find({ categoria: new RegExp(categoria, 'i') });
  return Product.find();
}

async function getFeatured() {
  return Product.find({ destacado: true });
}

async function getById(id) {
  return Product.findById(id);
}

async function create(productData) {
  const product = new Product({
    nombre: productData.nombre || 'Sin nombre',
    descripcion: productData.descripcion || '',
    precio: Number(productData.precio) || 0,
    categoria: productData.categoria || 'General',
    imagen: productData.imagen || '',
    destacado: productData.destacado === 'true' || productData.destacado === true,
    tallas: productData.tallas ? JSON.parse(productData.tallas) : ['M'],
    stock: Number(productData.stock) || 0
  });
  return product.save();
}

async function update(id, productData) {
  return Product.findByIdAndUpdate(id, {
    ...(productData.nombre && { nombre: productData.nombre }),
    ...(productData.descripcion && { descripcion: productData.descripcion }),
    ...(productData.precio && { precio: Number(productData.precio) }),
    ...(productData.categoria && { categoria: productData.categoria }),
    ...(productData.imagen && { imagen: productData.imagen }),
    ...(productData.destacado !== undefined && { destacado: productData.destacado === 'true' || productData.destacado === true }),
    ...(productData.tallas && { tallas: JSON.parse(productData.tallas) }),
    ...(productData.stock && { stock: Number(productData.stock) })
  }, { new: true });
}

async function remove(id) {
  const result = await Product.findByIdAndDelete(id);
  return !!result;
}

module.exports = { getAll, getFeatured, getById, create, update, remove };
