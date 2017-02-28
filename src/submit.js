import firebase from 'firebase';
import 'firebase/database';

import episodes from '../data/episodes.json';
import styles from './styles.css';

// import { episodeSortFn } from './episodes';
import { createElement, parseTimestamp } from './util';

export function submitElement() {
  const selectLabel = document.createElement('label');
  selectLabel.innerHTML = 'Episode:';

  const selectOptions = Object.values(episodes)
    .filter(e => e.category === 'Critical Role')
    .sort((a, b) => (parseInt(a.order, 10) > parseInt(b.order, 10) ? 1 : -1))
    .map((e, i) => createElement('option', { value: e.id, selected: (i === 0) }, `${e.episode}: ${e.title}`));

  const select = createElement('select', { classList: [styles.submitSelect] }, [...selectOptions]);

  const timestampLabel = createElement('label', {}, 'Timestamp:');
  const timestampHour = createElement('input', { type: 'number', min: 0, max: 10 });
  const timestampMinute = createElement('input', { type: 'number', min: 0, max: 59 });
  const timestampSecond = createElement('input', { type: 'number', min: 0, max: 59 });
  const timestampItems = createElement('fieldset', { classList: [styles.submitTimestampItems] }, [
    timestampHour,
    createElement('label', {}, 'h'),
    timestampMinute,
    createElement('label', {}, 'm'),
    timestampSecond,
    createElement('label', {}, 's'),
  ]);

  const descriptionLabel = createElement('label', {}, 'Description: (140 characters)');
  const description = createElement('textarea', { maxlength: 140 });

  const creditLabel = createElement('label', {}, 'Credit: (how would you like to be referred to in the credits?)');
  const credit = createElement('input', { type: 'text', maxlength: 50 });

  const submit = createElement('button', {}, 'Submit');

  const error = createElement('p', { style: 'color: red;' });
  const success = createElement('p', { style: 'color: green;' });

  const submitOnClick = (e) => {
    e.preventDefault();
    submit.onclick = null;
    submit.setAttribute('disabled', true);

    try {
      error.innerHTML = '';
      success.innerHTML = '';
      const episode = selectOptions[select.selectedIndex];
      const ts = parseTimestamp(
        `${timestampHour.value}:${timestampMinute.value}:${timestampSecond.value}`,
      );

      const database = firebase.database();
      const pushKey = database.ref('submitted').push().key;
      database.ref(`submitted/${pushKey}`).set({
        episodeId: episode.id,
        timestamp: `${ts.h}:${ts.m}:${ts.s}`,
        description: description.value,
        source: credit.value,
      }).then(() => {
        success.innerHTML =
          `<p>
            Thank you! Your moment has been recorded and we will review and include it in the next few days :-)
          </p>`;

        setTimeout(() => window.location.reload(), 7000);
      });
    } catch (err) {
      success.innerHTML = '';
      error.innerHTML = 'An error occurred - please ensure all fields are filled out correctly.';
      submit.onclick = (event => submitOnClick(event));
      submit.removeAttribute('disabled');
      throw err;
    }
  };

  submit.onclick = (e => submitOnClick(e));

  const form = createElement('form', { classList: [styles.submitForm] }, [
    selectLabel,
    select,
    timestampLabel,
    timestampItems,
    descriptionLabel,
    description,
    creditLabel,
    credit,
    error,
    success,
    submit,
  ]);

  const div = createElement('div', { classList: [styles.submit] }, [
    createElement('h2', {}, 'Submit your moment'),
    createElement('div', {}, '<p>I know this looks super basic but it works for now.</p>'),
    form,
    createElement('a', { href: '/#' }, '< Back to the Moments'),
  ]);

  return div;
}
