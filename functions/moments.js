/* eslint no-console: ["error", { allow: ["error"] }] */
/* eslint-disable comma-dangle */

function updateStarCount(db, key, updateCount) {
  const ref = db.ref(`/moments/${key}/starCount`);
  return ref
    .once('value')
    .then((snapshot) => {
      const newCount = (snapshot.val() || 0) + updateCount;
      return ref.set(newCount);
    });
}

function reconcileStarCounts(db) {
  return db.ref('/moments').once('value')
    .then(snapshot => snapshot.val())
    .then(momentObjects => Object.keys(momentObjects))
    .then(keys => keys.reduce((acc, key) => Object.assign(acc, { [key]: 0 }), {}))
    .then(initialStarCount => db.ref('/users').once('value')
      .then(snapshot => snapshot.val())
      .then(usersObject => Object.keys(usersObject).map(key => usersObject[key]))
      .then(users => users.map(user => user.starredMoments || {}))
      .then(starredMomentsObjects => starredMomentsObjects.map(Object.keys))
      .then(starredMomentsLists => starredMomentsLists
        .reduce((acc, momentsList) => acc.concat(momentsList), []))
      .then(starredMoments => starredMoments
        .reduce((acc, key) =>
          Object.assign(acc, { [key]: (acc[key] || 0) + 1 }), initialStarCount))
      .then(starCounts => Promise.all(Object.keys(starCounts)
        .map(key => db.ref(`/moments/${key}/starCount`).set(starCounts[key]))
      ))
      .catch(console.error))
    .catch(console.error);
}

function changeOwner(db, delta) {
  const moment = delta.ref.parent.key;
  const previousOwner = delta.previous;
  const currentOwner = delta.current;
  if (previousOwner) db.ref(`/users/${previousOwner}/ownedMoments/${moment}`).set(false);
  if (currentOwner) db.ref(`/users/${currentOwner}/ownedMoments/${moment}`).set(true);
}

function reconcileOwners(db) {
  return db.ref('/moments').once('value')
    .then(snapshot => snapshot.val())
    .then(momentObjects => Object.keys(momentObjects).map(key => [key, momentObjects[key]]))
    .then(entries => entries.reduce((acc, [key, moment]) => {
      if (!moment.user) return acc;
      if (!acc[moment.user]) acc[moment.user] = {};
      acc[moment.user][key] = true;
      return acc;
    }, {}))
    .then((momentsByOwner) => {
      db.ref('/users').once('value').then(ss =>
        ss.forEach(child => child.ref.update({ ownedMoments: momentsByOwner[child.key] || {} })));
    });
}


exports.updateStarCount = updateStarCount;
exports.reconcileStarCounts = reconcileStarCounts;
exports.changeOwner = changeOwner;
exports.reconcileOwners = reconcileOwners;
