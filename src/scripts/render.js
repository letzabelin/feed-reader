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

const renderNewsArticle = ({ title, link, description }) => {
  if (titlesOfArticles.includes(title)) return;
  titlesOfArticles.push(title);

  const templateFeedItem = `
  <li class="list-group-item d-flex justify-content-between align-items-center bg-light">
    <a href=${link} class="text-dark">${title}</a>
    <button type="button" class="btn btn-secondary ml-4" data-toggle="modal" data-target="#info-modal" data-whatever='${description}'>
      Информация
    </button>
  </li>
  `;

  const anchor = document.createElement('div');
  anchor.innerHTML = templateFeedItem;

  articlesBlock.prepend(anchor);
};

const typeOfRender = {
  feed: renderNewsFeed,
  article: renderNewsArticle,
};

export default (type, data) => data.map(typeOfRender[type]);
