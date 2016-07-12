'use strict';

MORISAR.namespace('MORISAR.module.validationCore');

/**
 * модуль валидации полей формы
 * @param  {Number} elemsLength - количество валидируемых полей формы
 * @param  {Array} invalidElems - массив не прошедших валидацию объектов данных полей формы
 * @param  {Array} validElems   - массив прошедших валидацию объектов данных полей формы
 * @param  {Object} system      - функционал модуля
 * @return {Object}             - фасад модуля
 */
MORISAR.module.validationCore = (function () {
	var elemsLength = 0,
	invalidElems = [],
	validElems = [],

	system = {

		/**
		 * Выполнение действий с валидным элементом
		 * @param  {Object} elem - объект данных поля формы
		 */
		valid: function (elem) {
			elem.jqObj
			.removeClass('form__validate-elem_invalid')
			.addClass('form__validate-elem_valid');
			elem.validStatus = true;
		},

		/**
		 * Выполнение действий с невалидным элементом
		 * @param  {[type]} elem [description]
		 * @return {[type]}      [description]
		 */
		invalid: function (elem) {
			elem.jqObj
			.removeClass('form__validate-elem_valid')
			.addClass('form__validate-elem_invalid');
			elem.validStatus = false;
		},

		/**
		 * Валидация поля формы Email
		 * @param  {Object} elem - объект данных поля формы
		 * @return {Boolean}     - статус валидации
		 */
		validateMail: function (elem) {
			var reg_email = /^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/;
			if (reg_email.test(elem)) {
				return true;
			} else {
				return false;
			}
		},

		/**
		 * Запуск валидации всех указаных объектов полей формы
		 * @param  {Array} elemsArray - массив объектов валидируемых полей формы
		 * @param  {Object} objConfig - объект конфигурации модуля (класс валидируемых полей)
		 * @return {Boolean}          - false, если формата валидации не существует или не поддерживается
		 */
		validateAll: function (elemsArray, objConfig) {
			var elemsLength = elemsArray.length;

			invalidElems = [];
			validElems = [];
			
			for (var i = 0; i < elemsLength; i++) {

				if (elemsArray[i].validationType === 'simple') {
					if (!elemsArray[i].jqObj.val() && !elemsArray[i].validStatus) {
						system.invalid(elemsArray[i]);
						invalidElems.push(elemsArray[i].elemName + ', ');
					} else if (!elemsArray[i].jqObj.val() && elemsArray[i].validStatus) {
						system.invalid(elemsArray[i]);
						invalidElems.push(elemsArray[i].elemName + ', ');
					} else if (elemsArray[i].jqObj.val() && !elemsArray[i].validStatus) {
						system.valid(elemsArray[i]);
						validElems.push(elemsArray[i].elemName + ', ');
					}

				} else if (elemsArray[i].validationType === 'simple_grayFlag') {

					if (!elemsArray[i].jqObj.val() && !elemsArray[i].validStatus) {
						elemsArray[i].jqObj
						.removeClass('form__validate-elem_valid');
						elemsArray[i].validStatus = false;
						invalidElems.push(elemsArray[i].elemName + ', ');
					} else if (!elemsArray[i].jqObj.val() && elemsArray[i].validStatus) {
						elemsArray[i].jqObj
						.removeClass('form__validate-elem_valid');
						elemsArray[i].validStatus = false;
						invalidElems.push(elemsArray[i].elemName + ', ');
						
					} else if (elemsArray[i].jqObj.val() && !elemsArray[i].validStatus) {
						elemsArray[i].jqObj
						.addClass('form__validate-elem_valid');
						elemsArray[i].validStatus = true;
						validElems.push(elemsArray[i].elemName + ', ');
					}

				} else if (elemsArray[i].validationType === 'email') {

					if (!system.validateMail(elemsArray[i].jqObj.val()) && !elemsArray[i].validStatus) {
						system.invalid(elemsArray[i]);
						invalidElems.push(elemsArray[i].elemName + ', ');
					} else if (system.validateMail(elemsArray[i].jqObj.val()) && !elemsArray[i].validStatus) {
						system.valid(elemsArray[i]);
						validElems.push(elemsArray[i].elemName + ', ');
					} else if (!system.validateMail(elemsArray[i].jqObj.val()) && elemsArray[i].validStatus) {
						system.invalid(elemsArray[i]);
						invalidElems.push(elemsArray[i].elemName + ', ');
					}

				} else {
					console.error('Внимание! Формат валидации ' + elemsArray[i].validationType + ' не существует или не поддерживается!');
					return false;
				}

			};
		},

		/**
		 * Вывести массив не прошедших валидацию объектов данных полей формы
		 * @return {Array} - массив не прошедших валидацию объектов данных полей формы
		 */
		showInvalidElems: function () {
			return invalidElems;
		}
	}

	return {
		vcM__validate : system.validateAll,
		vcM__invalidElems: function () {
			return invalidElems;
		},
		vcM__validElemsLength: function () {
			return validElems.length;
		}
	}

}());
