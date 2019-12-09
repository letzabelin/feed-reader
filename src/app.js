import 'bootstrap/js/dist/collapse';
import isURL from 'validator/lib/isURL';
import watch from './watch';
import addFeed from './makeRequest';


export default () => {
  const state = {
    input: {
      inputField: 'empty',
    },
    button: {
      requestState: 'wait',
    },
    urlList: ['lorem-rss.herokuapp.com'],
    feedsList: [],
    articlesList: [],
  };

  watch(state);

  const input = document.querySelector('#rss-input');
  const button = document.querySelector('#rss-button');

  const handleInput = (evt) => {
    const { value } = evt.target;
    const isValidURL = isURL(value) && !state.urlList.includes(value);
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

    addFeed(state, input.value);
    state.button.requestState = 'requested';
  };

  input.addEventListener('input', handleInput);
  button.addEventListener('click', handleButton);
};
