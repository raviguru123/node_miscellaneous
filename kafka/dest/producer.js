'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _admin2 = require('./admin');

var _admin3 = _interopRequireDefault(_admin2);

var _kafkaNode = require('kafka-node');

var _kafkaNode2 = _interopRequireDefault(_kafkaNode);

var _q = require('q');

var _q2 = _interopRequireDefault(_q);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Producer = function (_admin) {
	_inherits(Producer, _admin);

	function Producer(configParams) {
		_classCallCheck(this, Producer);

		return _possibleConstructorReturn(this, (Producer.__proto__ || Object.getPrototypeOf(Producer)).call(this, configParams));
	}

	_createClass(Producer, [{
		key: '_initClient',
		value: function _initClient(cb) {
			this.connect();
		}
	}, {
		key: 'initProducer',
		value: function initProducer(producerType, cb) {
			var defer = _q2.default.defer();
			if (!(producerType == "simple" || producerType == "")) {
				this._replyResponse(cb, defer, "Please defined what kind of producer you are::::", null);
			} else {
				this.producer = producerType == "simple" ? new _kafkaNode2.default.Producer(this.client) : new _kafkaNode2.default.HighLevelProducer(this.client);
				this._bindListener(cb, defer);
			}
			return defer.promise;
		}
	}, {
		key: '_bindListener',
		value: function _bindListener(cb, defer) {
			var _this2 = this;

			this.producer.on("ready", function () {
				console.log("reday");
				_this2._replyResponse(cb, defer, null, "Kafka producer is ready to produce");
			});

			this.producer.on("error", function () {
				console.log("error");
				_this2._replyResponse(cb, defer, "Kafka producer produce error", null);
			});

			this.producer.on("SIGTERM", function () {
				console.log("SIGTERM");
				_this2._replyResponse(cb, defer, "sigterm signal received", null);
			});
		}
	}, {
		key: 'sendMessage',
		value: function sendMessage(payloads, cb) {
			var _this3 = this;

			var defer = _q2.default.defer();
			if (this.producer) {
				this.producer.send(payloads, function (error, data) {
					if (!error) {
						_this3._replyResponse(cb, defer, null, data);
					} else {
						_this3._replyResponse(cb, defer, error, null);
					}
				});
			} else {
				this._replyResponse(cb, defer, "Please create producer first", null);
			}
			return defer.promise;
		}
	}]);

	return Producer;
}(_admin3.default);

module.exports = Producer;