import { useState } from 'react';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { useRouter } from 'next/router';
import Link from 'next/link';
import moengage from "@moengage/web-sdk";

export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
         console.log(formData.email)
    moengage.identifyUser(formData.email)
           .then(() => {
               moengage.add_email(formData.email);
               moengage.add_user_name(formData.name);
               moengage.add_mobile(formData.phone);
           });

    moengage.track_event("Registration");
      const userCredential = await createUserWithEmailAndPassword(
        auth, 
        formData.email, 
        formData.password
      );
      
      await updateProfile(userCredential.user, {
        displayName: formData.name
      });

      // Store additional user info in localStorage
      localStorage.setItem('userInfo', JSON.stringify({
        name: formData.name,
        phone: formData.phone,
        email: formData.email
      }));

      // Sign out the user immediately after registration
      await auth.signOut();

      // Show success message
      setSuccess('Account created successfully! Please login to continue.');
      
      // Clear the form
      setFormData({
        name: '',
        phone: '',
        email: '',
        password: ''
      });

      // Redirect to login page after 2 seconds
      setTimeout(() => {
        router.push('/login');
      }, 2000);

    } catch (error) {
      setError(error.message);
    }
    setLoading(false);
  };

  return (
    <div className="auth-container">
      <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </div>
        <div className="form-group">
          <label>Phone</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            disabled={loading}
          />
        </div>
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
            minLength="6"
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
          {loading ? 'Creating Account...' : 'Register'}
        </button>
      </form>
      <p style={{ textAlign: 'center', marginTop: '1rem' }}>
        Already have an account? <Link href="/login">Login here</Link>
      </p>
    </div>
  );
}