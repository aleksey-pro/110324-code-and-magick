'use strict';

//отрисовка одного элемента списка

define(function() {
  var filters = document.querySelector('.reviews-filter');
  filters.classList.add('invisible');
  var template = document.querySelector('#review-template');
  var templateContainer = 'content' in template ? template.content : template;

  return function(review) {
    var reviewElement = templateContainer.querySelector('.review').cloneNode(true);
    reviewElement.querySelector('.review-rating').textContent = review.rating;
    reviewElement.querySelector('.review-text').textContent = review.description;

    var reviewImage = new Image();

    reviewImage.onload = function() {
      var imgTag = reviewElement.querySelector('.review-author');
      imgTag.src = review.author.picture;
      imgTag.alt = review.author.name;
      imgTag.title = review.author.name;
      imgTag.height = 124;
      imgTag.width = 124;
    };
    reviewImage.onerror = function() {
      reviewElement.classList.add('review-load-failure');
    };
    reviewImage.src = review.author.picture;
    filters.classList.remove('invisible');
    return reviewElement;
  };
});
