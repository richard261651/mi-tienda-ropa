import { useState } from 'react';
import './Contact.css';

export default function Contact() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <main className="contact-page">
      <section className="contact-hero">
        <div className="container">
          <h1 className="section-title">Contác<span className="accent-text">tanos</span></h1>
          <p className="section-subtitle">¿Tienes alguna pregunta? Estamos aquí para ayudarte</p>
        </div>
      </section>
      <section className="section">
        <div className="container contact-grid">
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Nombre</label>
              <input type="text" placeholder="Tu nombre" required />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input type="email" placeholder="tu@email.com" required />
            </div>
            <div className="form-group">
              <label>Mensaje</label>
              <textarea rows="5" placeholder="Escribe tu mensaje..." required></textarea>
            </div>
            <button type="submit" className={`btn btn-primary ${sent ? 'sent' : ''}`}>
              {sent ? '✓ Enviado' : 'Enviar Mensaje'}
            </button>
          </form>
          <div className="contact-info">
            <div className="contact-info__item">
              <h4>📍 Ubicación</h4>
              <p>Bogotá, Colombia</p>
            </div>
            <div className="contact-info__item">
              <h4>📧 Email</h4>
              <p>hola@nuxelit.com</p>
            </div>
            <div className="contact-info__item">
              <h4>📱 WhatsApp</h4>
              <p>+57 300 123 4567</p>
            </div>
            <div className="contact-info__item">
              <h4>🕐 Horario</h4>
              <p>Lun - Vie: 9am - 6pm</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
