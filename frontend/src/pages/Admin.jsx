import { useState, useEffect } from 'react';
import './Admin.css';

const API_URL = 'http://localhost:3001';

export default function Admin() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ nombre: '', precio: '', categoria: 'Camisetas', descripcion: '', tallas: 'S,M,L,XL', stock: '', destacado: false });
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [msg, setMsg] = useState('');

  const loadProducts = () => {
    fetch(`${API_URL}/api/products`).then(r => r.json()).then(setProducts).catch(() => {});
  };

  useEffect(() => { loadProducts(); }, []);

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('nombre', form.nombre);
    data.append('precio', form.precio);
    data.append('categoria', form.categoria);
    data.append('descripcion', form.descripcion);
    data.append('tallas', JSON.stringify(form.tallas.split(',').map(t => t.trim())));
    data.append('stock', form.stock);
    data.append('destacado', form.destacado);
    if (imageFile) data.append('imagen', imageFile);

    try {
      const res = await fetch(`${API_URL}/api/products`, { method: 'POST', body: data });
      if (res.ok) {
        setMsg('✓ Producto creado');
        setForm({ nombre: '', precio: '', categoria: 'Camisetas', descripcion: '', tallas: 'S,M,L,XL', stock: '', destacado: false });
        setImageFile(null);
        setPreview(null);
        loadProducts();
        setTimeout(() => setMsg(''), 3000);
      }
    } catch { setMsg('Error al crear producto'); }
  };

  const handleDelete = async (id) => {
    if (!confirm('¿Eliminar este producto?')) return;
    await fetch(`${API_URL}/api/products/${id}`, { method: 'DELETE' });
    loadProducts();
  };

  const formatPrice = (p) => new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(p);

  return (
    <main className="admin-page">
      <section className="admin-hero">
        <div className="container">
          <h1 className="section-title">Panel <span className="accent-text">Admin</span></h1>
          <p className="section-subtitle">Gestiona tus productos y sube imágenes</p>
        </div>
      </section>
      <section className="section">
        <div className="container admin-grid">
          <form className="admin-form" onSubmit={handleSubmit}>
            <h3>Agregar Producto</h3>
            {msg && <p className="admin-msg">{msg}</p>}
            <div className="form-group"><label>Nombre</label><input value={form.nombre} onChange={e => setForm({...form, nombre: e.target.value})} required /></div>
            <div className="form-row">
              <div className="form-group"><label>Precio (COP)</label><input type="number" value={form.precio} onChange={e => setForm({...form, precio: e.target.value})} required /></div>
              <div className="form-group"><label>Stock</label><input type="number" value={form.stock} onChange={e => setForm({...form, stock: e.target.value})} required /></div>
            </div>
            <div className="form-group"><label>Categoría</label>
              <select value={form.categoria} onChange={e => setForm({...form, categoria: e.target.value})}>
                <option>Camisetas</option><option>Hoodies</option><option>Pantalones</option><option>Chaquetas</option><option>Accesorios</option>
              </select>
            </div>
            <div className="form-group"><label>Tallas (separadas por coma)</label><input value={form.tallas} onChange={e => setForm({...form, tallas: e.target.value})} /></div>
            <div className="form-group"><label>Descripción</label><textarea rows="3" value={form.descripcion} onChange={e => setForm({...form, descripcion: e.target.value})}></textarea></div>
            <div className="form-group">
              <label>Imagen</label>
              <div className="upload-area" onClick={() => document.getElementById('file-input').click()}>
                {preview ? <img src={preview} alt="Preview" /> : <p>📷 Click para subir imagen</p>}
                <input id="file-input" type="file" accept="image/*" onChange={handleImage} hidden />
              </div>
            </div>
            <label className="checkbox-label">
              <input type="checkbox" checked={form.destacado} onChange={e => setForm({...form, destacado: e.target.checked})} />
              Producto Destacado
            </label>
            <button type="submit" className="btn btn-primary">Agregar Producto</button>
          </form>

          <div className="admin-products">
            <h3>Productos ({products.length})</h3>
            <div className="admin-list">
              {products.map(p => (
                <div key={p.id} className="admin-item">
                  <div className="admin-item__img">
                    {p.imagen ? <img src={p.imagen.startsWith('http') ? p.imagen : `${API_URL}${p.imagen}`} alt={p.nombre} /> : <div className="placeholder-img"><span>📷</span></div>}
                  </div>
                  <div className="admin-item__info">
                    <h4>{p.nombre}</h4>
                    <p>{formatPrice(p.precio)} · {p.categoria}</p>
                  </div>
                  <button className="admin-item__delete" onClick={() => handleDelete(p.id)}>🗑️</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
