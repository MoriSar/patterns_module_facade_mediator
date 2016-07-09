'use strict';

MORISAR.namespace('MORISAR.module.validationData');

MORISAR.module.validationData = (function () {
	var obj = {},
	arr = [],
	jqLength = 0,
	system = {

		getElems: function (jq) {
			jqLength = jq.length;
			for (var i = 0; i < jqLength; i++) {
				
				var temp = $(jq[i]);

				obj = {
					name: temp.attr('name'),
					elemName: temp.attr('data-elemName'),
					validationType: temp.attr('data-validationType'),
					validStatus: false,
					jqObj: temp
				};
				arr.push(obj);

			};
			return arr;
		},

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
