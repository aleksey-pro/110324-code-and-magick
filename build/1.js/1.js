webpackJsonp([1],[
/* 0 */,
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;'use strict';
	
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
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
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;'use strict';
	
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
	  /**
	   * @const
	   * @type {number}
	   */
	  var HEIGHT = 300;
	  /**
	   * @const
	   * @type {number}
	   */
	  var WIDTH = 700;
	  /**
	   * ID уровней.
	   * @enum {number}
	   */
	  var Level = {
	    INTRO: 0,
	    MOVE_LEFT: 1,
	    MOVE_RIGHT: 2,
	    LEVITATE: 3,
	    HIT_THE_MARK: 4
	  };
	  /**
	   * Порядок прохождения уровней.
	   * @type {Array.<Level>}
	   */
	  var LevelSequence = [
	    Level.INTRO
	  ];
	  /**
	   * Начальный уровень.
	   * @type {Level}
	   */
	  var INITIAL_LEVEL = LevelSequence[0];
	  /**
	   * Допустимые виды объектов на карте.
	   * @enum {number}
	   */
	  var ObjectType = {
	    ME: 0,
	    FIREBALL: 1
	  };
	  /**
	   * Допустимые состояния объектов.
	   * @enum {number}
	   */
	  var ObjectState = {
	    OK: 0,
	    DISPOSED: 1
	  };
	  /**
	   * Коды направлений.
	   * @enum {number}
	   */
	  var Direction = {
	    NULL: 0,
	    LEFT: 1,
	    RIGHT: 2,
	    UP: 4,
	    DOWN: 8
	  };
	  /**
	   * Карта спрайтов игры.
	   * @type {Object.<ObjectType, Object>}
	   */
	  var SpriteMap = {};
	  var REVERSED = '-reversed';
	  SpriteMap[ObjectType.ME] = {
	    width: 61,
	    height: 84,
	    url: 'img/wizard.gif'
	  };
	  //TODO: Find a clever way
	  SpriteMap[ObjectType.ME + REVERSED] = {
	    width: 61,
	    height: 84,
	    url: 'img/wizard-reversed.gif'
	  };
	  SpriteMap[ObjectType.FIREBALL] = {
	    width: 24,
	    height: 24,
	    url: 'img/fireball.gif'
	  };
	  /**
	   * Правила перерисовки объектов в зависимости от состояния игры.
	   * @type {Object.<ObjectType, function(Object, Object, number): Object>}
	   */
	  var ObjectsBehaviour = {};
	  /**
	   * Обновление движения мага. Движение мага зависит от нажатых в данный момент
	   * стрелок. Маг может двигаться одновременно по горизонтали и по вертикали.
	   * На движение мага влияет его пересечение с препятствиями.
	   * @param {Object} object
	   * @param {Object} state
	   * @param {number} timeframe
	   */
	  /** Задержка при прокрутке*/
	  var THROTTLE_TIMEOUT = 150;
	  
	  ObjectsBehaviour[ObjectType.ME] = function(object, state, timeframe) {
	    // Пока зажата стрелка вверх, маг сначала поднимается, а потом левитирует
	    // в воздухе на определенной высоте.
	    // NB! Сложность заключается в том, что поведение описано в координатах
	    // канваса, а не координатах, относительно нижней границы игры.
	    if (state.keysPressed.UP && object.y > 0) {
	      object.direction = object.direction & ~Direction.DOWN;
	      object.direction = object.direction | Direction.UP;
	      object.y -= object.speed * timeframe * 2;
	    }
	    // Если стрелка вверх не зажата, а маг находится в воздухе, он плавно
	    // опускается на землю.
	    if (!state.keysPressed.UP) {
	      if (object.y < HEIGHT - object.height) {
	        object.direction = object.direction & ~Direction.UP;
	        object.direction = object.direction | Direction.DOWN;
	        object.y += object.speed * timeframe / 3;
	      }
	    }
	    // Если зажата стрелка влево, маг перемещается влево.
	    if (state.keysPressed.LEFT) {
	      object.direction = object.direction & ~Direction.RIGHT;
	      object.direction = object.direction | Direction.LEFT;
	      object.x -= object.speed * timeframe;
	    }
	    // Если зажата стрелка вправо, маг перемещается вправо.
	    if (state.keysPressed.RIGHT) {
	      object.direction = object.direction & ~Direction.LEFT;
	      object.direction = object.direction | Direction.RIGHT;
	      object.x += object.speed * timeframe;
	    }
	    // Ограничения по перемещению по полю. Маг не может выйти за пределы поля.
	    if (object.y < 0) {
	      object.y = 0;
	    }
	    if (object.y > HEIGHT - object.height) {
	      object.y = HEIGHT - object.height;
	    }
	    if (object.x < 0) {
	      object.x = 0;
	    }
	    if (object.x > WIDTH - object.width) {
	      object.x = WIDTH - object.width;
	    }
	  };
	  /**
	   * Обновление движения файрбола. Файрбол выпускается в определенном направлении
	   * и после этого неуправляемо движется по прямой в заданном направлении. Если
	   * он пролетает весь экран насквозь, он исчезает.
	   * @param {Object} object
	   * @param {Object} _state
	   * @param {number} timeframe
	   */
	  ObjectsBehaviour[ObjectType.FIREBALL] = function(object, _state, timeframe) {
	    if (object.direction & Direction.LEFT) {
	      object.x -= object.speed * timeframe;
	    }
	    if (object.direction & Direction.RIGHT) {
	      object.x += object.speed * timeframe;
	    }
	    if (object.x < 0 || object.x > WIDTH) {
	      object.state = ObjectState.DISPOSED;
	    }
	  };
	  /**
	   * ID возможных ответов функций, проверяющих успех прохождения уровня.
	   * CONTINUE говорит о том, что раунд не закончен и игру нужно продолжать,
	   * WIN о том, что раунд выигран, FAIL — о поражении. PAUSE о том, что игру
	   * нужно прервать.
	   * @enum {number}
	   */
	  var Verdict = {
	    CONTINUE: 0,
	    WIN: 1,
	    FAIL: 2,
	    PAUSE: 3,
	    INTRO: 4
	  };
	  /**
	   * Правила завершения уровня. Ключами служат ID уровней, значениями функции
	   * принимающие на вход состояние уровня и возвращающие true, если раунд
	   * можно завершать или false если нет.
	   * @type {Object.<Level, function(Object):boolean>}
	   */
	  var LevelsRules = {};
	  /**
	   * Уровень считается пройденным, если был выпущен файлболл и он улетел
	   * за экран.
	   * @param {Object} state
	   * @return {Verdict}
	   */
	  LevelsRules[Level.INTRO] = function(state) {
	    var fireballs = state.garbage.filter(function(object) {
	      return object.type === ObjectType.FIREBALL;
	    });
	    return fireballs.length ? Verdict.WIN : Verdict.CONTINUE;
	  };
	  /**
	   * Начальные условия для уровней.
	   * @enum {Object.<Level, function>}
	   */
	  var LevelsInitialize = {};
	  /**
	   * Первый уровень.
	   * @param {Object} state
	   * @return {Object}
	   */
	  LevelsInitialize[Level.INTRO] = function(state) {
	    state.objects.push(
	      // Установка персонажа в начальное положение. Он стоит в крайнем левом
	      // углу экрана, глядя вправо. Скорость перемещения персонажа на этом
	      // уровне равна 2px за кадр.
	      {
	        direction: Direction.RIGHT,
	        height: 84,
	        speed: 2,
	        sprite: SpriteMap[ObjectType.ME],
	        state: ObjectState.OK,
	        type: ObjectType.ME,
	        width: 61,
	        x: WIDTH / 3,
	        y: HEIGHT - 100
	      }
	    );
	    return state;
	  };
	  /**
	   * Конструктор объекта Game. Создает canvas, добавляет обработчики событий
	   * и показывает приветственный экран.
	   * @param {Element} container
	   * @constructor
	   */
	  var Game = function(container) {
	    this.container = container;
	    this.canvas = document.createElement('canvas');
	    this.canvas.width = container.clientWidth;
	    this.canvas.height = container.clientHeight;
	    this.container.appendChild(this.canvas);
	    this.ctx = this.canvas.getContext('2d');
	    this.demoBlock = document.querySelector('.demo');
	    this._onKeyDown = this._onKeyDown.bind(this);
	    this._onKeyUp = this._onKeyUp.bind(this);
	    this._pauseListener = this._pauseListener.bind(this);
	    this.setDeactivated(false);
	    this.optimizedScroll = this.optimizedScroll.bind(this);
	  };
	  Game.prototype = {
	    /**
	     * Текущий уровень игры.
	     * @type {Level}
	     */
	    level: INITIAL_LEVEL,
	    /** @param {boolean} deactivated */
	    setDeactivated: function(deactivated) {
	      if (this._deactivated === deactivated) {
	        return;
	      }
	      this._deactivated = deactivated;
	      if (deactivated) {
	        this._removeGameListeners();
	      } else {
	        this._initializeGameListeners();
	      }
	    },
	    /**
	     * Состояние игры. Описывает местоположение всех объектов на игровой карте
	     * и время проведенное на уровне и в игре.
	     * @return {Object}
	     */
	    getInitialState: function() {
	      return {
	        // Статус игры. Если CONTINUE, то игра продолжается.
	        currentStatus: Verdict.CONTINUE,
	        // Объекты, удаленные на последнем кадре.
	        garbage: [],
	        // Время с момента отрисовки предыдущего кадра.
	        lastUpdated: null,
	        // Состояние нажатых клавиш.
	        keysPressed: {
	          ESC: false,
	          LEFT: false,
	          RIGHT: false,
	          SPACE: false,
	          UP: false
	        },
	        // Время начала прохождения уровня.
	        levelStartTime: null,
	        // Все объекты на карте.
	        objects: [],
	        // Время начала прохождения игры.
	        startTime: null
	      };
	    },
	    /**
	     * Начальные проверки и запуск текущего уровня.
	     * @param {boolean=} restart
	     */
	    initializeLevelAndStart: function(restart) {
	      restart = typeof restart === 'undefined' ? true : restart;
	      if (restart || !this.state) {
	        // При перезапуске уровня, происходит полная перезапись состояния
	        // игры из изначального состояния.
	        this.state = this.getInitialState();
	        this.state = LevelsInitialize[this.level](this.state);
	      } else {
	        // При продолжении уровня состояние сохраняется, кроме записи о том,
	        // что состояние уровня изменилось с паузы на продолжение игры.
	        this.state.currentStatus = Verdict.CONTINUE;
	      }
	      // Запись времени начала игры и времени начала уровня.
	      this.state.levelStartTime = Date.now();
	      if (!this.state.startTime) {
	        this.state.startTime = this.state.levelStartTime;
	      }
	      this._preloadImagesForLevel(function() {
	        // Предварительная отрисовка игрового экрана.
	        this.render();
	        // Установка обработчиков событий.
	        this._initializeGameListeners();
	        // Запуск игрового цикла.
	        this.update();
	      }.bind(this));
	    },
	    /**
	     * Временная остановка игры.
	     * @param {Verdict=} verdict
	     */
	    pauseLevel: function(verdict) {
	      if (verdict) {
	        this.state.currentStatus = verdict;
	      }
	      this.state.keysPressed.ESC = false;
	      this.state.lastUpdated = null;
	      this._removeGameListeners();
	      window.addEventListener('keydown', this._pauseListener);
	      this._drawPauseScreen();
	    },
	    /**
	     * Обработчик событий клавиатуры во время паузы.
	     * @param {KeyboardsEvent} evt
	     * @private
	     * @private
	     */
	    _pauseListener: function(evt) {
	      if (evt.keyCode === 32 && !this._deactivated) {
	        evt.preventDefault();
	        var needToRestartTheGame = this.state.currentStatus === Verdict.WIN ||
	          this.state.currentStatus === Verdict.FAIL;
	        this.initializeLevelAndStart(needToRestartTheGame);
	        window.removeEventListener('keydown', this._pauseListener);
	      }
	    },
	    /**
	     * Отрисовка экрана паузы.
	     */
	    _drawPauseScreen: function() {
	      var ctx = this.ctx;
	      var maxWidth = 200;
	      var marginLeft = 230;
	      var marginTop = 60;
	      var lineHeight = 25;
	      ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
	      ctx.fillRect(230, 30, 250, 150);
	      ctx.fillStyle = '#FFFFFF';
	      ctx.fillRect(220, 20, 250, 150);
	      ctx.font = '18px PT Mono';
	      ctx.fillStyle = '#000000';
	      function drawPause(text) {
	        var words = text.split(' ');
	        var countWords = words.length;
	        var line = ' ';
	        for (var n = 0; n < countWords; n++) {
	          var testLine = line + words[n] + ' ';
	          var testWidth = ctx.measureText(testLine).width;
	          if (testWidth > maxWidth) {
	            ctx.fillText(line, marginLeft, marginTop);
	            line = words[n] + ' ';
	            marginTop += lineHeight;
	          } else {
	            line = testLine;
	          }
	        }
	        ctx.fillText(line, marginLeft, marginTop);
	      }
	      switch (this.state.currentStatus) {
	        case Verdict.WIN:
	          drawPause('Вы выиграли! Поздравляем с победой!!!');
	          break;
	        case Verdict.FAIL:
	          drawPause('Вы проиграли! Не отчаивайтесь и попробуйте еще раз.');
	          break;
	        case Verdict.PAUSE:
	          drawPause('Вы нажали на паузу! Еще раз на пробел чтобы снять с паузы.');
	          break;
	        case Verdict.INTRO:
	          drawPause('Приветсвуем Вас в игре! Начинаем сражение и вперед!');
	          break;
	      }
	    },
	    /**
	     * Предзагрузка необходимых изображений для уровня.
	     * @param {function} callback
	     * @private
	     */
	    _preloadImagesForLevel: function(callback) {
	      if (typeof this._imagesArePreloaded === 'undefined') {
	        this._imagesArePreloaded = [];
	      }
	      if (this._imagesArePreloaded[this.level]) {
	        callback();
	        return;
	      }
	      var keys = Object.keys(SpriteMap);
	      var imagesToGo = keys.length;
	      var self = this;
	      var loadSprite = function(sprite) {
	        var image = new Image(sprite.width, sprite.height);
	        image.onload = function() {
	          sprite.image = image;
	          if (--imagesToGo === 0) {
	            self._imagesArePreloaded[self.level] = true;
	            callback();
	          }
	        };
	        image.src = sprite.url;
	      };
	      for (var i = 0; i < keys.length; i++) {
	        loadSprite(SpriteMap[keys[i]]);
	      }
	    },
	    /**
	     * Обновление статуса объектов на экране. Добавляет объекты, которые должны
	     * появиться, выполняет проверку поведения всех объектов и удаляет те, которые
	     * должны исчезнуть.
	     * @param {number} delta Время, прошеднее с отрисовки прошлого кадра.
	     */
	    updateObjects: function(delta) {
	      // Персонаж.
	      var me = this.state.objects.filter(function(object) {
	        return object.type === ObjectType.ME;
	      })[0];
	      // Добавляет на карту файрбол по нажатию на Shift.
	      if (this.state.keysPressed.SHIFT) {
	        this.state.objects.push({
	          direction: me.direction,
	          height: 24,
	          speed: 5,
	          sprite: SpriteMap[ObjectType.FIREBALL],
	          type: ObjectType.FIREBALL,
	          width: 24,
	          x: me.direction & Direction.RIGHT ? me.x + me.width : me.x - 24,
	          y: me.y + me.height / 2
	        });
	        this.state.keysPressed.SHIFT = false;
	      }
	      this.state.garbage = [];
	      // Убирает в garbage не используемые на карте объекты.
	      var remainingObjects = this.state.objects.filter(function(object) {
	        ObjectsBehaviour[object.type](object, this.state, delta);
	        if (object.state === ObjectState.DISPOSED) {
	          this.state.garbage.push(object);
	          return false;
	        }
	        return true;
	      }, this);
	      this.state.objects = remainingObjects;
	    },
	    /**
	     * Проверка статуса текущего уровня.
	     */
	    checkStatus: function() {
	      // Нет нужны запускать проверку, нужно ли останавливать уровень, если
	      // заранее известно, что да.
	      if (this.state.currentStatus !== Verdict.CONTINUE) {
	        return;
	      }
	      if (!this.commonRules) {
	        /**
	         * Проверки, не зависящие от уровня, но влияющие на его состояние.
	         * @type {Array.<functions(Object):Verdict>}
	         */
	        this.commonRules = [
	          /**
	           * Если персонаж мертв, игра прекращается.
	           * @param {Object} state
	           * @return {Verdict}
	           */
	            function(state) {
	            var me = state.objects.filter(function(object) {
	              return object.type === ObjectType.ME;
	            })[0];
	            return me.state === ObjectState.DISPOSED ?
	              Verdict.FAIL :
	              Verdict.CONTINUE;
	          },
	          /**
	           * Если нажата клавиша Esc игра ставится на паузу.
	           * @param {Object} state
	           * @return {Verdict}
	           */
	            function(state) {
	            return state.keysPressed.ESC ? Verdict.PAUSE : Verdict.CONTINUE;
	          },
	          /**
	           * Игра прекращается если игрок продолжает играть в нее два часа подряд.
	           * @param {Object} state
	           * @return {Verdict}
	           */
	            function(state) {
	            return Date.now() - state.startTime > 3 * 60 * 1000 ?
	              Verdict.FAIL :
	              Verdict.CONTINUE;
	          }
	        ];
	      }
	      // Проверка всех правил влияющих на уровень. Запускаем цикл проверок
	      // по всем универсальным проверкам и проверкам конкретного уровня.
	      // Цикл продолжается до тех пор, пока какая-либо из проверок не вернет
	      // любое другое состояние кроме CONTINUE или пока не пройдут все
	      // проверки. После этого состояние сохраняется.
	      var allChecks = this.commonRules.concat(LevelsRules[this.level]);
	      var currentCheck = Verdict.CONTINUE;
	      var currentRule;
	      while (currentCheck === Verdict.CONTINUE && allChecks.length) {
	        currentRule = allChecks.shift();
	        currentCheck = currentRule(this.state);
	      }
	      this.state.currentStatus = currentCheck;
	    },
	    /**
	     * Принудительная установка состояния игры. Используется для изменения
	     * состояния игры от внешних условий, например, когда необходимо остановить
	     * игру, если она находится вне области видимости и установить вводный
	     * экран.
	     * @param {Verdict} status
	     */
	    setGameStatus: function(status) {
	      if (this.state.currentStatus !== status) {
	        this.state.currentStatus = status;
	      }
	    },
	    optimizedScroll: function() {
	      if (this.demoBlock.getBoundingClientRect().bottom <= 0 ) {
	        console.log('no game');
	        this.setGameStatus(Game.Verdict.PAUSE);
	      }
	    },
	    /**
	     * Отрисовка всех объектов на экране.
	     */
	    render: function() {
	      // Удаление всех отрисованных на странице элементов.
	      this.ctx.clearRect(0, 0, WIDTH, HEIGHT);
	      // Выставление всех элементов, оставшихся в this.state.objects согласно
	      // их координатам и направлению.
	      this.state.objects.forEach(function(object) {
	        if (object.sprite) {
	          var reversed = object.direction & Direction.LEFT;
	          var sprite = SpriteMap[object.type + (reversed ? REVERSED : '')] || SpriteMap[object.type];
	          this.ctx.drawImage(sprite.image, object.x, object.y, object.width, object.height);
	        }
	      }, this);
	    },
	    /**
	     * Основной игровой цикл. Сначала проверяет состояние всех объектов игры
	     * и обновляет их согласно правилам их поведения, а затем запускает
	     * проверку текущего раунда. Рекурсивно продолжается до тех пор, пока
	     * проверка не вернет состояние FAIL, WIN или PAUSE.
	     */
	    update: function() {
	      if (!this.state.lastUpdated) {
	        this.state.lastUpdated = Date.now();
	      }
	      var delta = (Date.now() - this.state.lastUpdated) / 10;
	      this.updateObjects(delta);
	      this.checkStatus();
	      switch (this.state.currentStatus) {
	        case Verdict.CONTINUE:
	          this.state.lastUpdated = Date.now();
	          this.render();
	          requestAnimationFrame(function() {
	            this.update();
	          }.bind(this));
	          break;
	        case Verdict.WIN:
	        case Verdict.FAIL:
	        case Verdict.PAUSE:
	        case Verdict.INTRO:
	          this.pauseLevel();
	          break;
	      }
	    },
	    /**
	     * @param {KeyboardEvent} evt [description]
	     * @private
	     */
	    _onKeyDown: function(evt) {
	      switch (evt.keyCode) {
	        case 37:
	          this.state.keysPressed.LEFT = true;
	          break;
	        case 39:
	          this.state.keysPressed.RIGHT = true;
	          break;
	        case 38:
	          this.state.keysPressed.UP = true;
	          break;
	        case 27:
	          this.state.keysPressed.ESC = true;
	          break;
	      }
	      if (evt.shiftKey) {
	        this.state.keysPressed.SHIFT = true;
	      }
	    },
	    /**
	     * @param {KeyboardEvent} evt [description]
	     * @private
	     */
	    _onKeyUp: function(evt) {
	      switch (evt.keyCode) {
	        case 37:
	          this.state.keysPressed.LEFT = false;
	          break;
	        case 39:
	          this.state.keysPressed.RIGHT = false;
	          break;
	        case 38:
	          this.state.keysPressed.UP = false;
	          break;
	        case 27:
	          this.state.keysPressed.ESC = false;
	          break;
	      }
	      if (evt.shiftKey) {
	        this.state.keysPressed.SHIFT = false;
	      }
	    },
	    /** @private */
	    _initializeGameListeners: function() {
	      window.addEventListener('keydown', this._onKeyDown);
	      window.addEventListener('keyup', this._onKeyUp);
	    },
	    /** @private */
	    _removeGameListeners: function() {
	      window.removeEventListener('keydown', this._onKeyDown);
	      window.removeEventListener('keyup', this._onKeyUp);
	    }
	  };
	  Game.Verdict = Verdict;
	  
	  var lastCall = Date.now();
	  var clouds = document.getElementsByClassName('header-clouds')[0];
	  window.addEventListener('scroll', parlx);
	  
	  function parlx() {
	    if (Date.now() - lastCall >= THROTTLE_TIMEOUT && clouds.getBoundingClientRect().bottom > 0) {
	      clouds.style.backgroundPositionX = parseInt(document.body.scrollTop * -0.5) + 'px';
	    }
	    lastCall = Date.now();
	  }
	
	
	    var throttle = function(type, name, obj) {
	      obj = obj || window;
	      var running = false;
	      var func = function() {
	        if (running) { return; }
	        running = true;
	        requestAnimationFrame(function() {
	          obj.dispatchEvent(new CustomEvent(name));
	          running = false;
	        });
	      };
	      obj.addEventListener(type, func);
	    };
	
	    throttle ("scroll", "optimizedScroll");
	
	
	  window.addEventListener("optimizedScroll", function() {
	    // Do your thing
	  });
	
	
	  // var optimizedScroll = throttle(function() {
	  //   if (!isVisible(document.querySelector('.game'))) {
	  //     window.game.setStatus(window.Game.Verdict.PAUSE);
	  //   }
	  // }, 100);
	  // window.addEventListener('scroll', optimizedScroll);
	
	  
	  return Game;
	  
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	
	


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';
	
	//отрисовка всего списка
	
	!(__WEBPACK_AMD_DEFINE_ARRAY__ = [__webpack_require__(4), __webpack_require__(5)], __WEBPACK_AMD_DEFINE_RESULT__ = function(Review, load) {
	  var REVIEWS_LOAD_URL = 'http://localhost:1507/api/reviews';
	  var pagesPerBlock = 3;
	  var pageNumber = 0;
	
	  var container = document.querySelector('.reviews-list');
	  var filters = document.querySelector('.reviews-filter');
	  var activeFilter = 'reviews-all';
	  var moreButton = document.querySelector('.reviews-controls-more');
	  moreButton.classList.remove('invisible');
	
	  var renderReviews = function(data) {
	    data.forEach(function(review) {
	      var reviewEl = new Review(review);
	      container.appendChild(reviewEl.element);
	    });
	  };
	
	  var loadReviews = function(filter, currentPage) {
	    load(REVIEWS_LOAD_URL, {
	      from: currentPage * pagesPerBlock,
	      to: currentPage * pagesPerBlock + pagesPerBlock,
	      filter: filter
	    }, renderReviews);
	  };
	
	  moreButton.addEventListener('click', function() {
	    loadReviews(activeFilter, ++pageNumber);
	  });
	
	  var changeFilter = function(filterID) {
	    container.innerHTML = '';
	    pageNumber = 0;
	    activeFilter = filterID;
	    loadReviews(filterID, pageNumber);
	  };
	
	  var change = filters.addEventListener('click', function(evt) {
	    if (evt.target.name === 'reviews') {
	      changeFilter(evt.target.id);
	    }
	  }, true);
	
	  changeFilter(activeFilter);
	
	}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;'use strict';
	
	//отрисовка одного элемента списка
	
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
	
	  var Review = function(data) {
	    this.data = data;
	    this.element = this.createReviewElement(data);
	    var self = this;
	    this.quizContainer = this.element.querySelector('.review-quiz');
	    this.quizElems = this.element.querySelectorAll('.review-quiz-answer');
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
	    this.remove = function() {
	      this.quizContainer.onclick = null;
	    };
	  };
	
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
	
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;'use strict';
	
	//загрузка с сервера
	
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
	  var getSearchString = function(params) {
	    return Object.keys(params).map(function(param) {
	      return [param, params[param]].join('=');
	    }).join('&');
	  };
	
	  return function(url, params, callback) {
	    var xhr = new XMLHttpRequest();
	
	    xhr.onload = function(evt) {
	      var loadedData = JSON.parse(evt.target.response);
	      callback(loadedData);
	    };
	
	    xhr.open('GET', url + '?' + getSearchString(params));
	
	    xhr.send();
	  };
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;'use strict';
	
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function() {
	  var Gallery = function(sources) {
	
	// Свойства объекта
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
	
	// Методы объекта
	
	//show принимает на вход число
	  Gallery.prototype.show = function(index) {
	//  Показывает фотогалерею, убирая у ее DOM-элемента класс invisible.
	    this.galleryContainer.classList.remove('invisible');
	//  Вызывает метод setActivePicture, передав в него параметром число,
	// которое было передано параметром в show.
	    this.setActivePicture(index);
	// Добавляем обработчики событий DOM-элементам галереи
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
	
	//setActivePicture принимает на вход число и записывает его в свойство activePicture.
	  Gallery.prototype.setActivePicture = function(index) {
	    this.activePicture = index;
	//Если в блоке overlay-gallery-preview уже есть фотография, ее нужно предварительно
	// удалить (или воспользоваться методом replaceChild).
	    if (this.activePictureImage) {
	      this.activePictureImage.parentNode.removeChild(this.activePictureImage);
	    }
	//После этого находит в массиве pictures фотографию с нужным индексом,
	// создает для нее DOM-элемент Image с помощью конструктора, записывает
	// ему src нужной фотографии и ставит его в конец блока overlay-gallery-preview.
	    this.activePictureImage = new Image();
	    this.activePictureImage.src = this.pictures[index];
	    this.picturesContainer.appendChild(this.activePictureImage);
	    this.activePictureImage.height = 300;
	    this.activePictureImage.width = 300;
	    this.previewNumber.textContent = index + 1;
	  };
	
	//     Обработчики событий
	
	// Обработчик события click по элементу gallery-overlay-close, который вызывает метод hide.
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
	
	  Gallery.prototype.moveleft = function() {
	    this.setActivePicture(Math.max(this.activePicture - 1, 0)); // чтобы индекс не был меньше нуля
	  };
	  // };
	  Gallery.prototype.moveright = function() {
	    this.setActivePicture(Math.min(this.activePicture + 1, this.pictures.length - 1)); //чтобы индекс
	    // не был больше последнего индекса в массиве картинок
	  };
	  return Gallery;
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }
]);
//# sourceMappingURL=1.js.map?dropcache