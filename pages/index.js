import { products } from '../utils/products';
import ProductCard from '../components/ProductCard';
import ProtectedRoute from '../components/ProtectedRoute';

export default function Home() {
  return (
    <ProtectedRoute>
      <div className="container">
        <h1 style={{ textAlign: 'center', margin: '2rem 0' }}>Our Products</h1>
        <div className="products-grid">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </ProtectedRoute>
  );
}