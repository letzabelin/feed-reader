import 'bootstrap/js/dist/collapse';
import isURL from 'validator/lib/isURL';
import watch from './watch';
import request from './request';
// import render from './render';


export default () => {
  const state = {
    input: {
      inputField: 'empty',
    },
    button: {
      requestState: 'wait',
    },
    feedList: ['lorem-rss.herokuapp.com'],
  };

  watch(state);

  const input = document.querySelector('#rss-input');
  const button = document.querySelector('#rss-button');

  const handleInput = (evt) => {
    const { value } = evt.target;
    const isValidURL = isURL(value) && !state.feedList.includes(value);
    state.button.requestState = 'wait';

    if (value === '') {
      state.input.inputField = 'empty';
    } else if (isValidURL) {
      state.input.inputField = 'valid';
    } else {
      state.input.inputField = 'invalid';
    }
  };

  const handleButton = (evt) => {
    evt.preventDefault();

    request(state, input.value);
    state.button.requestState = 'requested';
  };

  input.addEventListener('input', handleInput);
  button.addEventListener('click', handleButton);
};
