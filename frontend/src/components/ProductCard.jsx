import { useState } from 'react';
import { useCart } from '../context/CartContext';
import './ProductCard.css';

const API_URL = 'https://mi-tienda-ropa-1.onrender.com';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const [selectedTalla, setSelectedTalla] = useState(product.tallas?.[0] || 'M');
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addToCart(product, selectedTalla);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const formatPrice = (price) =>
    new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0 }).format(price);

  const imgSrc = product.imagen
    ? (product.imagen.startsWith('http') ? product.imagen : `${API_URL}${product.imagen}`)
    : null;

  return (
    <div className="product-card">
      <div className="product-card__img-wrap">
        {imgSrc ? (
          <img src={imgSrc} alt={product.nombre} loading="lazy" />
        ) : (
          <div className="placeholder-img">
            <span>📷 Sin imagen</span>
          </div>
        )}
        <div className="product-card__overlay">
          <button
            className={`btn btn-primary product-card__buy ${added ? 'added' : ''}`}
            onClick={handleAdd}
          >
            {added ? '✓ Agregado' : 'Agregar al Carrito'}
          </button>
        </div>
        {product.destacado && <span className="product-card__badge">Destacado</span>}
      </div>

      <div className="product-card__info">
        <p className="product-card__category">{product.categoria}</p>
        <h3 className="product-card__name">{product.nombre}</h3>
        <div className="product-card__bottom">
          <span className="product-card__price">{formatPrice(product.precio)}</span>
          {product.tallas && product.tallas.length > 1 && (
            <div className="product-card__tallas">
              {product.tallas.map(t => (
                <button
                  key={t}
                  className={`talla-btn ${selectedTalla === t ? 'active' : ''}`}
                  onClick={() => setSelectedTalla(t)}
                >
                  {t}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
