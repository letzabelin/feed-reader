import axios from 'axios';
import parse from './parse';

export const updateArticles = (state) => {
  const corsProxy = 'cors-anywhere.herokuapp.com';
  const timeToUpdate = 5000;
  const { articlesList, urlList } = state;

  const promisesResponseList = urlList.map(url => axios.get(`https://${corsProxy}/${url}`));
  const isNewArticle = article => !articlesList.includes(article);

  Promise.all(promisesResponseList)
    .then((responsesList) => {
      responsesList.forEach((response) => {
        const { articles } = parse(response);
        const articlesToAdd = articles.filter(isNewArticle);

        state.articlesList.push(...articlesToAdd);
      });
    })
    .finally(() => setTimeout(() => updateArticles(state), timeToUpdate));
};

export const addFeed = (state, linkFromUser) => {
  const corsProxy = 'cors-anywhere.herokuapp.com';
  const newState = state;

  axios.get(`https://${corsProxy}/${linkFromUser}`)
    .then((response) => {
      const feed = parse(response);
      const { articles } = feed;
      state.feedsList.push(feed);
      state.urlList.push(linkFromUser);
      state.articlesList.push(...articles);
      newState.button.requestState = 'finished';
    })
    .catch((err) => {
      newState.button.requestState = 'failed';
      throw new Error(err);
    });
};
