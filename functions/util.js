const functions = require('firebase-functions');

/* eslint-disable no-restricted-properties */
function timestampToSeconds(ts) {
  if (!ts) return ts;
  return ts
    .split(':')
    .reverse()
    .map(s => parseFloat(s))
    .reduce((acc, f, i) => acc + (f * Math.pow(60, i)), 0);
}
/* eslint-enable no-restricted-properties */

function isValidRequest(req) {
  return req.get('x-secretkey') === functions.config().secret.key;
}

function cronFunction(fn) {
  return functions.https.onRequest((req, res) => {
    if (!isValidRequest(req)) {
      res.status(403).send('Forbidden');
      return;
    }

    fn();

    res.status(200).send('OK');
  });
}

exports.timestampToSeconds = timestampToSeconds;
exports.isValidRequest = isValidRequest;
exports.cronFunction = cronFunction;
