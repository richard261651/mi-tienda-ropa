import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <h3 className="footer__logo">NUXELIT</h3>
          <p className="footer__tagline">Streetwear con actitud. Diseñado para quienes marcan tendencia.</p>
          <div className="footer__socials">
            <a href="#" aria-label="Instagram">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
            </a>
            <a href="#" aria-label="Twitter">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/></svg>
            </a>
            <a href="#" aria-label="TikTok">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 12a4 4 0 104 4V4a5 5 0 005 5"/></svg>
            </a>
          </div>
        </div>

        <div className="footer__nav">
          <h4>Navegación</h4>
          <Link to="/">Inicio</Link>
          <Link to="/catalogo">Catálogo</Link>
          <Link to="/nosotros">Nosotros</Link>
          <Link to="/contacto">Contacto</Link>
        </div>

        <div className="footer__nav">
          <h4>Ayuda</h4>
          <a href="#">Envíos</a>
          <a href="#">Devoluciones</a>
          <a href="#">Guía de Tallas</a>
          <a href="#">Preguntas Frecuentes</a>
        </div>

        <div className="footer__newsletter">
          <h4>Newsletter</h4>
          <p>Recibe ofertas exclusivas y novedades.</p>
          <form className="footer__form" onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="tu@email.com" />
            <button type="submit" className="btn btn-primary">→</button>
          </form>
        </div>
      </div>

      <div className="footer__bottom container">
        <p>© 2026 NUXELIT. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}
