import moment from 'moment';

export function ellipsis(text, maxLength) {
  if (!text) return text;
  return (text.length > maxLength ? `${text.slice(0, maxLength - 3)}...` : text);
}

export function timestampToSeconds(ts) {
  if (!ts) return ts;
  return ts
    .split(':')
    .reverse()
    .map(s => parseFloat(s))
    .reduce((acc, f, i) => acc + (f * (60 ** i)), 0);
}

export function timestampToMoment(ts) {
  if (!ts) return ts;
  return moment(`2015-06-24 ${ts}`); // 24 June 2015 first Crit Role episode (arbitrary date)
}

export function hoursLessThanTimestamp(ts) {
  if (!ts) return [];
  const seconds = timestampToSeconds(ts);
  const hours = Math.floor(seconds / 3600);
  return [...Array(hours)].map((x, i) => i);
}

export function minutesLessThanTimestamp(ts) {
  if (!ts) return [];
  const seconds = timestampToSeconds(ts);
  const minutes = Math.floor((seconds % 3600) / 60);
  return [...Array(minutes)].map((x, i) => i);
}

export function secondsLessThanTimestamp(ts) {
  if (!ts) return [];
  const seconds = Math.floor(timestampToSeconds(ts) % 60);
  return [...Array(seconds)].map((x, i) => i);
}
