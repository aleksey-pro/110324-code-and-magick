'use strict';
require(['./form', './game', './reviews', './gallery'], function(form, Game, renderReviews, Gallery) {

  /**
   * Инизиализируем новый объект игры
   */

  var game = new Game(document.querySelector('.demo'));
  game.initializeLevelAndStart();
  game.setGameStatus(Game.Verdict.INTRO);
  var formOpenButton = document.querySelector('.reviews-controls-new');

  /** @param {MouseEvent} evt */

  formOpenButton.onclick = function(evt) {
    evt.preventDefault();
    form.open(function() {
      game.setGameStatus(Game.Verdict.PAUSE);
      game.setDeactivated(true);
    });
  };
  form.onClose = function() {
    game.setDeactivated(false);
  };

  window.addEventListener('scroll', game.optimizedScroll);

  // Экспортируйте из модуля функцию-конструктор галереи и подключите его как зависимость в блоке main.js.
  // В блоке main.js получите массив с адресами всех фотографий, лежащих в блоке photogallery.

  var pictureSection = document.querySelector('.photogallery');
  var links = pictureSection.querySelectorAll('a');
  var imgs = document.querySelector('.photogallery').querySelectorAll('a > img');
  var sources = [];
  for (var i = 0, l = imgs.length; i < l; i++) {
    sources.push(imgs[i].src);
  }
  // Создайте переменную gallery запишите в нее объект, созданный функцией-конструктором Gallery, параметром конструктора передайте полученный
  // ранее массив фотографий.

  /**
   * Инизиализируем новый объект галереи
   *
   * добавьте ссылкам обработчики клика, которые вызывают
   * метод show с соответствующим параметром ранее созданному объекту gallery.
   */

  var gallery = new Gallery(sources);


  Array.prototype.forEach.call(links, function(link, index) {
    link.onclick = function() {
      gallery.show(index);
    };
  });
});
