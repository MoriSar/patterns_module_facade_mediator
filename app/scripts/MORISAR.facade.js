'use strict';

MORISAR.namespace('MORISAR.facade');

MORISAR.facade = (function () {
	return {
		incaps: function (model) {
			for (var key in model) {
				this[key] = model[key];
			};
		},

		interface__stbInit: function (objConfig) {
			var isInit = false;
			isInit = this.stbM__init();
			if (isInit) {
				if (!objConfig.eventType) {
					return;
				} else if (objConfig.eventType === 'Scroll') {
					this.stbM__eScroll();
				} else if (objConfig.eventType === 'Click') {
					this.stbM__eClick();
				} else if (objConfig.eventType === 'Resize') {
					this.stbM__eResize();
				};

			} else {
				isInit = this.stbM__init();
			}
		},

		interface__startValidation: function (objConfig) {
			var elems = this.vdM__getElems($(objConfig.validationClass));
			this.vcM__validate(elems, objConfig);
		}
		
	}
}());

MORISAR.facade.incaps(MORISAR.module.scrollTopBtn);
MORISAR.facade.incaps(MORISAR.module.validationData);
MORISAR.facade.incaps(MORISAR.module.validationCore);


console.info(MORISAR.facade);