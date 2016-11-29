'use strict';

module.exports = function(list, filterID) {
  switch(filterID) {
  case 'reviews-all':
    return list;
  case 'reviews-recent':
    return list.sort(function(a, b) {
      return a.created - b.created;
    });
  case 'reviews-good':
    var goodData = list.filter(function(number) {
      return number.rating > 2;
    });
    return goodData.sort(function(a, b){
      return b.rating - a.rating;
    });
  case 'reviews-bad':
    var badData = list.filter(function(number) {
      return number.rating < 3;
    });
    return badData.sort(function(a, b) {
      return a.rating - b.rating;
    });
  case 'reviews-popular':
    return list.sort(function(a, b) {
      return b.review_usefulness - a.review_usefulness;
    });
 }
};
