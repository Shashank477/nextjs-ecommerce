import Layout from '../components/Layout';
import '../styles/globals.css';
import moengage from "@moengage/web-sdk";

function MyApp({ Component, pageProps }) {

    

moengage.initialize({
 app_id: 'ILHCGEFZ04ELWYTI71A01OW2', // Your App ID
 cluster: 'DC_3',
 debug_logs: 0,                      // Change to 0 when in LIVE en
});

useEffect(() => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('../public/serviceworker.js')
      .then((registration) => {
        console.log('SW registered: ', registration);
      })
      .catch((registrationError) => {
        console.log('SW registration failed: ', registrationError);
      });
  }
}, []);

MoEngage.enablePushNotifications({
  applicationServerKey: "BFhQOwzwke26ty_96cMjIBG47lnILnABuzmEmlffnnU2vFdup8QZtnPeCTt72faqylFm3yy31eGruFSYH82yI5Y" // VAPID key from your logs
});

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;