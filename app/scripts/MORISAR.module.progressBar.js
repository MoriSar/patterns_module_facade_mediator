'use strict';

MORISAR.namespace('MORISAR.module.progressBar');

/**
 * Модуль прогресс-бар
 * @param  {Object} system - функционал модуля
 * @return {Object}   - фасад модуля
 */
MORISAR.module.progressBar = (function () {
	
	var system = {

		/**
		 * Обновление прогресс-бара
		 * @param  {Number} step     - шаг шкалы прогресс-бара
		 * @param  {Number} progress - степень прогресса
		 * @param  {Number} initStep - начальная степень прогресса
		 */
		startProgress: function (step, progress, initStep) {
			
			step += initStep;
			progress += initStep;

			var ratio = 100 / step,
			barWidth = (progress * ratio) + '%';

			$('.progress-bar').css('width', barWidth);

		}
	};

	return {
		pbM__startProgress: system.startProgress
	}

}());
