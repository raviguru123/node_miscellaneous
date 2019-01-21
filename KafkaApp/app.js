var 
	express  = require("express"),
	app      = express(),
	port     = process.env.port || 3000,
	kafka 	 = require('../kafka'),
	program  = require('commander'),
	producer = require('./producer.js'),
	Consumer = require('./consumer.js'),
	_ 		 = require('lodash'),
	PRODUCER = kafka.Producer,
	CONSUMER = kafka.Consumer;


program
	.option('-p, --producer', 'Application run as Producer')
	.option('-c, --consumer', 'Application run as a Consumer').
	parse(process.argv);


if(program.producer) {
	console.log("<========== App is running in producer mode ========>");
	var 
		kafkaHost = process.env.host || "",
		kafkaConfig = {},
		config    = {};

		//_.set(kafkaConfig, "kafkaHost",kafkaHost)
		config.PRODUCER = new PRODUCER(kafkaConfig);
	var 
		producer = new producer(config);
		producer.init();
}

if(program.consumer) {
	console.log("<============ App is running is Consumer ===========>");
	var 
		kafkaConfig = {},
		config = {};

		config.CONSUMER =  new CONSUMER(config);
	var 
		consumer = new Consumer(config);
		consumer.init();

}



app.listen(port, function(err) {
	if(err) 
		throw err;
	console.log("###### Server is running on port = "+port);
}) 





	






