'use strict';


define(function() {

  /**
   * Модуль отрисовки элемента списка отзыва
   * @exports {Object} Review
   */

  /**
   * Конструктор объекта отзыва Review
   * @constructor
   * @param {Object} data [данные отзывов с сервера]
   */

  var Review = function(data) {
    this.data = data;
    this.element = this.createReviewElement(data);
    var self = this;
    this.quizContainer = this.element.querySelector('.review-quiz');
    this.quizElems = this.element.querySelectorAll('.review-quiz-answer');

    /**
     * Показывает по клику на кнопку следующие отзывы
     * @fires Review#onclick
     * @param { MouseEvent } event
     */

    this.quizContainer.onclick = function(event) {
      if (event.target.tagName !== 'SPAN') {
        return;
      }
      for (var i = 0; i < self.quizElems.length; i++) {
        if (self.quizElems[i].classList.contains('review-quiz-answer-active')) {
          self.quizElems[i].classList.remove('review-quiz-answer-active');
        }
        event.target.classList.add('review-quiz-answer-active');
      }
    };

    /**
     * Удаляет отзыв
     * @fires Review#remove
     */

    this.remove = function() {
      this.quizContainer.onclick = null;
    };
  };

  /**
   * Создает элемент отзыва
   * @fires Review#createReviewElement
   * @param {Object} data [данные отзывов с сервера]
   * @return {Element} [блок с отзывом]
   */

  Review.prototype.createReviewElement = function(data) {
    var template = document.querySelector('#review-template');
    var container = 'content' in template ? template.content : template;
    var element = container.querySelector('.review').cloneNode(true);
    element.querySelector('.review-rating').textContent = data.rating;
    element.querySelector('.review-text').textContent = data.description;
    var image = new Image();
    image.onload = function() {
      var imgTag = element.querySelector('.review-author');
      imgTag.src = data.author.picture;
      imgTag.alt = data.author.name;
      imgTag.title = data.author.name;
      imgTag.height = 124;
      imgTag.width = 124;
    };
    image.onerror = function() {
      element.classList.add('review-load-failure');
    };
    image.src = data.author.picture;
    return element;
  };

  return Review;

});
