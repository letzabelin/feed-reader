export default (t) => {
  const description = document.querySelector('#rss-description');
  const hintMessage = document.querySelector('#hint-message');
  const buttonAdd = document.querySelector('#button-add');
  const buttonClose = document.querySelector('#button-close');
  const feedsBlock = document.querySelector('#feeds-title');
  const articlesBlock = document.querySelector('#articles-title');
  const modalTitle = document.querySelector('#modal-title');

  description.textContent = t('description');
  hintMessage.textContent = t('form.hint-message.filling');
  buttonAdd.textContent = t('form.button.add');
  buttonClose.textContent = t('modal.button-close');
  modalTitle.textContent = t('modal.modal-title');
  feedsBlock.textContent = t('feeds-block');
  articlesBlock.textContent = t('articles-block');
};
