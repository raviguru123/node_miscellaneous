'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _admin2 = require('./admin');

var _admin3 = _interopRequireDefault(_admin2);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _kafkaNode = require('kafka-node');

var _kafkaNode2 = _interopRequireDefault(_kafkaNode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Consumer = function (_admin) {
	_inherits(Consumer, _admin);

	function Consumer(configParams) {
		_classCallCheck(this, Consumer);

		return _possibleConstructorReturn(this, (Consumer.__proto__ || Object.getPrototypeOf(Consumer)).call(this, configParams));
		//var 
		//consumerConfigParams = Object.assign({},config.kafka_config);
		//consumerConfigParams = Object.assign(consumerConfigParams, config.consumer_config);
		// consumerConfigParams = Object.assign(consumerConfigParams, configParams);
		// this.options = consumerConfigParams;
	}

	_createClass(Consumer, [{
		key: '_initClient',
		value: function _initClient() {
			console.log("connect function called+++++++++++++++");
			this.connect();
		}
	}, {
		key: 'initConsumer',
		value: function initConsumer(topic, cb) {
			if (topic) {
				console.log("topic========", topic);
				var consumer = new _kafkaNode2.default.Consumer(this.client, [{ topic: 'test', partition: 0 }]);
				//console.log("consumer",consumer);
				consumer.on("messgae", function (message) {
					console.log("Message from Cosumer::", message);
					cb(null, message);
				});

				consumer.on("error", function (error) {
					console.log("Error occured while Fetching data from kafka");
					cb(error);
				});

				consumer.on("offsetOutOfRange", function (error) {
					console.error("offsetOutOfRange error", error);
					cb(error);
				});
			} else {
				console.log("Else Execution occured");
				cb("Please defined kafka topic before creating consumer");
			}
		}
	}]);

	return Consumer;
}(_admin3.default);

module.exports = Consumer;