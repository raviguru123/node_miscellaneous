'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _kafkaNode = require('kafka-node');

var _kafkaNode2 = _interopRequireDefault(_kafkaNode);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _q = require('q');

var _q2 = _interopRequireDefault(_q);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Admin = function () {
	function Admin(configParams) {
		_classCallCheck(this, Admin);

		this.configParams = configParams ? configParams : {};
		this.options = {};
		this.options.kafkaHost = _lodash2.default.get(this.configParams, "kafkaHost", _lodash2.default.get(_config2.default, "kafka_config.kafkaHost", ""));
		this.options.connectTimeout = _lodash2.default.get(this.configParams, "connectTimeout", _lodash2.default.get(_config2.default, "kafka_config.connectTimeout", ""));
		this.options.requestTimeout = _lodash2.default.get(this.configParams, "requestTimeout", _lodash2.default.get(_config2.default, "kafka_config.requestTimeout", ""));
		this.options.autoConnect = _lodash2.default.get(this.configParams, "autoConnect", _lodash2.default.get(_config2.default, "kafka_config.autoConnect", ""));
		this.options.idleConnection = _lodash2.default.get(this.configParams, "idleConnection", _lodash2.default.get(_config2.default, "kafka_config.idleConnection", ""));
		this.options.maxAsyncRequests = _lodash2.default.get(this.configParams, "maxAsyncRequests", _lodash2.default.get(_config2.default, "kafka_config.maxAsyncRequests", ""));
		this.options.requireAcks = _lodash2.default.get(this.configParams, "requireAcks", _lodash2.default.get(_config2.default, "kafka_config.requireAcks", ""));
		this.options.ackTimeoutMs = _lodash2.default.get(this.configParams, "ackTimeoutMs", _lodash2.default.get(_config2.default, "kafka_config.ackTimeoutMs", ""));
		this.options.partitionerType = _lodash2.default.get(this.configParams, "partitionerType", _lodash2.default.get(_config2.default, "kafka_config.partitionerType", ""));

		if (!this.options.kafkaHost) {
			console.log("Kafka host error");
			throw new Error("Kafka host is not defined");
		}
	}

	_createClass(Admin, [{
		key: 'connect',
		value: function connect(cb) {
			var _this = this;

			var defer = _q2.default.defer();
			console.log("Kafka Client init::", this.options);
			this.client = this.client ? this.client : new _kafkaNode2.default.KafkaClient(this.options);
			var message = "";
			this.client.on("ready", function () {
				message = "Kafka client is connected";
				_this._replyResponse(cb, defer, null, message);
			});

			this.client.on("error", function (err) {
				console.error("Error while connecting to kafka client::", err);
				message = "Fuck you, Please check condomn before fucking";
				_this._replyResponse(cb, defer, message, null);
			});
			return defer.promise;
		}
	}, {
		key: 'createTopics',
		value: function createTopics(topics, cb) {
			var _this2 = this;

			var defer = _q2.default.defer();
			if (!topics) {
				this._replyResponse(cb, defer, "Topics Field can't be empty", null);
			} else {
				if (!Array.isArray(topics)) {
					topics = [topics];
				}
				if (this.client) {
					this.client.createTopics(topics, function (err, result) {
						_this2.this._replyResponse(cb, defer, null, "topics created successfully");
					});
				} else {
					this.this._replyResponse(cb, defer, "Client is not created", null);
				}
			}
			return defer.promise;
		}
	}, {
		key: '_replyResponse',
		value: function _replyResponse(cb, deferred, error, data) {
			error ? deferred.reject(error) : deferred.resolve(data);
			if (cb) {
				error ? cb(error) : cb(null, data);
			}
		}
	}]);

	return Admin;
}();

module.exports = Admin;