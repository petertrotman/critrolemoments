// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');
// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
const episodes = require('./episodes.js');
const moments = require('./moments.js');

admin.initializeApp(functions.config().firebase);

// // // Create and Deploy Your First Cloud Functions
// // // https://firebase.google.com/docs/functions/write-firebase-functions
// //
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   response.send('Hello from Firebase!');
// });

exports.hourly = functions.pubsub.topic('hourly-tick').onPublish(() => {
  episodes.update(admin.database());
});

exports.addStar = functions.database.ref('/users/{uid}/starredMoments/{key}')
  .onCreate(event => moments.updateStarCount(admin.database(), event.params.key, 1));

exports.removeStar = functions.database.ref('/users/{uid}/starredMoments/{key}')
  .onDelete(event => moments.updateStarCount(admin.database(), event.params.key, -1));
