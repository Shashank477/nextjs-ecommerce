import Layout from '../components/Layout';
import '../styles/globals.css';
import MoEngage from "@moengage/web-sdk";

function MyApp({ Component, pageProps }) {

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Initialize MoEngage
      MoEngage.initialize({
        app_id: "ILHCGEFZ04ELWYTI71A01OW2",
        debug_logs: 0,
        cluster: "DC_3"
      });

      // Make it globally available
      window.MoEngage = MoEngage;
      
      // Also make it available without window prefix (optional)
      if (typeof globalThis !== 'undefined') {
        globalThis.MoEngage = MoEngage;
      }

      console.log('✅ MoEngage is now available globally');
      console.log('Test access:', window.MoEngage);

      Notification.requestPermission().then(permission => {
  console.log('Permission:', permission);
  if (permission === 'granted') {
    MoEngage.onUserOptedIn();
    setTimeout(() => {
      MoEngage.getPushToken().then(token => console.log('TOKEN:', token));
    }, 3000);
  }
});
    }
  }, []);


// moengage.initialize({
//  app_id: 'ILHCGEFZ04ELWYTI71A01OW2', // Your App ID
//  cluster: 'DC_3',
//  debug_logs: 0,                      // Change to 0 when in LIVE en
// });

// useEffect(() => {
//   if ('serviceWorker' in navigator) {
//     navigator.serviceWorker.register('../public/serviceworker.js')
//       .then((registration) => {
//         console.log('SW registered: ', registration);
//       })
//       .catch((registrationError) => {
//         console.log('SW registration failed: ', registrationError);
//       });
//   }
// }, []);

// MoEngage.showNudge({
//   nudge_type: "PUSH_PROMPT"
// });

// const requestPushPermission = async () => {
//   try {
//     // Request notification permission
//     const permission = await Notification.requestPermission();
    
//     if (permission === 'granted') {
//       console.log('Push permission granted');
      
//       // Enable push in MoEngage after permission is granted
//       MoEngage.enablePushNotifications();
      
//       // You can also manually trigger token generation
//       MoEngage.getPushToken().then(token => {
//         console.log('Push token:', token);
//       }).catch(error => {
//         console.log('Error getting push token:', error);
//       });
//     } else {
//       console.log('Push permission denied');
//     }
//   } catch (error) {
//     console.log('Error requesting push permission:', error);
//   }
// };

// // Call this function when user interacts (button click, etc.)
// requestPushPermission();

// MoEngage.enablePushNotifications({
//   applicationServerKey: "BFhQOwzwke26ty_96cMjIBG47lnILnABuzmEmlffnnU2vFdup8QZtnPeCTt72faqylFm3yy31eGruFSYH82yI5Y" // VAPID key from your logs
// });

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;