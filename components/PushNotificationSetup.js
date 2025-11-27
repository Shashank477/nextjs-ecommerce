// components/PushNotificationSetup.js

import { useEffect } from 'react';

const PushNotificationSetup = () => {
  const requestPushPermission = async () => {
    if ('Notification' in window && 'serviceWorker' in navigator) {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        console.log('Push notifications enabled!');
      }
    }
  };

  return (
    <button onClick={requestPushPermission}>
      Enable Push Notifications
    </button>
  );
};

export default PushNotificationSetup;