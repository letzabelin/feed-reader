import axios from 'axios';
import parse from './parse';

const handleResponses = state => ({ data }) => {
  const { rssArticles } = state;

  const findNewArticles = article => (
    state.rssArticles
      .find(({ link }) => link === article.link)
      ? null : article
  );

  const feed = parse(data);
  const { articles } = feed;
  const articlesToAdd = articles.map(findNewArticles).filter(e => e !== null);
  rssArticles.unshift(...articlesToAdd);
};

export const updateArticles = (state) => {
  const corsProxy = 'cors-anywhere.herokuapp.com';
  const timeToUpdate = 5000;
  const { urls } = state;

  const promisesResponseList = urls.map(url => axios.get(`https://${corsProxy}/${url}`));

  Promise.all(promisesResponseList)
    .then((responsesList) => {
      responsesList.forEach(handleResponses(state));
    })
    .finally(() => setTimeout(() => updateArticles(state), timeToUpdate));
};

export const addFeed = (state, linkFromUser) => {
  const corsProxy = 'cors-anywhere.herokuapp.com';
  const newState = state;

  newState.addFeedProcess.requestState = 'sending';

  axios.get(`https://${corsProxy}/${linkFromUser}`)
    .then(({ data }) => {
      const feed = parse(data);
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
