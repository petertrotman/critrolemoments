import episodes from '../data/episodes.json';
import styles from './styles.css';

import { momentsElement } from './moments';
import { createElement } from './util';

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
  const moments = momentsElement(episode);

  const titleText = createElement('span', {}, `Episode ${episode.episode}: ${episode.title}`);
  const momentsIndicator = createElement(
    'span',
    { classList: [styles.momentsIndicator, styles.hidden] },
    `(${moments.nMoments})`,
  );
  const title = createElement('h3', {}, [titleText, momentsIndicator]);
  const div = createElement('div', { classList: [styles.episode] }, [title, moments]);

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
  const episodeDivs = Object.values(episodes)
    .filter(e => e.category === 'Critical Role')
    .sort(episodeSortFn)
    .map(e => episodeElement(e));

  const search = createElement('input', {
    classList: [styles.search],
    type: 'text',
    placeholder: 'Search...',
  });
  search.oninput = e => episodeDivs.forEach(d =>
    d.search(e.target.value));

  const expand = createElement('span', { classList: [styles.episodesControl] }, '[+] Expand all');
  const collapse = createElement('span', { classList: [styles.episodesControl] }, '[-] Collapse all');
  expand.onclick = () => episodeDivs.forEach(d => d.expand());
  collapse.onclick = () => episodeDivs.forEach(d => d.collapse());

  const expandCollapse = createElement('div', { classList: [styles.expandCollapseControls] }, [expand, collapse]);

  const controls = createElement('div', { classList: [styles.episodesControls] }, [search, expandCollapse]);
  const div = createElement('div', { classList: [styles.episodes] }, [controls, ...episodeDivs]);

  return div;
}

