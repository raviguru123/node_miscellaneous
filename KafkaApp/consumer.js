var 	
		_ 	= require('lodash');
		Q   = require('q'),
		TOPIC = process.env.topic || "test";




function Consumer(config) {
	var self = this;
		this.consumer = _.get(config, "CONSUMER", {});
}


Consumer.prototype.init = function() {
	console.log("Consumer init function called");
	var self = this;
	Q(undefined)
	.then(function() {
		return self.consumer._initClient();
	})
	.then(function(response) {
		self.consumer.initConsumer(TOPIC,self.messageProcess);
	})
	.catch(function(error) {
		console.error("Error occured in kafka consumer chain::",error);
	})

}

Consumer.prototype.messageProcess = function(error, message) {
	if(error) {
		console.log("error occured while fetching message from topic",error);
	}
	else {
		console.log("Message Received from Kafka=====>",message);
	}
}


module.exports = Consumer;