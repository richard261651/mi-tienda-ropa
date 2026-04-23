import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import './Cart.css';

const API_URL = 'https://mi-tienda-ropa-1.onrender.com';

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, getTotal, clearCart } = useCart();
  const formatPrice = (p) => new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(p);

  return (
    <main className="cart-page">
      <section className="cart-hero"><div className="container">
        <h1 className="section-title">Tu <span className="accent-text">Carrito</span></h1>
      </div></section>
      <section className="section"><div className="container">
        {cart.length === 0 ? (
          <div className="cart-page__empty">
            <span style={{ fontSize: '4rem' }}>🛒</span>
            <h2>Tu carrito está vacío</h2>
            <p>Explora nuestro catálogo y encuentra algo que te encante</p>
            <Link to="/catalogo" className="btn btn-primary">Ver Catálogo</Link>
          </div>
        ) : (
          <div className="cart-page__grid">
            <div className="cart-page__items">
              {cart.map(item => {
                const imgSrc = item.imagen ? (item.imagen.startsWith('http') ? item.imagen : `${API_URL}${item.imagen}`) : null;
                return (
                  <div key={`${item.id}-${item.talla}`} className="cart-page__item">
                    <div className="cart-page__item-img">
                      {imgSrc ? <img src={imgSrc} alt={item.nombre} /> : <div className="placeholder-img"><span>📷</span></div>}
                    </div>
                    <div className="cart-page__item-info">
                      <h3>{item.nombre}</h3>
                      <p>Talla: {item.talla}</p>
                      <p className="cart-page__item-price">{formatPrice(item.precio)}</p>
                    </div>
                    <div className="cart-page__item-qty">
                      <button onClick={() => updateQuantity(item.id, item.talla, item.cantidad - 1)}>−</button>
                      <span>{item.cantidad}</span>
                      <button onClick={() => updateQuantity(item.id, item.talla, item.cantidad + 1)}>+</button>
                    </div>
                    <p className="cart-page__item-subtotal">{formatPrice(item.precio * item.cantidad)}</p>
                    <button className="cart-page__item-remove" onClick={() => removeFromCart(item.id, item.talla)}>✕</button>
                  </div>
                );
              })}
            </div>
            <div className="cart-page__summary">
              <h3>Resumen</h3>
              <div className="cart-page__summary-row"><span>Subtotal</span><span>{formatPrice(getTotal())}</span></div>
              <div className="cart-page__summary-row"><span>Envío</span><span>Gratis</span></div>
              <div className="cart-page__summary-total"><span>Total</span><span>{formatPrice(getTotal())}</span></div>
              <Link to="/checkout" className="btn btn-primary" style={{ width: '100%' }}>Proceder al Pago</Link>              <button className="btn btn-ghost" onClick={clearCart} style={{ width: '100%' }}>Vaciar Carrito</button>
            </div>
          </div>
        )}
      </div></section>
    </main>
  );
}
