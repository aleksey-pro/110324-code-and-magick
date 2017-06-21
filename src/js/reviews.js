'use strict';

//отрисовка всего списка

define(['./review', './load'], function(Review, load) {
  // var REVIEWS_LOAD_URL = 'http://localhost:1507/api/reviews';
  var REVIEWS_LOAD_URL = 'http://mighty-eyrie-43615.herokuapp.com/api/reviews';
  var pagesPerBlock = 3;
  var pageNumber = 0;

  var container = document.querySelector('.reviews-list');
  var filters = document.querySelector('.reviews-filter');
  var activeFilter = 'reviews-all';
  var moreButton = document.querySelector('.reviews-controls-more');
  moreButton.classList.remove('invisible');

  var renderReviews = function(data) {
    data.forEach(function(review) {
      var reviewEl = new Review(review);
      container.appendChild(reviewEl.element);
    });
  };

  var loadReviews = function(filter, currentPage) {
    load(REVIEWS_LOAD_URL, {
      from: currentPage * pagesPerBlock,
      to: currentPage * pagesPerBlock + pagesPerBlock,
      filter: filter
    }, renderReviews);
  };

  moreButton.addEventListener('click', function() {
    loadReviews(activeFilter, ++pageNumber);
  });

  var changeFilter = function(filterID) {
    container.innerHTML = '';
    pageNumber = 0;
    activeFilter = filterID;
    loadReviews(filterID, pageNumber);
  };

  var change = filters.addEventListener('click', function(evt) {
    if (evt.target.name === 'reviews') {
      changeFilter(evt.target.id);
    }
  }, true);

  changeFilter(activeFilter);

});
