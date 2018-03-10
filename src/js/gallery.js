'use strict';


define(function() {

  /**
   * Модуль галереи
   * @exports {Object} Gallery
   */

  /**
   * Конструктор объекта Gallery
   * @constructor
   * @param {Array} sources [ссылки на изображения]
   */

  var Gallery = function(sources) {

  // Свойства галереи
    this.galleryContainer = document.querySelector('.overlay-gallery');
    this.closeElement = this.galleryContainer.querySelector('.overlay-gallery-close');
    this.leftArrow = this.galleryContainer.querySelector('.overlay-gallery-control-left');
    this.rightArrow = this.galleryContainer.querySelector('.overlay-gallery-control-right');
    this.picturesContainer = this.galleryContainer.querySelector('.overlay-gallery-preview');
    this.previewNumber = this.galleryContainer.querySelector('.preview-number-current');
    this.totalNumber = this.galleryContainer.querySelector('.preview-number-total');
    this.pictures = sources;
    this.totalNumber.textContent = this.pictures.length;
  };

// Методы галереи

/**
 * Показ галереи при клике на картинку.
 * show принимает на вход число. Вызывает метод setActivePicture,
 * передав в него параметром число, которое было передано параметром в show.
 * Добавляем обработчики событий DOM-элементам галереи
 *
 * @param {number} index [индекс картинки]
 * @fires Gallery#show
 * @function
 */

//
  Gallery.prototype.show = function(index) {
//  Показывает фотогалерею, убирая у ее DOM-элемента класс invisible.
    this.galleryContainer.classList.remove('invisible');
//
    this.setActivePicture(index);
//
    var self = this;

//hide убирает фотогалерею
    this.closeElement.onclick = function() {
      self.hide();
    };
//перелистывание
    this.leftArrow.onclick = function() {
      self.moveleft();
    };
    this.rightArrow.onclick = function() {
      self.moveright();
    };
  };

/**
 * Уставнавливает актиныую картинку.
 * Принимает на вход число и записывает его в свойство activePicture.\
 * Если в блоке overlay-gallery-preview уже есть фотография, ее
 * нужно предварительно удалить (или воспользоваться методом replaceChild).
 * После этого находит в массиве pictures фотографию с нужным индексом,
 * создает для нее DOM-элемент Image с помощью конструктора, записывает
 * ему src нужной фотографии и ставит его в конец блока overlay-gallery-preview.
 *
 * @param {number} index [индекс картинки]
 * @fires Gallery#setActivePicture.
 * @function
 */


//setActivePicture
  Gallery.prototype.setActivePicture = function(index) {
    this.activePicture = index;
    if (this.activePictureImage) {
      this.activePictureImage.parentNode.removeChild(this.activePictureImage);
    }
    this.activePictureImage = new Image();
    this.activePictureImage.src = this.pictures[index];
    this.picturesContainer.appendChild(this.activePictureImage);
    this.activePictureImage.height = 300;
    this.activePictureImage.width = 300;
    this.previewNumber.textContent = index + 1;
  };

/**
 * Закрытие галереи
 * @fires Gallery#hide
 * @function
 */

//
  Gallery.prototype.hide = function() {
    this.galleryContainer.classList.add('invisible');
    this.closeElement.onclick = null;
    this.leftArrow.onclick = null;
    this.rightArrow.onclick = null;
  };

  // Обработчик события click по элементам overlay-gallery-control-left
  // и overlay-gallery-control-right, которые показывают, соответственно
  // следующую или предыдущую фотографию из списка вызывая метод setActivePicture
  // с соответствующим параметром. Показ галереи не зацикливается, например, если
  // мы находимся на последней фотографии, при клике на контрол, переключающий
  // на следующую фотографию ничего не происходит.

  /**
   * Перелистываение влево
   * @fires Gallery#moveleft
   * @function
   */

  Gallery.prototype.moveleft = function() {
    this.setActivePicture(Math.max(this.activePicture - 1, 0)); // чтобы индекс не был меньше нуля
  };
  /**
   * Перелистываение вправо
   * @fires Gallery#moveright
   * @function
   */

  Gallery.prototype.moveright = function() {
    this.setActivePicture(Math.min(this.activePicture + 1, this.pictures.length - 1)); //чтобы индекс
    // не был больше последнего индекса в массиве картинок
  };


  return Gallery;
});
