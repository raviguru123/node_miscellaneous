'use strict';

export default {
	"kafka_config" : {
		"kafkaHost" : "127.0.0.1:9092,127.0.0.1:9093,127.0.0.1:9094",
		"connectTimeout" : 10000,
		"requestTimeout" : 30000,
		"autoConnect" : true,
		"idleConnection" : 350000,
		"maxAsyncRequests" : 20,
		"requireAcks" : 1,
		"ackTimeoutMs" : 100,
		"partitionerType" : 2
	}
}