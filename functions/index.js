
// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');
// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
const episodes = require('./episodes.js');
const moments = require('./moments.js');
const indexes = require('./indexes.js');
const util = require('./util.js');

admin.initializeApp(functions.config().firebase);

exports.tenminutely = util.cronFunction(() =>
  Promise.all([
    moments.reconcileStarCounts(admin.database()),
    moments.reconcileOwners(admin.database()),
  ])
    .then(() => indexes.indexMoments(admin.database())) // eslint-disable-line comma-dangle
);

exports.hourly = util.cronFunction(() => {
  episodes.update(admin.database(), functions.config().youtube.key)
    .then(() => indexes.indexEpisodes(admin.database()));
});

exports.addStar = functions.database.ref('/users/{uid}/starredMoments/{key}')
  .onCreate(event => moments.updateStarCount(admin.database(), event.params.key, 1));

exports.removeStar = functions.database.ref('/users/{uid}/starredMoments/{key}')
  .onDelete(event => moments.updateStarCount(admin.database(), event.params.key, -1));

exports.changeOwner = functions.database.ref('/moments/{key}/user')
  .onUpdate(event => moments.changeOwner(admin.database(), event));

exports.deleteMoment = functions.database.ref('/moments/{key}')
  .onDelete(event => Promise.all([
    indexes.removeMoment(admin.database(), event.params.key),
    moments.changeOwnedMoment(admin.database(), event.data.previous, null),
  ]));

exports.createMoment = functions.database.ref('/moments/{key}')
  .onCreate(event =>
    moments.changeOwnedMoment(admin.database(), event.data.current, true)
      .then(() => indexes.indexMoments(admin.database())));
