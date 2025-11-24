import Link from 'next/link';
import { useState } from 'react';
import moengage from "@moengage/web-sdk";

const ProductCard = ({ product }) => {
  const [adding, setAdding] = useState(false);

  const addToCart = (e) => {
    e.preventDefault();
    setAdding(true);
    
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    window.dispatchEvent(new Event('cartUpdated'));

    moengage.track_event("AddToCart", {
        "Product_Name": product.name, // string value
        "Price": product.price, // numeric value
    });
    
    setTimeout(() => setAdding(false), 500);
  };

  return (
    <div className="product-card">
      <Link href={`/product/${product.id}`}>
        <img src={product.image} alt={product.name} className="product-image" />
        <div className="product-info">
          <h3 className="product-name">{product.name}</h3>
          <p className="product-price">${product.price}</p>
        </div>
      </Link>
      <div style={{ padding: '0 1rem 1rem' }}>
        <button 
          onClick={addToCart} 
          className="btn btn-primary"
          style={{ width: '100%' }}
          disabled={adding}
        >
          {adding ? 'Adding...' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;