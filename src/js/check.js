'use strict';

window.getMessage = getMessage;

/**
 * Функция возвращет текст сообщений в зависимости от входящих данных, проверяя их тип.
 * @param {boolean|numer|Array} a
 * @param {boolean|numer|Array} b
 * @returns {string} [сообщение]
 */

function getMessage(a, b) {
  if (typeof a === 'boolean') {
    if (a) {
      return 'Я попал в ' + b;
    } else {
      return 'Я никуда не попал';
    }
  }
  if (typeof a === 'number') {
    return 'Я прыгнул на ' + a * 100 + ' сантиметров';
  }

  if (Array.isArray(a) && !Array.isArray(b)) {
    var numberOfSteps = 0;
    for (var i = 0; i < a.length; i++) {
      numberOfSteps += a[i];
    }
    return 'Я прошёл ' + numberOfSteps + ' шагов';
  }

  if (Array.isArray(a) && Array.isArray(b)) {
    var distancePath = 0;
    for (i = 0; i < a.length; i++) {
      distancePath += a[i] * b[i];
    }
    return 'Я прошёл ' + distancePath + ' метров';
  }
  return 'Переданы некорректные данные';
}
