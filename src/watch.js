import { watch } from 'melanke-watchjs';

export default (state) => {
  const input = document.querySelector('#rss-input');
  const button = document.querySelector('#rss-button');

  watch(state, 'input', () => {
    switch (state.input.inputField) {
      case 'empty':
        input.value = '';
        input.classList.remove('is-invalid');
        input.classList.remove('is-valid');
        button.setAttribute('disabled', 'disabled');
        break;
      case 'invalid':
        input.classList.remove('is-valid');
        input.classList.add('is-invalid');
        button.setAttribute('disabled', 'disabled');
        break;
      case 'valid':
        input.classList.remove('is-invalid');
        button.removeAttribute('disabled');
        input.classList.add('is-valid');
        break;
      default:
        break;
    }
  });

  watch(state, 'button', () => {
    switch (state.button.request) {
      case 'wait':
        break;
      case 'requested':
        break;
      case 'finished':
        break;
      case 'failed':
        break;
      default:
        break;
    }
  });
};
