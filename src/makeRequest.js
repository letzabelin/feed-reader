import axios from 'axios';
import parse from './parse';

export default (state, link) => {
  const proxy = 'cors-anywhere.herokuapp.com';
  const newState = state;

  axios.get(`https://${proxy}/${link}`)
    .then((response) => {
      const newsFeed = parse(response);
      const { articles } = newsFeed;
      state.feedsList.push(newsFeed);
      state.urlList.push(link);
      state.articlesList.push(...articles);
      newState.button.requestState = 'finished';
    })
    .catch((err) => {
      newState.button.requestState = 'failed';
      throw new Error(err);
    });
};
