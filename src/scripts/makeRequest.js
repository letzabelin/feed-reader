import axios from 'axios';
import parse from './parse';

export const updateArticles = (state) => {
  const corsProxy = 'cors-anywhere.herokuapp.com';
  const updateTime = 5000;
  const { articlesList, urlList } = state;

  const promises = urlList.map(url => axios.get(`https://${corsProxy}/${url}`));
  const isNewArticles = article => !articlesList.includes(article);

  Promise.all(promises)
    .then((responseList) => {
      responseList.forEach((response) => {
        const { articles } = parse(response);
        const newArticles = articles.filter(isNewArticles);

        state.articlesList.push(...newArticles);
      });
    })
    .finally(() => setTimeout(() => updateArticles(state), updateTime));
};

export const addFeed = (state, link) => {
  const corsProxy = 'cors-anywhere.herokuapp.com';
  const newState = state;

  axios.get(`https://${corsProxy}/${link}`)
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
