'use strict';

MORISAR.namespace('MORISAR.facade');

MORISAR.facade = (function () {
	return {
		incaps: function (model) {
			for (var key in model) {
				this[key] = model[key];
			};
		},

		interface__stbInit: function (obj) {
			var isInit = false;
			isInit = this.stbM__init();
			if (isInit) {
				if (!obj.eventType) {
					return;
				} else if (obj.eventType === 'Scroll') {
					this.stbM__eScroll();
				} else if (obj.eventType === 'Click') {
					this.stbM__eClick();
				} else if (obj.eventType === 'Resize') {
					this.stbM__eResize();
				};

			} else {
				isInit = this.stbM__init();
			}
		}
		
	}
}());

MORISAR.facade.incaps(MORISAR.module.scrollTopBtn);


console.info(MORISAR.facade);