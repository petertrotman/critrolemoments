function updateStarCount(db, key, updateCount) {
  const ref = db.ref(`/moments/${key}/starCount`);
  return ref
    .once('value')
    .then((snapshot) => {
      const newCount = (snapshot.val() || 0) + updateCount;
      return ref.set(newCount);
    });
}

exports.updateStarCount = updateStarCount;
