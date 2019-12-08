import { watch } from 'melanke-watchjs';

const selectMessage = (requestState) => {
  const messages = {
    wait: 'Введите URL',
    requested: 'Выполняется запрос...',
    finished: 'Канал успешно добавлен)',
    failed: 'Произошла ошибка, попробуйте снова.',
  };

  return messages[requestState];
};

export default (state) => {
  const input = document.querySelector('#rss-input');
  const button = document.querySelector('#rss-button');
  const hintMessage = document.querySelector('#hint');

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
    switch (state.button.requestState) {
      case 'wait':
        hintMessage.textContent = selectMessage('wait');
        hintMessage.classList.remove('text-success', 'text-danger');
        hintMessage.classList.add('text-muted');
        break;
      case 'requested':
        hintMessage.textContent = selectMessage('requested');
        hintMessage.classList.remove('text-muted');
        hintMessage.classList.add('text-warning');

        input.classList.remove('is-valid');
        input.setAttribute('disabled', 'disabled');
        button.setAttribute('disabled', 'disabled');
        break;
      case 'finished':
        hintMessage.textContent = selectMessage('finished');
        hintMessage.classList.remove('text-warning');
        hintMessage.classList.add('text-success');

        input.value = '';
        input.removeAttribute('disabled');
        button.setAttribute('disabled', 'disabled');
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
};
