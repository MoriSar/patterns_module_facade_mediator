'use strict';

MORISAR.namespace('MORISAR.module.validationData');

/**
 * Модуль организации данных валидируемых полей формы
 * @param  {Object} obj      - объект данных поля формы
 * @param  {Array}  arr      - массив объектов данных полей формы
 * @param  {Number} jqLength - количество валидируемых полей формы
 * @param  {Object} system   - функционал модуля
 * @return {Object}          - фасад модуля
 */
MORISAR.module.validationData = (function () {
	var obj = {},
	arr = [],
	jqLength = 0,
	system = {

		/**
		 * Создание объекта элемента формы
		 * @param  {Object} jq - jQuery объект, селектор класса валидируемых полей формы
		 * @return {Array}     - массив объектов данных полей формы
		 */
		getElems: function (jq) {
			arr = [];
			jqLength = jq.length;
			for (var i = 0; i < jqLength; i++) {
				
				var temp = $(jq[i]);

				obj = {
					name: temp.attr('name'),
					elemName: temp.attr('data-elemName'),
					validationType: temp.attr('data-validationType'),
					validStatus: false,
					jqObj: temp,
				};
				arr.push(obj);

			};
			return arr;
		},

		/**
		 * Вывести количество валидируемых полей формы
		 * @return {Number} - количчество валидируемых полей формы
		 */
		showElemsLength: function () {
			return jqLength;
		}
	};

	return {
		vdM__log: function () {
			return console.log(obj);
		},
		vdM__getElems: system.getElems,
		vdM__showElemsLength: system.showElemsLength
	};

}());
