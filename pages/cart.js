import { useState, useEffect } from 'react';
import ProtectedRoute from '../components/ProtectedRoute';

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const loadCart = () => {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      setCartItems(cart);
    };
    
    loadCart();
    window.addEventListener('storage', loadCart);
    
    return () => window.removeEventListener('storage', loadCart);
  }, []);

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity === 0) {
      removeItem(id);
      return;
    }
    
    const updatedCart = cartItems.map(item =>
      item.id === id ? { ...item, quantity: newQuantity } : item
    );
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const removeItem = (id) => {
    const updatedCart = cartItems.filter(item => item.id !== id);
    setCartItems(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
  };

  if (cartItems.length === 0) {
    return (
      <ProtectedRoute>
        <div className="container" style={{ textAlign: 'center', padding: '3rem 0' }}>
          <h2>Your cart is empty</h2>
          <p>Add some products to get started!</p>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <div className="container" style={{ padding: '2rem 0' }}>
        <h1>Shopping Cart</h1>
        <div style={{ background: 'white', borderRadius: '8px', marginTop: '2rem' }}>
          {cartItems.map(item => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.name} />
              <div style={{ flex: 1 }}>
                <h3>{item.name}</h3>
                <p>${item.price}</p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <input
                  type="number"
                  min="0"
                  value={item.quantity}
                  onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                  style={{ width: '60px', padding: '0.5rem' }}
                />
                <span>${(item.price * item.quantity).toFixed(2)}</span>
                <button 
                  onClick={() => removeItem(item.id)}
                  className="btn btn-danger"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="cart-summary">
          <h2>Total: ${getTotalPrice()}</h2>
          <button className="btn btn-primary" style={{ marginTop: '1rem' }}>
            Proceed to Checkout
          </button>
        </div>
      </div>
    </ProtectedRoute>
  );
}