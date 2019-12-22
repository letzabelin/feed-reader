import 'bootstrap/js/dist/modal';
import $ from 'jquery';
import isURL from 'validator/lib/isURL';
import watch from './watch';
import { updateArticles, addFeed } from './makeRequest';
import startLocalizationConfig from './startLocalizationConfig';
import localize from './localize';

export default () => {
  const state = {
    addFeedProcess: {
      validationState: 'filling',
      requestState: 'filling',
    },
    urls: [],
    rssFeeds: [],
    rssArticles: [],
  };

  watch(state);
  updateArticles(state);
  localize.then(startLocalizationConfig);

  const inputForURL = document.querySelector('#rss-input');
  const addFeedForm = document.querySelector('#rss-form');

  const handleInput = (evt) => {
    const { value } = evt.target;
    const isValidURL = isURL(value) && !state.urls.includes(value);
    state.addFeedProcess.requestState = 'filling';

    if (value === '') {
      state.addFeedProcess.validationState = 'filling';
    } else if (isValidURL) {
      state.addFeedProcess.validationState = 'valid';
    } else {
      state.addFeedProcess.validationState = 'invalid';
    }
  };

  const handleForm = (evt) => {
    evt.preventDefault();

    const formData = new FormData(evt.target);
    const url = formData.get('url');

    addFeed(state, url);
  };

  inputForURL.addEventListener('input', handleInput);
  addFeedForm.addEventListener('submit', handleForm);

  $('#info-modal').on('show.bs.modal', function showModal(event) {
    const infoButton = $(event.relatedTarget);
    const articleDescription = infoButton.data('description');
    const modalWindow = $(this);
    modalWindow.find('#modal-description').text(articleDescription);
  });

  $(window).on('load', () => {
    const preloader = $('#preloader');
    preloader.delay(1000).fadeOut('slow');
  });
};
