'use strict';
import config from './config';
import kafka from 'kafka-node';
import _ from 'lodash';
import Q from 'q';

class Admin {
	constructor(configParams) {
		this.configParams = configParams ? configParams : {};
		
		this.options = {};
		this.options.kafkaHost = _.get(this.configParams, "kafkaHost", _.get(config, "kafka_config.kafkaHost", "")); 
		this.options.connectTimeout = _.get(this.configParams, "connectTimeout", _.get(config, "kafka_config.connectTimeout", "")); 
		this.options.requestTimeout = _.get(this.configParams, "requestTimeout", _.get(config, "kafka_config.requestTimeout", "")); 
		this.options.autoConnect = _.get(this.configParams, "autoConnect", _.get(config, "kafka_config.autoConnect", "")); 
		this.options.idleConnection = _.get(this.configParams, "idleConnection", _.get(config, "kafka_config.idleConnection", "")); 
		this.options.maxAsyncRequests = _.get(this.configParams, "maxAsyncRequests", _.get(config, "kafka_config.maxAsyncRequests", "")); 
		this.options.requireAcks = _.get(this.configParams, "requireAcks", _.get(config, "kafka_config.requireAcks", "")); 
		this.options.ackTimeoutMs = _.get(this.configParams, "ackTimeoutMs", _.get(config, "kafka_config.ackTimeoutMs", "")); 
		this.options.partitionerType = _.get(this.configParams, "partitionerType", _.get(config, "kafka_config.partitionerType", "")); 
		
		if(!this.options.kafkaHost) {
				console.log("Kafka host error");
				throw new Error("Kafka host is not defined");
			}
	}

	connect(cb) {
		let defer = Q.defer();
		this.client = this.client ? this.client : new kafka.kafkaClient(this.options);
		var message = "";
		this.client.on("ready", () => {
			message = "Kafka client is connected";
			_replyResponse(cb, defer, null, message);
		});

		this.client.on("error", () => {
			message = "Fuck you, Please check condomn before fucking";
			_replyResponse(cb, defer, message, null);
		});
		return defer.promise;
	}

	createTopics(topics, cb) {
		let defer = Q.defer();
		if(!topics) {
			self._replyResponse(cb, defer, "Topics Field can't be empty", null);
		}
		else {
			if(!Array.isArray(topics)) {
				topics = [topics];
			}
			if(this.client) {
				this.client.createTopics(topics, (err, result)=> {
					this._replyResponse(cb, defer, null, "topics created successfully")
				});
			}
			else {
				this._replyResponse(cb, defer, "Client is not created", null);
			}
		}
}


	_replyResponse(cb, deferred, error, data) {
		error ? deferred.resolve(data) : deferred.reject(error);
		if(cb) {
			error ? cb(error) : cb(null, data);
		}
	}
}




module.exports = Admin;