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

MORISAR.facade.subscribe('Document ready', function (obj) {
	MORISAR.facade.interface__stbInit(obj);
})

MORISAR.facade.subscribe('Scroll event', function (obj) {
	MORISAR.facade.interface__stbInit(obj);
});

MORISAR.facade.subscribe('Click event', function (obj) {
	MORISAR.facade.interface__stbInit(obj);
});

MORISAR.facade.subscribe('Resize event', function (obj) {
	MORISAR.facade.interface__stbInit(obj);
});

////////////////////////
// Publish to modules //
////////////////////////

$(document).ready(MORISAR.facade.publish('Document ready', {}));

$(window).on('scroll', function(event) {
	MORISAR.facade.publish('Scroll event', {eventType: 'Scroll'});
});

$(window).on('resize', function(event) {
	MORISAR.facade.publish('Resize event', {eventType: 'Resize'});
});

MORISAR.module.scrollTopBtn.stbM__button().on('click', function(event) {
	MORISAR.facade.publish('Click event', {eventType: 'Click'});
});