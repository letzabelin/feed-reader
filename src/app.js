import 'bootstrap/js/dist/collapse';
import isURL from 'validator/lib/isURL';
import watch from './watch';
import request from './request';


export default () => {
  const state = {
    input: {
      inputField: 'empty',
    },
    button: {
      request: 'wait',
    },
    feedList: ['lorem-rss.herokuapp.com'],
  };

  watch(state);

  const input = document.querySelector('#rss-input');
  const button = document.querySelector('#rss-button');

  const inputHandle = (evt) => {
    const { value } = evt.target;
    const isValidURL = isURL(value) && !state.feedList.includes(value);

    if (value === '') {
      state.input.inputField = 'empty';
    } else if (isValidURL) {
      state.input.inputField = 'valid';
    } else {
      state.input.inputField = 'invalid';
    }
  };

  const buttonHandle = (evt) => {
    evt.preventDefault();

    request(input.value);
  };

  input.addEventListener('input', inputHandle);
  button.addEventListener('click', buttonHandle);
};
