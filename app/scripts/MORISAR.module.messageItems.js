'use strict';

MORISAR.namespace('MORISAR.module.messageItems');

/**
 * Модуль составления сообщения
 * @param  {Object} system - функционал модуля
 * @return {Object}        - фасад модуля
 */
MORISAR.module.messageItems = (function () {
	
	var system = {

		/**
		 * Замена запятой точкой в конце массива строк
		 * @param  {Array} array - массив строк
		 * @return {Array}       - измененный массив строк
		 */
		cutComa: function (array) {
			var array_temp = array[array.length - 1].substring(0, array[array.length-1].length - 2);
			array.splice(array.length - 1, 1);
			array.push(array_temp + '.');
			return array;
		},

		/**
		 * Отображение текста (название невалидных полей форм)
		 * @param  {Array} array - массив строк
		 * @return {Boolean}     - статус модуля
		 */
		showInvalids: function (array) {
			if (!array.length) {
				$('.alert').hide();
				return true;
			} else {
				var array_temp = system.cutComa(array);
				$('.alert-text').empty();
				$('.alert-text').append(array_temp);
				$('.alert').show();
				return false;
			}
		}

	};

	return {
		miM__message: system.showInvalids
	}
	
}());
