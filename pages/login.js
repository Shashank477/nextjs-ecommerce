import { useState, useEffect } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { useRouter } from 'next/router';
import Link from 'next/link';
import moengage from "@moengage/web-sdk";

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check for registration success message
    if (router.query.message === 'registration_success') {
      setSuccess('Account created successfully! Please login to continue.');
    }
  }, [router.query]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    moengage.identifyUser(formData.email);
    moengage.track_event("login");
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, formData.email, formData.password);
      router.push('/');
    } catch (error) {
      setError('Invalid email or password');
    }
    setLoading(false);
  };

  return (
    <div className="auth-container">
      <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </div>
        {error && <div className="error">{error}</div>}
        {success && <div className="success">{success}</div>}
        <button 
          type="submit" 
          className="btn btn-primary" 
          style={{ width: '100%', marginTop: '1rem' }}
          disabled={loading}
        >
          {loading ? 'Signing In...' : 'Login'}
        </button>
      </form>
      <p style={{ textAlign: 'center', marginTop: '1rem' }}>
        Don't have an account? <Link href="/register">Register heree</Link>
      </p>
    </div>
  );
}