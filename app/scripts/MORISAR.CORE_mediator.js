'use strict';

MORISAR.namespace('MORISAR.CORE_mediator');

MORISAR.CORE_mediator = (function() {
	var subscribe = function(channel, fn) {
		if (!MORISAR.CORE_mediator.channels[channel]) MORISAR.CORE_mediator.channels[channel] = [];
		MORISAR.CORE_mediator.channels[channel].push({ context: this, callback: fn });
		return this;
	},
	
	publish = function(channel) {
		if (!MORISAR.CORE_mediator.channels[channel]) return false;
		var args = Array.prototype.slice.call(arguments, 1);
		for (var i = 0, l = MORISAR.CORE_mediator.channels[channel].length; i < l; i++) {
			var subscription = MORISAR.CORE_mediator.channels[channel][i];
			subscription.callback.apply(subscription.context, args);
		}
		return this;
	};
	
	return {
		channels: {},
		publish: publish,
		subscribe: subscribe,
		installTo: function(obj) {
			obj.subscribe = subscribe;
			obj.publish = publish;
		}
	};

}());

MORISAR.CORE_mediator.installTo(MORISAR.facade);

///////////////////////
// Subscribes modules //
///////////////////////

MORISAR.facade.subscribe('Document ready', function (objConfig) {
	MORISAR.facade.interface__stbInit(objConfig);
	MORISAR.facade.interface__startValidation(objConfig);
});

MORISAR.facade.subscribe('Scroll page', function (objConfig) {
	MORISAR.facade.interface__stbInit(objConfig);
});

MORISAR.facade.subscribe('Resize page', function (objConfig) {
	MORISAR.facade.interface__stbInit(objConfig);
});

MORISAR.facade.subscribe('Click on scroll button', function (objConfig) {
	MORISAR.facade.interface__stbInit(objConfig);
});

MORISAR.facade.subscribe('Change in form', function (objConfig) {
	MORISAR.facade.interface__startValidation(objConfig);
})

////////////////////////
// Publish to modules //
////////////////////////

$(document).ready(MORISAR.facade.publish('Document ready', {validationClass: '.form__validate-elem'}));

$(window).on('scroll', function(event) {
	MORISAR.facade.publish('Scroll page', {eventType: 'Scroll'});
});

$(window).on('resize', function(event) {
	MORISAR.facade.publish('Resize page', {eventType: 'Resize'});
});

MORISAR.module.scrollTopBtn.stbM__button().on('click', function(event) {
	event.preventDefault();
	MORISAR.facade.publish('Click on scroll button', {eventType: 'Click'});
});

$('.autoParth-box').on('change', function(event) {
	event.preventDefault();
	MORISAR.facade.publish('Change in form', {});
});