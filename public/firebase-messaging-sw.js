importScripts(
  "https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js",
);
importScripts(
  "https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js",
);

// Replace with your Firebase project config if needed, or it will be populated via web app
const firebaseConfig = {
  apiKey: "AIzaSyDxebfzvdJWG1Ai4VaI3auHBNGzH1jR3zk",
  authDomain: "global-ai-415d3.firebaseapp.com",
  projectId: "global-ai-415d3",
  storageBucket: "global-ai-415d3.firebasestorage.app",
  messagingSenderId: "968955227557",
  appId: "1:968955227557:web:cfcc63aca02bc09eba8c4c",
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload,
  );

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: "/icon-192x192.png", // Ensure this icon exists or use a generic one
    data: payload.data,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
