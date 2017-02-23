import episodes from '../data/episodes.json';
import styles from './styles.css';

import { momentsElement } from './moments';

function episodeSortFn(a, b) {
  if (a.episode === b.episode) return 0;
  const af = parseFloat(a.episode);
  const bf = parseFloat(b.episode);
  if (!isNaN(af) && isNaN(bf)) return 1;
  if (isNaN(af) && !isNaN(bf)) return -1;
  if (!isNaN(af) && !isNaN(bf)) return af > bf ? 1 : -1;
  return a.episode > b.episode ? 1 : -1;
}

export function episodeElement(episode) {
  const div = document.createElement('div');
  div.classList.add(styles.episode);

  const title = document.createElement('h3');
  const titleText = document.createElement('span');
  const momentsIndicator = document.createElement('span');
  title.appendChild(titleText);
  title.appendChild(momentsIndicator);
  div.appendChild(title);

  const moments = momentsElement(episode);
  div.appendChild(moments);

  titleText.innerHTML = `Episode ${episode.episode}: ${episode.title}`;
  momentsIndicator.innerHTML = `(${moments.nMoments})`;
  momentsIndicator.classList.add(styles.momentsIndicator);
  momentsIndicator.classList.add(styles.hidden);

  let hideMoments;
  let showMoments;
  hideMoments = () => {  // eslint-disable-line prefer-const
    moments.hide();
    momentsIndicator.classList.remove(styles.hidden);
    title.onclick = () => showMoments();
  };
  showMoments = () => {
    moments.show();
    momentsIndicator.classList.add(styles.hidden);
    title.onclick = () => hideMoments();
  };
  title.onclick = () => hideMoments();

  div.expand = () => showMoments();
  div.collapse = () => hideMoments();

  div.search = (searchText) => {
    if (titleText.innerHTML.toLowerCase().includes(searchText.toLowerCase())) {
      moments.search('');
      div.classList.remove(styles.searchHidden);
    } else {
      moments.search(searchText);
      if (moments.nMoments > 0) {
        div.classList.remove(styles.searchHidden);
      } else {
        div.classList.add(styles.searchHidden);
      }
    }
    momentsIndicator.innerHTML = `(${moments.nMoments})`;
  };

  return div;
}

export function episodesElement() {
  const div = document.createElement('div');
  div.classList.add(styles.episodes);

  const episodeDivs = [];

  const controls = document.createElement('div');
  controls.classList.add(styles.episodesControls);
  div.appendChild(controls);

  const search = document.createElement('input');
  search.classList.add(styles.search);
  search.setAttribute('type', 'text');
  search.setAttribute('placeholder', 'Search...');
  search.oninput = e => episodeDivs.forEach(d =>
    d.search(e.target.value));
  controls.appendChild(search);

  const expand = document.createElement('span');
  const collapse = document.createElement('span');
  expand.classList.add(styles.episodesControl);
  collapse.classList.add(styles.episodesControl);
  expand.innerHTML = '[+] Expand all';
  collapse.innerHTML = '[-] Collapse all';
  expand.onclick = () => episodeDivs.forEach(d => d.expand());
  collapse.onclick = () => episodeDivs.forEach(d => d.collapse());
  controls.appendChild(expand);
  controls.appendChild(collapse);

  Object.values(episodes)
    .filter(e => e.category === 'Critical Role')
    .sort(episodeSortFn)
    .forEach(e => episodeDivs.push(div.appendChild(episodeElement(e))));

  return div;
}

