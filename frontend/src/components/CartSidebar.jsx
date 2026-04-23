import { useCart } from '../context/CartContext';
import './CartSidebar.css';

const API_URL = 'http://localhost:3001';

export default function CartSidebar() {
  const { cart, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, getTotal, clearCart } = useCart();

  const formatPrice = (p) =>
    new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(p);

  if (!isCartOpen) return null;

  return (
    <>
      <div className="cart-overlay" onClick={() => setIsCartOpen(false)} />
      <div className="cart-sidebar">
        <div className="cart-sidebar__header">
          <h2>Tu Carrito</h2>
          <button className="cart-sidebar__close" onClick={() => setIsCartOpen(false)}>✕</button>
        </div>

        {cart.length === 0 ? (
          <div className="cart-sidebar__empty">
            <span style={{fontSize:'3rem'}}>🛒</span>
            <p>Tu carrito está vacío</p>
            <button className="btn btn-outline" onClick={() => setIsCartOpen(false)}>Explorar Catálogo</button>
          </div>
        ) : (
          <>
            <div className="cart-sidebar__items">
              {cart.map(item => {
                const imgSrc = item.imagen ? (item.imagen.startsWith('http') ? item.imagen : `${API_URL}${item.imagen}`) : null;
                return (
                  <div key={`${item.id}-${item.talla}`} className="cart-item">
                    <div className="cart-item__img">
                      {imgSrc ? <img src={imgSrc} alt={item.nombre} /> : <div className="placeholder-img"><span>📷</span></div>}
                    </div>
                    <div className="cart-item__info">
                      <h4>{item.nombre}</h4>
                      <p className="cart-item__meta">Talla: {item.talla}</p>
                      <p className="cart-item__price">{formatPrice(item.precio)}</p>
                      <div className="cart-item__qty">
                        <button onClick={() => updateQuantity(item.id, item.talla, item.cantidad - 1)}>−</button>
                        <span>{item.cantidad}</span>
                        <button onClick={() => updateQuantity(item.id, item.talla, item.cantidad + 1)}>+</button>
                      </div>
                    </div>
                    <button className="cart-item__remove" onClick={() => removeFromCart(item.id, item.talla)}>✕</button>
                  </div>
                );
              })}
            </div>
            <div className="cart-sidebar__footer">
              <div className="cart-sidebar__total">
                <span>Total</span>
                <span className="cart-sidebar__total-price">{formatPrice(getTotal())}</span>
              </div>
              <button className="btn btn-primary cart-sidebar__checkout">Proceder al Pago</button>
              <button className="btn btn-ghost" onClick={clearCart}>Vaciar Carrito</button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
