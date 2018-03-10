'use strict';


define(function() {

    /**
   * Модуль запроса отзывов с сервера
   * @exports {Function} load
   */

  /**
   * Функция преобразования параметров запроса в GET-строку
   * @param {Object} params [данные для сервера]
   * @return {String}
   */

  var getSearchString = function(params) {
    return Object.keys(params).map(function(param) {
      return [param, params[param]].join('=');
    }).join('&');
  };

  /**
   * Функция отправки и получения данных с сервера
   * @param {String} url [путь]
   * @param {String} params [параметры]
   * @param {Function} callback
   */

  return function(url, params, callback) {

  /**
   * @external XMLHttpRequest
   */

    var xhr = new XMLHttpRequest();

    /**
     * При загрузке данных вызываем функцию callback с полученными данными
     * @param {ServerEvent} evt
     */

    xhr.onload = function(evt) {
      var loadedData = JSON.parse(evt.target.response);
      callback(loadedData);
    };

    /**
     * Инизиализируем открытие порта
     * @function
     * @param {ServerEvent} GET
     * @param {String}
     */

    xhr.open('GET', url + '?' + getSearchString(params));

    /**
     * Высылаем запрос на сервер
     * @function
     */

    xhr.send();
  };
});
