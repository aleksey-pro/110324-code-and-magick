'use strict';

define(function() {


  /**
   * Модуль, описывающий события формы
   * @exports {Object} form
   */


  var formContainer = document.querySelector('.overlay-container'), // див в котором форма
    formCloseButton = document.querySelector('.review-form-close'), // кнопка закрытия
    formRequired = document.querySelector('.review-form'), // форма
    submitButton = document.querySelector('.review-submit'), // кнопка
    requiredText = document.getElementById('review-text'),  // требуемое поле Отзыв
    requiredName = document.getElementById('review-name'), // требуемое поле Имя
    hidingBlock = document.querySelector('.review-fields'),
    inputsGroup = document.querySelector('.review-form-group'), // группа звездочек
    hidingName = document.querySelector('.review-fields-name'), // скрываемое имя
    hidingTstml = document.querySelector('.review-fields-text');//скрываемый отзыв

  var diff;

  submitButton.setAttribute('disabled', 'disabled'); // кнопка отключена

  /**
   * Функция проверки заполненности полей формы.
   * Переключает соответсвующее состояние подсказок.
   */

  function validate() {
    var isFeedbackRequired = Number(formRequired['review-mark'].value) < 3;

    // Проверяем кнопку отправки и блок с лэйблами
    if (requiredName.value === '' || (isFeedbackRequired && requiredText.value === '')) {
      submitButton.setAttribute('disabled', 'disabled'); // кнопка отключена
      hidingBlock.classList.remove('invisible'); // блок c лэйблами показан
    } else {
      submitButton.removeAttribute('disabled'); // кнопка включена
      hidingBlock.classList.add('invisible'); // блок с лэйблами скрыт
    }

    // Проверяем поле имя
    if (requiredName.value === '') {
      hidingName.classList.remove('invisible'); // показываем лейбл "имя"
    } else {
      hidingName.classList.add('invisible'); // скрываем лейбл "имя"
    }

    // Проверяем поле отзыв
    if (isFeedbackRequired && requiredText.value === '') {
      hidingTstml.classList.remove('invisible'); // показываем лейбл "отзыв"
    } else {
      hidingTstml.classList.add('invisible');  // скрываем лейбл "отзыв"
    }
  }

  validate();

  requiredText.oninput = validate;
  inputsGroup.onchange = function() {
    validate();
    setCookie();
  };
  requiredName.oninput = function() {
    validate();
    setCookie();
  };

  /**
   * Передает в куки значения полей формы и уставливает срок их хранения.
   * производится при заполнении полей.
   * @property {string} cookieName
   * @property {number} cookieStars
   */

  function setCookie() {
    var cookieName = requiredName.value;
    var cookieStars = formRequired['review-mark'].value;
    Cookies.set('review-name', cookieName, {expires: getDateDiff()});
    Cookies.set('review-mark', cookieStars, {expires: getDateDiff()});
  }

  /**
   * Функция нахождения разности дней
   * @return {number} число миллисекунд с момента рождения
   */

  function getDateDiff() {
    if (diff) {
      return diff;
    }
    var today = new Date(); // определим дату в этом году
    var birthday = new Date(); // определим дату рождения
    birthday.setMonth(11); // установим месяц даты рождения
    birthday.setDate(9); // установим число дня рождения
    if (birthday > today) {
      birthday.setFullYear(today.getFullYear() - 1); //найдем дату рождения в прошлом году
    }
    diff = Math.round((today - birthday) / (24 * 60 * 60 * 1000));
    return diff;
  }

  document.addEventListener('DOMContentLoaded', insertCookies);

  /**
   * Функция извлекает из куки заполненные ранее имя и оценку
   * если ранее оно было записано.
   * Иcпользует библиотеку js-cookie
   * @see ./lib/js.cookie.js
   */

  function insertCookies() {
    var reviewerName = Cookies.get('review-name');
    if (typeof reviewerName === 'string') {
      requiredName.value = reviewerName;
    }
    formRequired['review-mark'].value = Cookies.get('review-mark');
  }

  /**
   * @namespace form
   */

  var form = {

    /**
     * Удяляет текущий объект
     * @memberof form
     */

    onClose: null,
    /**
     * Показывает форму
     * @memberof form
     * @param {Function} cb
     */
    open: function(cb) {
      formContainer.classList.remove('invisible');
      cb();
    },

    /**
     * Скрывает форму
     * @memberof form
     */

    close: function() {
      formContainer.classList.add('invisible');

      if (typeof this.onClose === 'function') {
        this.onClose();
      }
    }
  };

  /**
   * Закрывает форму при клике на кнопку
   * @param {MouseEvent} evt
   */

  formCloseButton.onclick = function(evt) {
    evt.preventDefault();
    form.close();
  };


  return form;
});
