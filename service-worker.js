// service-worker.js

// Nama cache Anda
var cacheName = 'ahmad mifta-pwa-v1';

// Daftar sumber daya yang ingin Anda cache
var filesToCache = [
    '/',
    '/index.html',
    '/service-worker.js',
    '/manifest.json',
    '/css/aos.css',
    '/css/bootstrap.min.css',
    '/css/main.css',
    '/images/android-chrome-512x512.png',
    '/images/ahmad.jpg',
    '/images/cc-bg-1.jpg',
    '/images/favicon-192.png',
    '/images/favicon-256.png',
    '/images/favicon-384.png',
    '/images/staticmap.png',
    '/js/aos.js',
    '/js/now-ui-kit.js',
    '/js/core/bootstrap.min.js',
    '/js/core/jquery.3.2.1.min.js',
    '/js/core/popper.min.js',
    '/js/plugins/bootstrap-datepicker.js',
    '/js/plugins/bootstrap-switch.js',
    '/js/plugins/jquery.sharrre.js',
    '/js/plugins/nouislider.min.js',
    '/scripts/main.js',
];

// Instalasi Service Worker
self.addEventListener('install', evt => {
    evt.waitUntil(
        caches.open(cacheName).then(function(cache) {
            return cache.addAll(filesToCache);
        })
    );
});

// Aktivasi Service Worker
self.addEventListener('activate', evt => {

});

// Fetching sumber daya dari cache atau jaringan
// self.addEventListener('fetch', evt => {
//     evt.respondWith(
//         caches.match(evt.request).then(cacheRes => {
//             // Menggunakan sumber daya dari cache jika ada
//             return cacheRes || fetch(evt.request);
//         })
//     );
// });

self.addEventListener('fetch', function(event) {
    event.respondWith(
      fetch(event.request)
        .then(function(response) {
          // Data berhasil diambil dari jaringan, cache data tersebut
          if (response.status === 200) {
            const responseClone = response.clone();
            caches.open('my-cache').then(function(cache) {
              cache.put(event.request, responseClone);
            });
          }
          return response;
        })
        .catch(function() {
          // Jika gagal mengambil data dari jaringan, coba ambil dari cache
          return caches.match(event.request);
   })
  );
  });

  self.addEventListener('push', function(event) {
    if (self.Notification.permission === 'granted') {
      // Izin notifikasi telah diberikan, Anda dapat menampilkan pemberitahuan
      const options = {
        body: 'Pan kenalan Boss??',
        icon: '/images/ahmad.jpg',
        actions: [
          { action: 'yes', title: 'Yes' },
          { action: 'no', title: 'No' }
        ],
        data: {
          senderId: '12345',
          messageId: '67890'
        },
        silent: true,
        timestamp: Date.now()
      };
      
  
      event.waitUntil(
        self.registration.showNotification('Notif', options)
      );
    } else {
      // Izin notifikasi tidak diberikan
    }
  });
  
  self.addEventListener('notificationclick', function(event) {
    event.notification.close();
  
    if (event.action === 'yes') {
      // Tindakan "Ya" diambil
      // Menampilkan notifikasi dengan ucapan "Anda memilih Ya"
      self.registration.showNotification('Matur suwun Boss', {
        body: 'di lanjut Boss',
        icon: '/images/ahmad.jpg'
      });
    } else if (event.action === 'no') {
      // Tindakan "Tidak" diambil
      // Menampilkan notifikasi dengan ucapan "Anda memilih Tidak"
      self.registration.showNotification('Duh pimen Boss', {
        body: 'Ora tertarik Boss',
        icon: '/images/ahmad.jpg'
      });
    } else {
      // Notifikasi di-klik tanpa memilih tindakan apa pun
      // Lakukan sesuatu ketika notifikasi di-klik tanpa memilih "Ya" atau "Tidak"
      console.log('Anda mengklik notifikasi');
    }
  });