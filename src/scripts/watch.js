import { watch } from 'melanke-watchjs';
import render from './render';
import { localize } from './localize';

export default (state) => {
  const input = document.querySelector('#rss-input');
  const addFeedButton = document.querySelector('#button-add');
  const hintMessage = document.querySelector('#hint-message');

  const selectMessage = (requestState) => {
    const messages = {
      filling: (t) => {
        hintMessage.textContent = t('form.hint-message.filling');
      },
      sending: (t) => {
        hintMessage.textContent = t('form.hint-message.sending');
      },
      finished: (t) => {
        hintMessage.textContent = t('form.hint-message.finished');
      },
      failed: (t) => {
        hintMessage.textContent = t('form.hint-message.failed');
      },
    };

    return localize(messages[requestState]);
  };

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
        throw new Error('Validation state is not defined');
    }
  });

  watch(state, 'addFeedProcess', () => {
    switch (state.addFeedProcess.requestState) {
      case 'filling':
        selectMessage('filling');
        hintMessage.classList.remove('text-success', 'text-danger');
        hintMessage.classList.add('text-muted');
        break;
      case 'sending':
        selectMessage('sending');
        hintMessage.classList.remove('text-muted');
        hintMessage.classList.add('text-warning');

        input.classList.remove('is-valid');
        input.setAttribute('disabled', 'disabled');
        addFeedButton.setAttribute('disabled', 'disabled');
        break;
      case 'finished':
        selectMessage('finished');
        hintMessage.classList.remove('text-warning');
        hintMessage.classList.add('text-success');

        input.value = '';
        input.removeAttribute('disabled');
        addFeedButton.setAttribute('disabled', 'disabled');
        break;
      case 'failed':
        selectMessage('failed');
        hintMessage.classList.remove('text-warning');
        hintMessage.classList.add('text-danger');

        input.removeAttribute('disabled');
        break;
      default:
        throw new Error('Request state is not defined!');
    }
  });

  watch(state, 'rssFeeds', () => render('feed', state.rssFeeds));

  watch(state, 'rssArticles', () => {
    render('article', state.rssArticles);
    const buttonsInfo = document.querySelectorAll('.button-info');

    buttonsInfo.forEach((btn) => {
      localize((t) => {
        const buttonInfo = btn;
        buttonInfo.textContent = t('button.info');
      });
    });
  });
};
