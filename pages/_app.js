import Layout from '../components/Layout';
import '../styles/globals.css';
import moengage from "@moengage/web-sdk";

function MyApp({ Component, pageProps }) {

    

moengage.initialize({
 app_id: 'ILHCGEFZ04ELWYTI71A01OW2', // Your App ID
 cluster: 'DC_3',
 debug_logs: 1,                      // Change to 0 when in LIVE en
 swPath: "/serviceworker.js"
});

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;