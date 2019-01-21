'use strict';

var _admin = require('./admin');

var _admin2 = _interopRequireDefault(_admin);

var _producer = require('./producer');

var _producer2 = _interopRequireDefault(_producer);

var _consumer = require('./consumer');

var _consumer2 = _interopRequireDefault(_consumer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = {
	Admin: _admin2.default,
	Producer: _producer2.default,
	Consumer: _consumer2.default
};