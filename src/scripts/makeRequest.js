import axios from 'axios';
import parse from './parse';

export const updateArticles = (state) => {
  const corsProxy = 'cors-anywhere.herokuapp.com';
  const timeToUpdate = 5000;
  const { addFeedProcess: { urls }, rssArticles } = state;

  const promisesResponseList = urls.map(url => axios.get(`https://${corsProxy}/${url}`));
  const isNewArticle = article => !rssArticles.includes(article);

  Promise.all(promisesResponseList)
    .then((responsesList) => {
      responsesList.forEach((response) => {
        const feed = parse(response);
        const { articles } = feed;
        const articlesToAdd = articles.filter(isNewArticle);

        state.rssArticles.push(...articlesToAdd);
      });
    })
    .finally(() => setTimeout(() => updateArticles(state), timeToUpdate));
};

export const addFeed = (state, linkFromUser) => {
  const corsProxy = 'cors-anywhere.herokuapp.com';
  const newState = state;

  newState.addFeedProcess.requestState = 'sending';

  axios.get(`https://${corsProxy}/${linkFromUser}`)
    .then((response) => {
      const feed = parse(response);
      const { articles } = feed;
      newState.rssFeeds.push(feed);
      newState.addFeedProcess.urls.push(linkFromUser);
      newState.rssArticles.push(...articles);
      newState.addFeedProcess.requestState = 'finished';
    })
    .catch((err) => {
      newState.addFeedProcess.requestState = 'failed';
      throw new Error(err);
    });
};
