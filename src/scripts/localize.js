import i18next from 'i18next';
import Languagedetector from 'i18next-browser-languagedetector';
import translationRU from './locales/ru/translation.json';
import translationEN from './locales/en/translation.json';

const resources = {
  ru: {
    translation: translationRU,
  },
  en: {
    translation: translationEN,
  },
};

export const localize = (cb) => {
  i18next
    .use(Languagedetector)
    .init({
      lng: 'ru',
      fallbackLng: 'en',
      debug: true,
      resources,
    })
    .then(cb);
};

export const mainConfig = (t) => {
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
