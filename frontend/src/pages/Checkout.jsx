import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import './Checkout.css';

export default function Checkout() {
  const { cart, getTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const total = getTotal();
  const formatPrice = (p) => new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(p);

  const resumen = cart.map(i => `${i.cantidad}x ${i.nombre} (${i.talla})`).join(', ');
  const mensaje = encodeURIComponent(`Hola! Quiero pagar mi pedido NUXELIT:\n${resumen}\nTotal: ${formatPrice(total)}`);
  const whatsappLink = `https://wa.me/573147535514?text=${mensaje}`;
  const nequiLink = `https://nequi.com.co/transferencia/?cuenta=3147535514&valor=${total}`;

  return (
    <main className="checkout-page">
      <section className="cart-hero"><div className="container">
        <h1 className="section-title">Portal de <span className="accent-text">Pago</span></h1>
      </div></section>
      <section className="section"><div className="container">
        <div className="checkout-box">
          <h2>Resumen de tu pedido</h2>
          <ul className="checkout-list">
            {cart.map(i => (
              <li key={`${i.id}-${i.talla}`}>
                <span>{i.cantidad}x {i.nombre} ({i.talla})</span>
                <span>{formatPrice(i.precio * i.cantidad)}</span>
              </li>
            ))}
          </ul>
          <div className="checkout-total">
            <span>Total a pagar</span>
            <span>{formatPrice(total)}</span>
          </div>
          <div className="checkout-methods">
            <h3>Elige cómo pagar</h3>
            <a href={nequiLink} target="_blank" rel="noreferrer" className="btn-pago btn-nequi">
              📱 Pagar con Nequi
            </a>
            <a href={whatsappLink} target="_blank" rel="noreferrer" className="btn-pago btn-whatsapp">
              💬 Confirmar por WhatsApp
            </a>
          </div>
          <p className="checkout-note">Después de pagar por Nequi, envíanos el comprobante por WhatsApp para confirmar tu pedido. 🙌</p>
        </div>
      </div></section>
    </main>
  );
}
