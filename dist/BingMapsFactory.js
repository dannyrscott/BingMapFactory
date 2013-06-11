/*! BingMapsFactory - v0.0.1 - 2013-06-11
* https://github.com/dannyrscott/BingMapFactory
* Copyright (c) 2013 Danny Scott; Licensed MIT */
/*! BingMapsFactory - v0.0.1 - 2013-06-11
* https://github.com/dannyrscott/BingMapFactory
* Copyright (c) 2013 Danny Scott; Licensed MIT */
/*global $, Microsoft*/
(function(exports) {

	'use strict';

	var MM,
		defaultOpts = {
			credentials: "",
			zoom: 17
		};

	var BingMap = function(div,opts) {
		if (!exports.Microsoft || !exports.Microsoft.Maps) {
			throw 'Microsoft Maps not loaded :(';
		}

		MM = Microsoft.Maps;

		opts = opts || {};

		this.opts = $.extend(opts,defaultOpts);
		this.opts.credentials = this.opts.apiKey;
		var centerPoint = this.opts.center;
		this.opts.center = new MM.Location(centerPoint.lat,centerPoint.lng);
		this.div = $(div) || [];
	};

	BingMap.prototype.load = function() {
		this.map = new MM.Map(this.div[0],this.opts);

		return this;
	};

	BingMap.prototype.bind = function(event,func,opts) {
		var eventOpts = {
			throttled: true,
			delay: 3000
		};
		eventOpts = $.extend(opts,eventOpts);

		if (!func || !event) {
			return this;
		}
		if (eventOpts.throttled) {
			MM.Events.addThrottledHandler(this.map, event, func,eventOpts.delay);
		} else {
			MM.Events.addHandler(this.map, event, func);
		}


		return this;
	};

	BingMap.prototype.addPin = function(opts) {
		var pinOpts = {

		};

		pinOpts = $.extend(opts,pinOpts);
		var pin = new MM.Pushpin(new MM.Location(pinOpts.lat,pinOpts.lng),pinOpts);
		this.map.entities.push(pin);

		return this;
	};

	exports.BingMap = BingMap;

}(typeof exports === 'object' && exports || this));
