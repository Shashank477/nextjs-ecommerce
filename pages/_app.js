import Layout from '../components/Layout';
import '../styles/globals.css';
import { moe } from '@moengage/web-sdk';




function MyApp({ Component, pageProps }) {

  const initializeMoEngage = () => {
  if (typeof window !== 'undefined') {
    window.Moengage = moe({
      app_id: 'ILHCGEFZ04ELWYTI71A01OW2', // Replace with your actual app ID
      debug_logs: 0, // Set to 0 in production
      swPath: '/serviceworker.js', // Path to your service worker
      // swScope: '/', // Uncomment if you need custom scope
    });
  }
};

  useEffect(() => {
    initializeMoEngage();
  }, []);

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;