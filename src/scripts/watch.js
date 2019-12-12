import { watch } from 'melanke-watchjs';
import render from './render';

const selectMessage = (requestState) => {
  const messages = {
    filling: 'Введите URL',
    sending: 'Выполняется запрос...',
    finished: 'Канал успешно добавлен!',
    failed: 'Произошла ошибка, попробуйте снова.',
  };

  return messages[requestState];
};

export default (state) => {
  const input = document.querySelector('#rss-input');
  const addFeedButton = document.querySelector('#rss-button');
  const hintMessage = document.querySelector('#hint-message');

  watch(state, 'addFeedProcess', () => {
    switch (state.addFeedProcess.validationState) {
      case 'filling':
        input.value = '';
        input.classList.remove('is-invalid');
        input.classList.remove('is-valid');
        addFeedButton.setAttribute('disabled', 'disabled');
        break;
      case 'invalid':
        input.classList.remove('is-valid');
        input.classList.add('is-invalid');
        addFeedButton.setAttribute('disabled', 'disabled');
        break;
      case 'valid':
        input.classList.remove('is-invalid');
        addFeedButton.removeAttribute('disabled');
        input.classList.add('is-valid');
        break;
      default:
        break;
    }
  });

  watch(state, 'addFeedProcess', () => {
    switch (state.addFeedProcess.requestState) {
      case 'filling':
        hintMessage.textContent = selectMessage('filling');
        hintMessage.classList.remove('text-success', 'text-danger');
        hintMessage.classList.add('text-muted');
        break;
      case 'sending':
        hintMessage.textContent = selectMessage('sending');
        hintMessage.classList.remove('text-muted');
        hintMessage.classList.add('text-warning');

        input.classList.remove('is-valid');
        input.setAttribute('disabled', 'disabled');
        addFeedButton.setAttribute('disabled', 'disabled');
        break;
      case 'finished':
        hintMessage.textContent = selectMessage('finished');
        hintMessage.classList.remove('text-warning');
        hintMessage.classList.add('text-success');

        input.value = '';
        input.removeAttribute('disabled');
        addFeedButton.setAttribute('disabled', 'disabled');
        break;
      case 'failed':
        hintMessage.textContent = selectMessage('failed');
        hintMessage.classList.remove('text-warning');
        hintMessage.classList.add('text-danger');

        input.removeAttribute('disabled');
        break;
      default:
        break;
    }
  });

  watch(state, 'addFeedProcess', () => render('feed', state.addFeedProcess.rssFeeds));

  watch(state, 'addFeedProcess', () => render('article', state.addFeedProcess.rssArticles));
};
