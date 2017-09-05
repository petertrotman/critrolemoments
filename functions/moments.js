function updateStarCount(db, key, updateCount) {
  const ref = db.ref(`/moments/${key}/starCount`);
  return ref
    .once('value')
    .then((snapshot) => {
      const newCount = (snapshot.val() || 0) + updateCount;
      return ref.set(newCount);
    });
}

function reconcileStarCount(db) {
  const starCounts = {};

  db.ref('/users').once('value').then((users) => {
    users.forEach((user) => {
      Object.keys(user.val().starredMoments).forEach((key) => {
        starCounts[key] = (starCounts[key] || 0) + 1;
      });
    });
  });

  db.ref('/moments').once('value').then((moments) => {
    moments.forEach((moment) => {
      moment.ref.child('starCount').set(starCounts[moment.key] || 0);
    });
  });
}

exports.updateStarCount = updateStarCount;
exports.reconcileStarCount = reconcileStarCount;
