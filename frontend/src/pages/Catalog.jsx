import { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import './Catalog.css';

const API_URL = 'http://localhost:3001';
const CATEGORIAS = ['Todas', 'Camisetas', 'Hoodies', 'Pantalones', 'Chaquetas', 'Accesorios'];

export default function Catalog() {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [activeCategory, setActiveCategory] = useState('Todas');
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch(`${API_URL}/api/products`)
      .then(r => r.json())
      .then(data => { setProducts(data); setFiltered(data); })
      .catch(() => {});
  }, []);

  useEffect(() => {
    let result = products;
    if (activeCategory !== 'Todas') {
      result = result.filter(p => p.categoria === activeCategory);
    }
    if (search.trim()) {
      result = result.filter(p => p.nombre.toLowerCase().includes(search.toLowerCase()));
    }
    setFiltered(result);
  }, [activeCategory, search, products]);

  return (
    <main className="catalog-page">
      <section className="catalog-hero">
        <div className="container">
          <h1 className="section-title">Nuestro <span className="accent-text">Catálogo</span></h1>
          <p className="section-subtitle">Explora toda nuestra colección</p>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="catalog-filters">
            <div className="catalog-categories">
              {CATEGORIAS.map(cat => (
                <button key={cat} className={`cat-btn ${activeCategory === cat ? 'active' : ''}`} onClick={() => setActiveCategory(cat)}>{cat}</button>
              ))}
            </div>
            <input type="text" className="catalog-search" placeholder="Buscar producto..." value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <p className="catalog-count">{filtered.length} producto{filtered.length !== 1 ? 's' : ''}</p>
          {filtered.length > 0 ? (
            <div className="products-grid">
              {filtered.map((p, i) => (
                <div key={p.id} style={{ animationDelay: `${i * 0.08}s` }}><ProductCard product={p} /></div>
              ))}
            </div>
          ) : (
            <div className="catalog-empty"><p>No se encontraron productos</p></div>
          )}
        </div>
      </section>
    </main>
  );
}
