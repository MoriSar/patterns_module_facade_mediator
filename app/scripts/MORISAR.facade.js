'use strict';

MORISAR.namespace('MORISAR.facade');

/**
 * Фасад приложения
 * @return {[type]}    
 */
MORISAR.facade = (function () {
	return {
		/**
		 * Инкапсуляция модулей в фасаде
		 * @param  {Object} module - подключаемый модуль
		 */
		incaps: function (module) {
			for (var key in module) {
				this[key] = module[key];
			};
		},

		/**
		 * Интерфейс кнопки "скролл наверх"
		 * @param  {Object} objConfig - объект конфигурации
		 */
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

		/**
		 * Интерфейс запуска валидации форм
		 * @param  {Object} objConfig - объект конфигурации
		 */
		interface__startValidation: function (objConfig) {
			this.vcM__validate(this.vdM__getElems($(objConfig.validationClass)), objConfig);
			this.pbM__startProgress(this.vdM__showElemsLength(), this.vcM__validElemsLength(), 1);
		},

		/**
		 * Интерфейс отправки запроса
		 * @param  {Object} objConfig - объект конфигурации
		 * @param  {Object} event     - объект event
		 */
		interface__sendRequest: function (objConfig, event) {
			this.interface__startValidation(objConfig);
			this.srM__send(this.miM__message(this.vcM__invalidElems()), event);
		}
		
	}
}());

MORISAR.facade.incaps(MORISAR.module.scrollTopBtn);
MORISAR.facade.incaps(MORISAR.module.validationData);
MORISAR.facade.incaps(MORISAR.module.validationCore);
MORISAR.facade.incaps(MORISAR.module.progressBar);
MORISAR.facade.incaps(MORISAR.module.messageItems);
MORISAR.facade.incaps(MORISAR.module.sendRequest);
