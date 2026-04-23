import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import './Home.css';

const API_URL = 'http://localhost:3001';

export default function Home() {
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/api/products/featured`)
      .then(r => r.json())
      .then(data => setFeatured(data))
      .catch(() => setFeatured([]));
  }, []);

  return (
    <main className="home">
      {/* Hero */}
      <section className="hero">
        <div className="hero__bg" />
        <div className="hero__content container">
          <p className="hero__label">Nueva Colección 2026</p>
          <h1 className="hero__title">Define Tu<br /><span className="accent-text">Propio Estilo</span></h1>
          <p className="hero__desc">Streetwear premium diseñado para quienes se atreven a ser diferentes. Calidad, actitud y originalidad en cada prenda.</p>
          <div className="hero__actions">
            <Link to="/catalogo" className="btn btn-primary">Ver Catálogo</Link>
            <Link to="/nosotros" className="btn btn-outline">Nuestra Historia</Link>
          </div>
        </div>
        <div className="hero__scroll-indicator">
          <span>Scroll</span>
          <div className="hero__scroll-line" />
        </div>
      </section>

      {/* Stats */}
      <section className="stats section">
        <div className="container stats__grid">
          <div className="stat">
            <span className="stat__number">500+</span>
            <span className="stat__label">Clientes Satisfechos</span>
          </div>
          <div className="stat">
            <span className="stat__number">50+</span>
            <span className="stat__label">Diseños Exclusivos</span>
          </div>
          <div className="stat">
            <span className="stat__number">100%</span>
            <span className="stat__label">Algodón Premium</span>
          </div>
          <div className="stat">
            <span className="stat__number">24h</span>
            <span className="stat__label">Envío Express</span>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">Productos <span className="accent-text">Destacados</span></h2>
          <p className="section-subtitle">Lo más nuevo y popular de nuestra colección</p>
          <div className="products-grid">
            {featured.map((p, i) => (
              <div key={p.id} style={{ animationDelay: `${i * 0.1}s` }}>
                <ProductCard product={p} />
              </div>
            ))}
          </div>
          <div className="section-cta">
            <Link to="/catalogo" className="btn btn-outline">Ver Todo el Catálogo →</Link>
          </div>
        </div>
      </section>

      {/* Brand Story */}
      <section className="brand-story section">
        <div className="container brand-story__inner">
          <div className="brand-story__text">
            <p className="brand-story__label">Nuestra Filosofía</p>
            <h2 className="brand-story__title">Ropa Que Habla<br />Por Ti</h2>
            <p className="brand-story__desc">En NUXELIT creemos que la ropa es una extensión de tu personalidad. Cada pieza está diseñada con atención al detalle, materiales de primera calidad y un enfoque en la comodidad sin sacrificar el estilo.</p>
            <Link to="/nosotros" className="btn btn-primary">Conoce Más</Link>
          </div>
          <div className="brand-story__visual">
            <div className="brand-story__card">
              <span className="brand-story__icon">✦</span>
              <h4>Materiales Premium</h4>
              <p>Algodón orgánico y telas seleccionadas</p>
            </div>
            <div className="brand-story__card">
              <span className="brand-story__icon">✦</span>
              <h4>Diseño Original</h4>
              <p>Cada prenda es una pieza única</p>
            </div>
            <div className="brand-story__card">
              <span className="brand-story__icon">✦</span>
              <h4>Envío Nacional</h4>
              <p>Entrega rápida a toda Colombia</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
