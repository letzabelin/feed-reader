import axios from 'axios';
import parse from './parse';

export const updateArticles = (state) => {
  const corsProxy = 'cors-anywhere.herokuapp.com';
  const timeToUpdate = 5000;
  const { urls, rssArticles } = state;

  const promisesResponseList = urls.map(url => axios.get(`https://${corsProxy}/${url}`));

  const handleResponses = (response) => {
    const isNewArticle = (article) => {
      const hasRssItem = state.rssArticles.find(({ link }) => link === article.link);
      return hasRssItem ? null : article;
    };

    const feed = parse(response);
    const { articles } = feed;
    const articlesToAdd = articles.map(isNewArticle).filter(e => e !== null);
    rssArticles.unshift(...articlesToAdd);
  };

  Promise.all(promisesResponseList)
    .then((responsesList) => {
      responsesList.forEach(handleResponses);
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
      newState.rssFeeds.unshift(feed);
      newState.urls.push(linkFromUser);
      newState.rssArticles.unshift(...articles);
      newState.addFeedProcess.requestState = 'finished';
    })
    .catch((err) => {
      newState.addFeedProcess.requestState = 'failed';
      throw new Error(err);
    });
};
