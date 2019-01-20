'use strict';

import admin from './admin';
import kafka from 'kafka-node';
import Q from 'q';

class Producer extends admin {

	constructor(configParams) {
		super(configParams);
	}

	_initClient(cb) {
		this.connect();
	}

	initProducer(producerType, cb) {
		var defer = Q.defer();
		if(!(producerType == "simple" || producerType == "")) {
			//console.error("Please defined what kind of producer you are::::");
			this._replyResponse(cb, defer, "Please defined what kind of producer you are::::", null);
		}
		else {
			this.producerType = producerType;
			this.producer = (this.producerType == "simple") ? new kafka.producer(this.client) : new kafka.HighLevelProducer(this.client); 
			this._bindListener(cb, defer);
		}
		return defer;
	}

	_bindListener(cb, defer) {
		this.producer.on("ready", () => {
			this._replyResponse(cb, defer, null, "Kafka producer is ready to produce");
		});

		this.producer.on("error", () => {
			this._replyResponse(cb, defer, "Kafka producer produce error", null);
		});

		this.producer.on("SIGTERM", () => {
			this._replyResponse(cb, defer, "sigterm signal received", null);
		});
	}


	sendMessage(payloads, cb) {
		var defer = Q.defer();
		if(this.producer) {
			this.producer.send(payloads, (error, data) => {
				if(!err) {
					this._replyResponse(cb ,defer, null, "successfull send data")	
				}
				else {
					this._replyResponse(cb ,defer, error, null);
				}
			})
		}
		else {
			this._replyResponse(cb ,defer, "Please create producer first", null);
		}
	}
}

module.exports = Producer;