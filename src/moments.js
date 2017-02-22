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

  const text = document.createElement('span');
  text.classList.add(styles.momentText);
  text.innerHTML =
    `<span class="${styles.momentTimestamp}">
      [${padTimestamp(moment.timestamp)}]
    </span>${moment.description}`;
  li.appendChild(text);

  const addYtPlayer = () => {
    const width = li.getBoundingClientRect().width;
    const yt = ytElement(episode, moment, width);
    li.appendChild(yt);

    text.onclick = () => {
      yt.remove();
      text.onclick = () => addYtPlayer();
    };
  };

  text.onclick = () => addYtPlayer();

  li.search = (searchText) => {
    if (moment.description.toLowerCase().includes(searchText.toLowerCase())) {
      li.classList.remove(styles.searchHidden);
      return 1;
    } else {  // eslint-disable-line no-else-return
      li.classList.add(styles.searchHidden);
      return 0;
    }
  };

  return li;
}


export function momentsElement(episode) {
  const ul = document.createElement('ul');
  ul.classList.add(styles.moments);

  const momentItems = [];

  Object.values(moments)
    .filter(m => m.episodeId === episode.id)
    .sort(momentSortFn)
    .forEach(m => momentItems.push(ul.appendChild(momentElement(episode, m))));

  ul.search = (searchText) => {
    let nMoments = 0;
    momentItems.forEach((m) => {
      nMoments += m.search(searchText);
      return null;
    });
    return nMoments;
  };

  return ul;
}
