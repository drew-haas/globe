'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GoogleAnalytics = function () {
	function GoogleAnalytics() {
		_classCallCheck(this, GoogleAnalytics);

		this.id = 'UA-XXXXXX-X';
	}

	_createClass(GoogleAnalytics, [{
		key: 'init',
		value: function init() {
			console.info('Initing Google Analytics with ID: ' + this.id);
			window.dataLayer = window.dataLayer || [];
			function gtag() {
				dataLayer.push(arguments);
			}
			gtag('js', new Date());
			gtag('config', this.id);
		}
	}]);

	return GoogleAnalytics;
}();
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Global = function () {
	function Global() {
		_classCallCheck(this, Global);

		this.ga = new GoogleAnalytics();
		//this.main = new main();
	}

	_createClass(Global, [{
		key: "init",
		value: function init() {
			this.ga.init();
			//this.main.init();
		}
	}]);

	return Global;
}();

var global = new Global();
global.init();
//# sourceMappingURL=bundle.js.map
