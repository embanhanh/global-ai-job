import { initializeApp, getApps, getApp } from "firebase/app";
import {
  getMessaging,
  Messaging,
  getToken,
  onMessage,
} from "firebase/messaging";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const getFCM = (): Messaging | null => {
  try {
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      return getMessaging(app);
    }
    return null;
  } catch (error) {
    console.error("FCM not supported or initialization error:", error);
    return null;
  }
};

export const requestFCMToken = async (): Promise<string | null> => {
  try {
    const messaging = getFCM();
    if (!messaging) return null;

    const token = await getToken(messaging, {
      vapidKey: process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY,
    });

    return token;
  } catch (error) {
    console.error("Error requesting FCM token:", error);
    return null;
  }
};

export const onMessageListener = () =>
  new Promise((resolve) => {
    const messaging = getFCM();
    if (!messaging) return;

    onMessage(messaging, (payload) => {
      console.log("📩 [FCM] Notification Received (Foreground):", payload);
      resolve(payload);
    });
  });
