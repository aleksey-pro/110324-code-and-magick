'use strict';


define(['./review', './load'], function(Review, load) {

  /**
   * Модуль отрисовки отфильтрованного списка отзывов
   * @param { Object } Review
   * @param { Function } load
   */


  // var REVIEWS_LOAD_URL = 'http://localhost:1507/api/reviews';
  var REVIEWS_LOAD_URL = 'https://mighty-eyrie-43615.herokuapp.com/api/reviews';
  var pagesPerBlock = 3;
  var pageNumber = 0;

  var container = document.querySelector('.reviews-list');
  var filters = document.querySelector('.reviews-filter');
  var activeFilter = 'reviews-all';
  var moreButton = document.querySelector('.reviews-controls-more');
  moreButton.classList.remove('invisible');

  /**
   * Вставляем отфильтрованные и полученные с сервера
   * данные в контейнер с отзывами
   * @param {Object} data [данные отзывов с вервера]
   */

  var renderReviews = function(data) {
    data.forEach(function(review) {
      var reviewEl = new Review(review);
      container.appendChild(reviewEl.element);
    });
  };

  /**
   * Подгружаем с сервера данные отзывов указаннного количества
   * @param {Function} filter [фильтр числа отзывов]
   * @param {number} [currentPage] [текущее число отзывов]
   */

  var loadReviews = function(filter, currentPage) {
    load(REVIEWS_LOAD_URL, {
      from: currentPage * pagesPerBlock,
      to: currentPage * pagesPerBlock + pagesPerBlock,
      filter: filter
    }, renderReviews);
  };

  /**
   * Вызываем функцию подгрузки отзывов с сервера
   */

  moreButton.addEventListener('click', function() {
    loadReviews(activeFilter, ++pageNumber);
  });

  /**
   * Функция перегружающая отзывы в соотв с выбранным фильтром
   * @param {number} filterID [тип фильтра]
   */

  var changeFilter = function(filterID) {
    container.innerHTML = '';
    pageNumber = 0;
    activeFilter = filterID;
    loadReviews(filterID, pageNumber);
  };

  /**
   * Функция меняющая тип фильтра отзывов при нажатии
   * на соответствующую кнопку
   */

  var change = filters.addEventListener('click', function(evt) {
    if (evt.target.name === 'reviews') {
      changeFilter(evt.target.id);
    }
  }, true);

  changeFilter(activeFilter);

});
