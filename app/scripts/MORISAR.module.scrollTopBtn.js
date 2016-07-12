'use strict';

MORISAR.namespace('MORISAR.module.scrollTopBtn');

/**
 * Модуль кнопки "скролл наверх"
 * @param  {Object} cfg       - параметры кнопки
 * @param  {Object} jqObjects - jQuery объекты кнопки и ее текста
 * @param  {Object} system    - функционал модуля
 * @param  {Object} behavior  - методы событий модуля
 * @return {Object}           - фасад модуля
 */
MORISAR.module.scrollTopBtn = (function () {

	var cfg = {
		clickCaunter: false,
		isShowBtn: false,
		scrollTopValue: 0,
		container: '.container',
		minBtnWidth: 100,
		showPosition: 300,
		btnElemClass: '.upDown',
		btnElemTextClass: '.upDown__text'
	},

	jqObjects = {
		$btnElem: $(cfg.btnElemClass),
		$btnElemText: $(cfg.btnElemTextClass),
	},

	system = {
		/**
		 * Изменение параметров кнопки при ее инициализации
		 * @param {Object} obj - объект изменяемых параметров кнопки
		 */
		setCfg: function (obj) {
			for (var key in obj) {
				cfg[key] = obj[key];
			};
		},

		/**
		 * Установка ширины кликабельной зоны кнопки
		 * @param  {Number} val - значение, заданное вручную
		 * @return {Number}     - значение ширины
		 */
		widthBlock: function (val) {
			var temp = val || $(cfg.container).offset().left;
			return temp;
		},

		/**
		 * Отображение кнопки
		 * @return {Boolean} - статус отображения кнопки
		 */
		showBtn: function () {
			if (!cfg.clickCaunter) {
				jqObjects.$btnElem.css({
					width: this.widthBlock(),
					left: -this.widthBlock()
				});
				cfg.isShowBtn = false;
			};
			if ($(window).scrollTop() > cfg.showPosition) {
				jqObjects.$btnElem.css({
					width: this.widthBlock(),
					left: 0
				});
				cfg.clickCaunter = false;
				jqObjects.$btnElemText.text('Наверх').removeClass('active');
				cfg.isShowBtn = true;
			};
			return cfg.isShowBtn;
		},

		/**
		 * Проверка контента на предмет минимально разрешенной его ширины для отображения кнопки
		 */
		checkWindth: function () {
			var temp = this.widthBlock();
			if (temp < cfg.minBtnWidth) {
				jqObjects.$btnElem.hide();
			} else {
				jqObjects.$btnElem.show();
				this.showBtn();
			}
		}
	},

	behavior = {
		eventClick: function (event) {
			if (!cfg.clickCaunter) {
				cfg.clickCaunter = true;
				cfg.scrollTopValue = $(window).scrollTop();
				$(window).scrollTop(0);
				jqObjects.$btnElemText.text(' ').addClass('active');
			} else {
				cfg.clickCaunter = false;
				$(window).scrollTop(cfg.scrollTopValue);
				cfg.scrollTopValue = 0;
				jqObjects.$btnElemText.text('Наверх').removeClass('active');
				cfg.isShowBtn = true;
			};
			jqObjects.$btnElem.css({
				width: system.widthBlock(),
				left: 0
			});
		},

		eventScroll: function (event) {
			if (!cfg.isShowBtn) {
				system.showBtn();
			} else if ($(window).scrollTop() < cfg.showPosition && cfg.isShowBtn) {
				system.showBtn();
			} else if ($(window).scrollTop() > cfg.showPosition && cfg.clickCaunter) {
				jqObjects.$btnElemText.text('Наверх').removeClass('active');
				cfg.clickCaunter 
			};
		},

		eventResize: function (event) {
			system.checkWindth();
		}
	}

	return {

		stbM__init: function (cfgObj) {
			system.setCfg(cfgObj);
			system.checkWindth();
			system.showBtn();
			return true;
		},

		stbM__button: function () {
			return jqObjects.$btnElem;
		},

		stbM__eClick: behavior.eventClick,

		stbM__eScroll: behavior.eventScroll,

		stbM__eResize: behavior.eventResize
	}

}());
