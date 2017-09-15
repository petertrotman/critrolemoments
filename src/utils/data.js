export function parseMomentsSnapshot(snapshot) {
  const data = snapshot.val() || {};
  Object.keys(data).forEach((key) => { data[key].key = key; });

  // const byId = Object.entries(data)
  //   .map(([key, val]) => [key, { ...val, key }])
  //   .reduce((acc, [key, val]) => ({ ...acc, [key]: val }), {});

  const order = [];
  snapshot.forEach((childSnapshot) => { order.push(childSnapshot.key); });
  order.reverse();

  return { byId: data, order };
}

export function paginate(array, page = 0, limit = 20) {
  return array.slice(limit * page, limit * (page + 1));
}

export function isValidMoment(moment) {
  return (moment
    && !!moment.title
    && !!moment.episode
    && !!moment.start
  );
}

