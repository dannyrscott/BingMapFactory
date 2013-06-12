/*! BingMapsFactory - v0.0.1 - 2013-06-11
* https://github.com/dannyrscott/BingMapFactory
* Copyright (c) 2013 Danny Scott; Licensed MIT */
/*global Microsoft*/
(function(exports) {

	'use strict';
	/* Extend Function
    *  Taken from underscore http://underscorejs.org/
	*/
	var _extend = function(obj) {
		Array.prototype.slice.call(arguments, 1).forEach(function(source) {
			if (source) {
				for (var prop in source) {
					obj[prop] = source[prop];
				}
			}
		});
		return obj;
	};
	var MM,
		_events = [], //Holds the bound map events
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

		this.opts = _extend(defaultOpts,opts);
		this.opts.credentials = this.opts.apiKey;
		var centerPoint = this.opts.center;
		this.opts.center = new MM.Location(centerPoint.lat,centerPoint.lng);
		this.div = div || [];

	};

	BingMap.prototype.load = function() {
		this.map = new MM.Map(this.div,this.opts);

		return this;
	};

	BingMap.prototype.bind = function(event,func,opts) {
		var eventOpts = {
			throttled: true,
			delay: 3000
		};
		eventOpts = _extend(eventOpts,opts);
		if (!func || !event) {
			return this;
		}
		eventOpts.eventName = eventOpts.eventName || event;

		if (eventOpts.throttled) {
			_events[eventOpts.eventName] = MM.Events.addThrottledHandler(this.map, event, func,eventOpts.delay);
		} else {
			_events[eventOpts.eventName] =  MM.Events.addHandler(this.map, event, func);
		}

		return this;
	};

	BingMap.prototype.unbind = function(event) {
		if (!event) {
			return this;
		}
		if (_events[event]) {
			MM.Events.removeHandler(_events[event]);
		}

		return this;
	};

	BingMap.prototype.addPin = function(opts) {
		var pinOpts = {

		};

		pinOpts = _extend(pinOpts,opts);
		var pin = new MM.Pushpin(new MM.Location(pinOpts.lat,pinOpts.lng),pinOpts);
		this.map.entities.push(pin);

		return this;
	};

	exports.BingMap = BingMap;

}(typeof exports === 'object' && exports || this));
