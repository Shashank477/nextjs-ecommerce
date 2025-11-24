import { useRouter } from 'next/router';
import { getProductById } from '../../utils/products';
import { useState, useEffect } from 'react';
import ProtectedRoute from '../../components/ProtectedRoute';

export default function ProductPage() {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    if (id) {
      const foundProduct = getProductById(id);
      setProduct(foundProduct);
    }
  }, [id]);

  const addToCart = () => {
    setAdding(true);
    
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.push({ ...product, quantity });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    window.dispatchEvent(new Event('cartUpdated'));
    
    setTimeout(() => setAdding(false), 500);
  };

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <ProtectedRoute>
      <div className="container" style={{ padding: '2rem 0' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', maxWidth: '1000px', margin: '0 auto' }}>
          <div>
            <img 
              src={product.image} 
              alt={product.name} 
              style={{ width: '100%', borderRadius: '8px' }}
            />
          </div>
          <div>
            <h1>{product.name}</h1>
            <p style={{ fontSize: '2rem', color: '#007bff', margin: '1rem 0', fontWeight: 'bold' }}>
              ${product.price}
            </p>
            <p style={{ marginBottom: '2rem', lineHeight: '1.6' }}>
              {product.description}
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
              <label>Quantity:</label>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value))}
                style={{ width: '80px', padding: '0.5rem' }}
              />
            </div>
            <button 
              onClick={addToCart}
              className="btn btn-primary"
              style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}
              disabled={adding}
            >
              {adding ? 'Adding to Cart...' : 'Add to Cart'}
            </button>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}