const feedsBlock = document.querySelector('#rss-feeds');
const articlesBlock = document.querySelector('#rss-articles');
const titlesOfFeeds = [];
const titlesOfArticles = [];

const renderNewsFeed = ({ title, description, link }) => {
  if (titlesOfFeeds.includes(title)) return;
  titlesOfFeeds.push(title);

  const templateFeedItem = `
  <div class="d-flex w-100 justify-content-between">
    <h5 class="mb-1">${title}</h5>
  </div>
  <p class="mb-1">${description}</p>
  `;

  const anchor = document.createElement('a');
  anchor.classList.add('list-group-item', 'list-group-item-action', 'flex-column', 'align-items-start');
  anchor.setAttribute('href', link);
  anchor.innerHTML = templateFeedItem;

  feedsBlock.prepend(anchor);
};

const renderNewsArticle = ({ title, link }) => {
  if (titlesOfArticles.includes(title)) return;
  titlesOfArticles.push(title);

  const anchor = document.createElement('a');
  anchor.classList.add('list-group-item', 'list-group-item-action', 'flex-column', 'align-items-start');
  anchor.setAttribute('href', link);
  anchor.textContent = title;

  articlesBlock.prepend(anchor);
};

const typeOfRender = {
  feed: renderNewsFeed,
  article: renderNewsArticle,
};

export default (type, data) => data.map(typeOfRender[type]);
