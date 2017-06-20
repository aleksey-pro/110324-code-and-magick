/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	var parentJsonpFunction = window["webpackJsonp"];
/******/ 	window["webpackJsonp"] = function webpackJsonpCallback(chunkIds, moreModules) {
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, callbacks = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId])
/******/ 				callbacks.push.apply(callbacks, installedChunks[chunkId]);
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			modules[moduleId] = moreModules[moduleId];
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(chunkIds, moreModules);
/******/ 		while(callbacks.length)
/******/ 			callbacks.shift().call(null, __webpack_require__);
/******/
/******/ 	};
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// "0" means "already loaded"
/******/ 	// Array means "loading", array contains callbacks
/******/ 	var installedChunks = {
/******/ 		0:0
/******/ 	};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId, callback) {
/******/ 		// "0" is the signal for "already loaded"
/******/ 		if(installedChunks[chunkId] === 0)
/******/ 			return callback.call(null, __webpack_require__);
/******/
/******/ 		// an array means "currently loading".
/******/ 		if(installedChunks[chunkId] !== undefined) {
/******/ 			installedChunks[chunkId].push(callback);
/******/ 		} else {
/******/ 			// start chunk loading
/******/ 			installedChunks[chunkId] = [callback];
/******/ 			var head = document.getElementsByTagName('head')[0];
/******/ 			var script = document.createElement('script');
/******/ 			script.type = 'text/javascript';
/******/ 			script.charset = 'utf-8';
/******/ 			script.async = true;
/******/
/******/ 			script.src = __webpack_require__.p + "" + chunkId + ".js/" + ({}[chunkId]||chunkId) + ".js";
/******/ 			head.appendChild(script);
/******/ 		}
/******/ 	};
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	__webpack_require__.e/* require */(1, function(__webpack_require__) { var __WEBPACK_AMD_REQUIRE_ARRAY__ = [__webpack_require__(1), __webpack_require__(2), __webpack_require__(3), __webpack_require__(6)]; (function(form, Game, renderReviews, Gallery) {
	  
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
	
	  var gallery = new Gallery(sources);
	  //Затем в модуле main.js добавьте ссылкам обработчики клика, которые вызывают
	  // метод show с соответствующим параметром ранее созданному объекту gallery.
	
	  Array.prototype.forEach.call(links, function(link, index) {
	    link.onclick = function() {
	      gallery.show(index);
	    };
	  });
	}.apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__));});


/***/ }
/******/ ]);
//# sourceMappingURL=main.js.map?dropcache