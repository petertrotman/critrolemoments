import moments from '../data/moments.json';
import styles from './styles.css';

import { ytElement } from './youtube';
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

export function momentElement(episode, moment) {
  const li = document.createElement('li');
  li.classList.add(styles.moment);
  li.innerHTML = `[${padTimestamp(moment.timestamp)}] ${moment.description}`;

  const addYtPlayer = () => {
    const width = li.getBoundingClientRect().width;
    const yt = ytElement(episode, moment, width);
    li.appendChild(yt);

    li.onclick = () => {
      yt.remove();
      li.onclick = () => addYtPlayer();
    };
  };

  li.onclick = () => addYtPlayer();
  return li;
}


export function momentsElement(episode) {
  const ul = document.createElement('ul');
  ul.classList.add(styles.moments);

  Object.values(moments)
    .filter(m => m.episodeId === episode.id)
    .sort(momentSortFn)
    .forEach(m => ul.appendChild(momentElement(episode, m)));

  return ul;
}
