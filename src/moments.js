import moments from '../data/moments.json';
import styles from './styles.css';

import { parseTimestamp, padTimestamp } from './util';


function momentSortFn(a, b) {
  const tsa = parseTimestamp(a.timestamp);
  const tsb = parseTimestamp(b.timestamp);

  /* eslint-disable no-mixed-operators */
  const seca = tsa.h * 3600 + tsa.m * 60 + tsa.s;
  const secb = tsb.h * 3600 + tsb.m * 60 + tsb.s;
  /* eslint-enable no-mixed-operators */

  if (seca === secb) return 0;
  return seca > secb ? 1 : -1;
}

export function momentElement(moment) {
  const li = document.createElement('li');
  li.classList.add(styles.moment);
  li.innerHTML = `[${padTimestamp(moment.timestamp)}] ${moment.description}`;
  return li;
}


export function momentsElement(episode) {
  const ul = document.createElement('ul');
  ul.classList.add(styles.momentList);

  Object.values(moments)
    .filter(m => m.episodeId === episode.id)
    .sort(momentSortFn)
    .forEach(m => ul.appendChild(momentElement(m)));

  return ul;
}
