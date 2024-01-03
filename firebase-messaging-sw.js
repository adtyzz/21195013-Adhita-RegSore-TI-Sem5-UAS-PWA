importScripts("https://www.gstatic.com/firebasejs/9.14.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.14.0/firebase-messaging-compat.js");

const firebaseConfig = {
  apiKey: "AIzaSyCY6iDIligUnXVfx5BeQMwmPGNtfD_UPrk",
  authDomain: "aditpwa-a0f92.firebaseapp.com",
  projectId: "aditpwa-a0f92",
  storageBucket: "aditpwa-a0f92.appspot.com",
  messagingSenderId: "849942794121",
  appId: "1:849942794121:web:dfcd229df61128724a9b58",
};

const app = firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

// Optional: Add an event listener to handle background messages
self.addEventListener("push", (event) => {
  const payload = event.data.json();
  const options = {
    body: payload.notification.body,
    icon: payload.notification.icon,
  };

  self.registration.showNotification(payload.notification.title, options);
});
