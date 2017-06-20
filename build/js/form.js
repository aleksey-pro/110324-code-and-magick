'use strict';

define(function() {
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

  function setCookie() {
    var cookieName = requiredName.value;
    var cookieStars = formRequired['review-mark'].value;
    Cookies.set('review-name', cookieName, {expires: getDateDiff()});
    Cookies.set('review-mark', cookieStars, {expires: getDateDiff()});
  }

  //нахождение разности дней
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

  function insertCookies() {
    var reviewerName = Cookies.get('review-name');
    if (typeof reviewerName === 'string') {
      requiredName.value = reviewerName;
    }
    formRequired['review-mark'].value = Cookies.get('review-mark');
  }

  var form = {
    onClose: null,
    /**
     * @param {Function} cb
     */
    open: function(cb) {
      formContainer.classList.remove('invisible');
      cb();
    },

    close: function() {
      formContainer.classList.add('invisible');

      if (typeof this.onClose === 'function') {
        this.onClose();
      }
    }
  };
  formCloseButton.onclick = function(evt) {
    evt.preventDefault();
    form.close();
  };
  return form;
});
