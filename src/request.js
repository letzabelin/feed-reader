import axios from 'axios';
import parse from './parse';

export default (state, link) => {
  const proxy = 'cors-anywhere.herokuapp.com';
  const newState = state;

  axios.get(`https://${proxy}/${link}`)
    .then((response) => {
      parse(response);
      newState.button.requestState = 'finished';
    })
    .catch((err) => {
      newState.button.requestState = 'failed';
      throw new Error(err);
    });
};
