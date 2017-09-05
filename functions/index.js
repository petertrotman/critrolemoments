// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');
// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
const episodes = require('./episodes.js');
const moments = require('./moments.js');
const indexes = require('./indexes.js');

admin.initializeApp(functions.config().firebase);

exports.tenMinutely = functions.pubsub.topic('ten-minutely-tick').onPublish(() => {
  moments.reconcileStarCount(admin.database());
  indexes.indexMoments(admin.database());
});

exports.hourly = functions.pubsub.topic('hourly-tick').onPublish(() => {
  episodes.update(admin.database(), functions.config().youtube.key);
});

// exports.addStar = functions.database.ref('/users/{uid}/starredMoments/{key}')
//   .onCreate(event => moments.updateStarCount(admin.database(), event.params.key, 1));

// exports.removeStar = functions.database.ref('/users/{uid}/starredMoments/{key}')
//   .onDelete(event => moments.updateStarCount(admin.database(), event.params.key, -1));
