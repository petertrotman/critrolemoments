import PropTypes from 'prop-types';

export function parseMomentsSnapshot(snapshot) {
  const data = snapshot.val() || {};
  Object.keys(data).forEach((key) => { data[key].key = key; });

  // const byId = Object.entries(data)
  //   .map(([key, val]) => [key, { ...val, key }])
  //   .reduce((acc, [key, val]) => ({ ...acc, [key]: val }), {});

  const order = [];
  snapshot.forEach((childSnapshot) => { order.push(childSnapshot.key); });

  return { byId: data, order };
}

export const momentType = PropTypes.shape({
  key: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  starCount: PropTypes.number.isRequired,
  starredBy: PropTypes.shape({}),
  episode: PropTypes.string.isRequired,
  start: PropTypes.string.isRequired,
  timestamp: PropTypes.number,
  end: PropTypes.string,
  user: PropTypes.string,
});

export function timestampToSeconds(ts) {
  if (!ts) return ts;
  return ts
    .split(':')
    .reverse()
    .map(s => parseFloat(s))
    .reduce((acc, f, i) => acc + (f * (60 ** i)), 0);
}
