const webPush = require('web-push');
 
const vapidKeys = {
   "publicKey": "BLqMvibVwLzWA84pOLs8uOJrAa_2fRmOOCTZg5X6Y96TwlaxmB-Iv6WBUskbBfxSiqaBrU7UqABBkjR4in89cqs",
   "privateKey": "qilnAU992r7Lsj-1YemaLB5J7zWTYZyiGqVzlnFpHCY"
};
 
 
webPush.setVapidDetails(
   'mailto:example@yourdomain.org',
   vapidKeys.publicKey,
   vapidKeys.privateKey
)
let pushSubscription = {
   "endpoint": "https://fcm.googleapis.com/fcm/send/dmb6GdpYFmU:APA91bEvNv1CjstqCzqFf3wsRAZ9sT1JzS8mavtFhL6ZeM6o59ino3MnKOfeQpWxWlfulv6YMJjBfssa_t1S5w5ChsAENNyYsAlCCpJoWR4cJ8Nnq-a4-UnnFy5UkW9exrbkGgXDdVEf",
   "keys": {
       "p256dh": "BE4WVPiEqES6kbnLoMmo3u0ZfKy8eHI8oE6ZGPF1c+BLlbPMh8FWYG7O8bVTB+m5GdjHJcNujQempIWU8Y7XWY4=",
       "auth": "xLEEJ8tgTtqUGjTJp6Zrhg=="
   }
};
const payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';
 
let options = {
   gcmAPIKey: '986175206938',
   TTL: 60
};
webPush.sendNotification(
   pushSubscription,
   payload,
   options
);