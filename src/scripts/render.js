import localize from './localization';

const renderFeed = (rssFeed) => {
  const feedsBlock = document.querySelector('#rss-feeds');

  const render = ({ title, description, link }) => (
    `
    <a href="${link}" class="list-group-item list-group-item-action flex-column align-items-start">
    <div class="d-flex w-100 justify-content-between">
      <h5 class="mb-1">${title}</h5>
    </div>
    <p class="mb-1">${description}</p>
    </a>
    `
  );

  feedsBlock.innerHTML = rssFeed.map(render).join('');
};

const renderArticle = (rssArticles) => {
  const articlesBlock = document.querySelector('#rss-articles');

  const render = ({ title, link, description }) => (
    `
    <div>
    <li class="list-group-item d-flex justify-content-between align-items-center bg-light">
      <a href=${link} class="text-dark">${title}</a>
      <button type="button" class="btn btn-secondary ml-4 button-info" data-toggle="modal" data-target="#info-modal" data-description='${description}'>
        ${localize((t) => {
      const buttonsInfo = document.querySelectorAll('.button-info');
      buttonsInfo.forEach((btn) => {
        const buttonInfo = btn;
        buttonInfo.textContent = t('button.info');
      });
    })}
      </button>
    </li>
    </div>
    `
  );

  articlesBlock.innerHTML = rssArticles.map(render).join('');
};

const typeOfRender = {
  feed: renderFeed,
  article: renderArticle,
};

export default (type, data) => typeOfRender[type](data);
