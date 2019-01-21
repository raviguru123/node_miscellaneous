'use strict';

import admin from './admin';
import config from './config';
import kafka from 'kafka-node';

class Consumer extends admin {
	constructor(configParams) {
		super(configParams);
		//var 
			//consumerConfigParams = Object.assign({},config.kafka_config);
			//consumerConfigParams = Object.assign(consumerConfigParams, config.consumer_config);
			// consumerConfigParams = Object.assign(consumerConfigParams, configParams);
			// this.options = consumerConfigParams;
	}

	_initClient() {
		console.log("connect function called+++++++++++++++");
		this.connect();
	}


	initConsumer(topic, cb) {
		if(topic) {
			console.log("topic========", topic)
			var consumer = new kafka.Consumer(
				 this.client,
        		 [{ topic: 'test', partition: 0 }]
        		);
			//console.log("consumer",consumer);
			consumer.on("messgae", (message) => {
				console.log("Message from Cosumer::",message);
				cb(null,message);
			});

			consumer.on("error", (error) => {
				console.log("Error occured while Fetching data from kafka");
				cb(error);
			});

			consumer.on("offsetOutOfRange", (error) => {
				console.error("offsetOutOfRange error",error);
				cb(error);
			});
		}
		else {
			console.log("Else Execution occured");
			cb("Please defined kafka topic before creating consumer");
		}
	}
}


module.exports = Consumer;