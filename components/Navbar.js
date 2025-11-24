import Link from 'next/link';
import { useAuth } from '../hooks/useAuth';
import { signOut } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { useEffect, useState } from 'react';
import moengage from "@moengage/web-sdk";

const Navbar = () => {
  const { user, loading } = useAuth();
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
      setCartCount(totalItems);
    };

    updateCartCount();
    window.addEventListener('storage', updateCartCount);
    window.addEventListener('cartUpdated', updateCartCount);

    return () => {
      window.removeEventListener('storage', updateCartCount);
      window.removeEventListener('cartUpdated', updateCartCount);
    };
  }, []);

  const handleLogout = async () => {
    try {
    moengage.destroy_session();
    console.log("Destroyed session");
      await signOut(auth);
      localStorage.removeItem('cart');
      setCartCount(0);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <nav className="navbar">
      <div className="container">
        <div className="nav-content">
          <Link href="/" className="logo">
            E-Shop
          </Link>
          <div className="nav-links">
            {user ? (
              <>
                <span>Welcome, {user.displayName || user.email}</span>
                <Link href="/cart">Cart ({cartCount})</Link>
                <button onClick={handleLogout} className="btn btn-secondary">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login">Login</Link>
                <Link href="/register">Register</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;