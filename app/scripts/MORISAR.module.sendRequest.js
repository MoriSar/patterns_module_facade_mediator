'use strict';

MORISAR.namespace('MORISAR.module.sendRequest');

/**
 * Модуль отправки запроса
 * @param  {Object} system - функционал модуля
 * @return {Object}   		 - фасад модуля
 */
MORISAR.module.sendRequest = (function () {
	
	var system = {
		/**
		 * Отправка запроса
		 * @param  {Boolean} arg  - флаг отправки запроса
		 * @param  {Object} event - объект event
		 * @return {Boolean}      - статус запроса
		 */
		send: function (arg, event) {
			if (arg) {
				console.info('Запрос отправлен!');
				return true;
			} else {
				event.preventDefault();
				console.info('Незаполнены поля!');
				return false;
			}

		}
	};

	return {
		srM__send: system.send
	}
	
}());
