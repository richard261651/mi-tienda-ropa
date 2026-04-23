import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('ROPITA-cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('ROPITA-cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product, talla = 'M') => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id && item.talla === talla);
      if (existing) {
        return prev.map(item =>
          item.id === product.id && item.talla === talla
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        );
      }
      return [...prev, { ...product, talla, cantidad: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id, talla) => {
    setCart(prev => prev.filter(item => !(item.id === id && item.talla === talla)));
  };

  const updateQuantity = (id, talla, cantidad) => {
    if (cantidad <= 0) {
      removeFromCart(id, talla);
      return;
    }
    setCart(prev =>
      prev.map(item =>
        item.id === id && item.talla === talla
          ? { ...item, cantidad }
          : item
      )
    );
  };

  const clearCart = () => setCart([]);

  const getTotal = () =>
    cart.reduce((total, item) => total + item.precio * item.cantidad, 0);

  const getItemCount = () =>
    cart.reduce((count, item) => count + item.cantidad, 0);

  const value = {
    cart,
    isCartOpen,
    setIsCartOpen,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotal,
    getItemCount,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
