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
        .reduce((acc, key) => (key in initialStarCount // Don't count moments that don't exist
          ? Object.assign(acc, { [key]: (acc[key] || 0) + 1 })
          : acc), initialStarCount))
      .then(starCounts => Promise.all(Object.keys(starCounts)
        .map(key => db.ref(`/moments/${key}/starCount`).set(starCounts[key]))
      ))
      .catch(console.error))
    .catch(console.error);
}

function changeOwner(db, event) {
  const moment = event.data.ref.parent.key;
  const previousOwner = event.data.previous.val();
  const currentOwner = event.data.current.val();
  if (previousOwner) db.ref(`/users/${previousOwner}/ownedMoments/${moment}`).set(null);
  if (currentOwner) db.ref(`/users/${currentOwner}/ownedMoments/${moment}`).set(true);
}

function changeOwnedMoment(db, momentSnapshot, set) {
  const user = momentSnapshot.val().user;
  if (!user) return null;
  return db.ref(`/users/${user}/ownedMoments/${momentSnapshot.ref.key}`).set(set);
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
exports.changeOwnedMoment = changeOwnedMoment;
