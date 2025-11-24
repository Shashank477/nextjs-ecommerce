import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  // Replace with your Firebase config
  apiKey: "AIzaSyDBnSQyoJjyQPHfoelDX66u11lKGGScvHI",
  authDomain: "ecom-nextapp.firebaseapp.com",
  projectId: "ecom-nextapp",
  storageBucket: "ecom-nextapp.firebasestorage.app",
  messagingSenderId: "389042430898",
  appId: "1:389042430898:web:bf600e45c5f61e5602faab",
  measurementId: "G-TKDHH0FMZX"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;