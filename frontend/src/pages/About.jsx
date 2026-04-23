import './About.css';

export default function About() {
  return (
    <main className="about-page">
      <section className="about-hero">
        <div className="container">
          <p className="about-label">Nuestra Historia</p>
          <h1 className="section-title">Más Que <span className="accent-text">Ropa</span></h1>
          <p className="section-subtitle">Somos una marca que nace de la pasión por el streetwear y la cultura urbana</p>
        </div>
      </section>

      <section className="section">
        <div className="container about-grid">
          <div className="about-card">
            <span className="about-icon">🎨</span>
            <h3>Diseño Original</h3>
            <p>Cada prenda es diseñada internamente, con inspiración en la cultura urbana, el arte y la música.</p>
          </div>
          <div className="about-card">
            <span className="about-icon">🌿</span>
            <h3>Materiales Premium</h3>
            <p>Usamos algodón orgánico de alta densidad y telas seleccionadas para garantizar durabilidad y comodidad.</p>
          </div>
          <div className="about-card">
            <span className="about-icon">🚀</span>
            <h3>Envío Rápido</h3>
            <p>Enviamos a todo el país con opciones de entrega express en 24 horas para las principales ciudades.</p>
          </div>
          <div className="about-card">
            <span className="about-icon">♻️</span>
            <h3>Sostenibilidad</h3>
            <p>Nos comprometemos con prácticas de producción responsables y empaques eco-friendly.</p>
          </div>
        </div>
      </section>

      <section className="section about-mission">
        <div className="container">
          <div className="about-mission__inner">
            <h2>Nuestra <span className="accent-text">Misión</span></h2>
            <p>Crear ropa que empodere. Que cada persona que use ROPITA sienta que está expresando su verdadera esencia. No seguimos tendencias, las creamos.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
