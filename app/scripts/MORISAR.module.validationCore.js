'use strict';

MORISAR.namespace('MORISAR.module.validationCore');

MORISAR.module.validationCore = (function () {
	var elemsLength = 0,
	invalidElems = [],
	validElems = [],

	system = {
		valid: function (elem) {
			elem.jqObj
			.removeClass('form__validate-elem_invalid')
			.addClass('form__validate-elem_valid');
			elem.validStatus = true;
		},
		invalid: function (elem) {
			elem.jqObj
			.removeClass('form__validate-elem_valid')
			.addClass('form__validate-elem_invalid');
			elem.validStatus = false;
		},

		validateMail: function (elem) {
			var reg_email = /^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/;
			if (reg_email.test(elem)) {
				return true;
			} else {
				return false;
			}
		},

		validateAll: function (elemsArray, objConfig) {
			var elemsLength = elemsArray.length;
			invalidElems = [];
			validElems = [];
			
			for (var i = 0; i < elemsLength; i++) {

				if (elemsArray[i].validationType === 'simple') {
					if (!elemsArray[i].jqObj.val()) {
						system.invalid(elemsArray[i]);
						invalidElems.push(elemsArray[i].elemName);
						
					} else if (elemsArray[i].jqObj.val()) {
						system.valid(elemsArray[i]);
						validElems.push(elemsArray[i].elemName);
					}

				} else if (elemsArray[i].validationType === 'simple_grayFlag') {

					if (!elemsArray[i].jqObj.val()) {
						elemsArray[i].jqObj
						.removeClass('form__validate-elem_valid');
						elemsArray[i].validStatus = false;
						invalidElems.push(elemsArray[i].elemName);
						
					} else if (elemsArray[i].jqObj.val()) {
						elemsArray[i].jqObj
						.addClass('form__validate-elem_valid');
						elemsArray[i].validStatus = true;
						validElems.push(elemsArray[i].elemName);
					}

				} else if (elemsArray[i].validationType === 'email') {

					if (system.validateMail(elemsArray[i].jqObj.val())) {
						system.valid(elemsArray[i]);
						validElems.push(elemsArray[i].elemName);
					} else {
						system.invalid(elemsArray[i]);
						invalidElems.push(elemsArray[i].elemName);
					}

				} else {
					console.error('Внимание! Формат валидации ' + elemsArray[i].validationType + ' не существует или не поддерживается!');
					return false;
				}

			};
			console.log(invalidElems);
			console.log(validElems.length);
		},

		showInvalidElems: function () {
			return invalidElems;
		}
	}

	return {
		vcM__validate : system.validateAll,
		vcM__invalidElems: function () {
			return invalidElems;
		},
		vcM__validElemsength: function () {
			return validElems.length;
		}
	}

}());
