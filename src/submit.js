import firebase from 'firebase';
import 'firebase/database';

import episodes from '../data/episodes.json';
import styles from './styles.css';

import { episodeSortFn } from './episodes';
import { parseTimestamp } from './util';

export function submitElement() {
  const div = document.createElement('div');
  div.classList.add(styles.submit);

  const header = document.createElement('h2');
  header.innerHTML = 'Submit your moment';
  div.appendChild(header);

  const subHeader = document.createElement('div');
  subHeader.innerHTML = '<p>I know this looks super basic but it works for now.</p><p>To return to the episodes, refresh the page! (Top UX dev here)</p>';
  div.appendChild(subHeader);

  const form = document.createElement('form');
  form.classList.add(styles.submitForm);

  const selectLabel = document.createElement('label');
  selectLabel.innerHTML = 'Episode:';
  const select = document.createElement('select');
  select.classList.add(styles.submitSelect);

  const selectOptions = Object.values(episodes)
    .filter(e => e.category === 'Critical Role')
    .sort((a, b) => (parseInt(a.order, 10) > parseInt(b.order, 10) ? 1 : -1));

  selectOptions
    .forEach((e, i) => {
      const option = document.createElement('option');
      option.setAttribute('value', e.id);
      if (i === 0) option.setAttribute('selected', true);
      option.innerHTML = `${e.episode}: ${e.title}`;
      select.appendChild(option);
    });

  const timestampLabel = document.createElement('label');
  timestampLabel.innerHTML = 'Timestamp:';
  const timestampItems = document.createElement('fieldset');
  timestampItems.classList.add(styles.submitTimestampItems);
  const timestampHour = document.createElement('input');
  timestampHour.setAttribute('type', 'number');
  timestampHour.setAttribute('min', 0);
  timestampHour.setAttribute('max', 10);
  const timestampMinute = document.createElement('input');
  timestampMinute.setAttribute('type', 'number');
  timestampMinute.setAttribute('min', 0);
  timestampMinute.setAttribute('max', 59);
  const timestampSecond = document.createElement('input');
  timestampSecond.setAttribute('type', 'number');
  timestampSecond.setAttribute('min', 0);
  timestampSecond.setAttribute('max', 59);
  const timestampHourLabel = document.createElement('label');
  timestampHourLabel.innerHTML = 'h';
  const timestampMinuteLabel = document.createElement('label');
  timestampMinuteLabel.innerHTML = 'm';
  const timestampSecondLabel = document.createElement('label');
  timestampSecondLabel.innerHTML = 's';
  timestampItems.appendChild(timestampHour);
  timestampItems.appendChild(timestampHourLabel);
  timestampItems.appendChild(timestampMinute);
  timestampItems.appendChild(timestampMinuteLabel);
  timestampItems.appendChild(timestampSecond);
  timestampItems.appendChild(timestampSecondLabel);

  const descriptionLabel = document.createElement('label');
  descriptionLabel.innerHTML = 'Description: (140 characters)';
  const description = document.createElement('textarea');
  description.setAttribute('maxlength', 140);

  const creditLabel = document.createElement('label');
  creditLabel.innerHTML = 'Credit: (how would you like to be referred to in the credits?)';
  const credit = document.createElement('input');
  credit.setAttribute('type', 'text');
  credit.setAttribute('maxlength', 50);

  const submit = document.createElement('button');
  submit.innerHTML = 'Submit';

  const error = document.createElement('p');
  error.innerHTML = '';
  error.setAttribute('style', 'color: red;');

  const success = document.createElement('p');
  success.innerHTML = '';
  success.setAttribute('style', 'color: green;');

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
          '<p>' +
          'Thank you! Your moment has been recorded and we will review and include it in the next few days :-)' +
          '</p><p>' +
          'To get back to the episodes, refresh the page now or wait a couple of seconds and we\'ll do it for you.' +
          '</p>';

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

  form.appendChild(selectLabel);
  form.appendChild(select);
  form.appendChild(timestampLabel);
  form.appendChild(timestampItems);
  form.appendChild(descriptionLabel);
  form.appendChild(description);
  form.appendChild(creditLabel);
  form.appendChild(credit);
  form.appendChild(error);
  form.appendChild(success);
  form.appendChild(submit);

  div.appendChild(form);
  return div;
}
