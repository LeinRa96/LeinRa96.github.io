// REGISTER SERVICE WORKER
if ("serviceWorker" in navigator) {
    window.addEventListener("load", function() {
      navigator.serviceWorker
        .register("/service-worker.js")
        .then(function() {
          console.log("Pendaftaran ServiceWorker berhasil");
        })
        .catch(function() {
          console.log("Pendaftaran ServiceWorker gagal");
        });
    });
  } else {
    console.log("ServiceWorker belum didukung browser ini.");
  }

  document.addEventListener("DOMContentLoaded", function() {
    const urlParams = new URLSearchParams(window.location.search);
    const isFromSaved = urlParams.get("saved");
    const btnSave = document.getElementById("save");
    const btnDel = document.getElementById("delete");
    if (isFromSaved) {
      // Hide fab jika dimuat dari indexed db
      btnSave.style.display = 'none';
      getSavedTeamById();
    } else {
      btnDel.style.display = 'none';
      var item = getTeamById();
    }
    
    btnSave.onclick = function() {
      console.log("Tombol FAB oranye di klik.");
      item.then(function(team) {
        saveForLater(team);
      });
    };

    const teamId = new URLSearchParams(window.location.search).get("id");
    btnDel.onclick = function() {
      console.log("Tombol FAB abu-abu di klik.");
      deleteById(parseInt(teamId));
    };
  });

  // Periksa fitur Notification API
  if ("Notification" in window) {
    requestPermission();
  } else {
    console.error("Browser tidak mendukung notifikasi.");
  }

  // Meminta ijin menggunakan Notification API
  function requestPermission() {
    if ('Notification' in window) {
      Notification.requestPermission().then(function (result) {
        if (result === "denied") {
          console.log("Fitur notifikasi tidak diijinkan.");
          return;
        } else if (result === "default") {
          console.error("Pengguna menutup kotak dialog permintaan ijin.");
          return;
        }
        if (('PushManager' in window)) {
          navigator.serviceWorker.getRegistration().then(function(registration) {
            registration.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: urlBase64ToUint8Array("BLqMvibVwLzWA84pOLs8uOJrAa_2fRmOOCTZg5X6Y96TwlaxmB-Iv6WBUskbBfxSiqaBrU7UqABBkjR4in89cqs")
            }).then(function(subscribe) {
                console.log('Berhasil melakukan subscribe dengan endpoint: ', subscribe.endpoint);
                console.log('Berhasil melakukan subscribe dengan p256dh key: ', btoa(String.fromCharCode.apply(
                    null, new Uint8Array(subscribe.getKey('p256dh')))));
                console.log('Berhasil melakukan subscribe dengan auth key: ', btoa(String.fromCharCode.apply(
                    null, new Uint8Array(subscribe.getKey('auth')))));
            }).catch(function(e) {
                console.error('Tidak dapat melakukan subscribe ', e.message);
            });
          });
        }
      });
    }
  }

  function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/-/g, '+')
        .replace(/_/g, '/');
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }

  function showNotifikasiSimpan() {
      const title = 'Notifikasi Penyimpanan Data Tim';
      const options = {
          'body': 'Tim yang dipilih berhasil disimpan!',
          'icon': '/icon-192x192.png'
      }
      if (Notification.permission === 'granted') {
          navigator.serviceWorker.ready.then(function(registration) {
              registration.showNotification(title, options);
          });
      } else {
          console.error('FItur notifikasi tidak diijinkan.');
      }
  }

  function showNotifikasiHapus() {
      const title = 'Notifikasi Penghapusan Data Tim';
      const options = {
          'body': 'Tim yang dipilih telah dihapus!',
          'icon': '/icon-192x192.png'
      }
      if (Notification.permission === 'granted') {
          navigator.serviceWorker.ready.then(function(registration) {
              registration.showNotification(title, options);
          });
      } else {
          console.error('FItur notifikasi tidak diijinkan.');
      }
  }