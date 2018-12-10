'use strict'

const 
	cluster = require('cluster'),
	http	= require('http'),
	cpus 	= require('os').cpus().length;


//console.log(`Total number of cpu is my system :: ${cpus}`);

if(cluster.isMaster) {
	master_process();
}

else {
	child_process();
}

function master_process() {
	console.log("Master function is called");
	var workers = []
	for(let i = 0; i < cpus; i++) {
		let worker = cluster.fork();
		workers.push(worker);
		// Listen message send by workers
		worker.on('message', function(message) {
				console.log(`Master process receive a message:: ${JSON.stringify(message)} from worker proess id :: ${worker.process.pid}`)
		});
	}
	// send message to workers
	workers.forEach(function(worker) {
		console.log(`Send Message to workers from Master:: ${worker.process.pid}`);
		worker.send({msg: `Message send from parent process to workers :: ${process.pid}`});
	});
	console.log("Total number of core in my system::", cpus);
	console.log(`Master process is running and process id:: ${process.pid}`);
	// process.exit();
}

function child_process() {
	console.log("##########::", process.pid);
	console.log(`Child Process is running and process id :: ${process.pid}`);
	process.on('message', function(message) {
		console.log(`${JSON.stringify(message)} and process id:: ${process.pid}`);
	});
	process.send({msg : `Message send to Parent process :: ${process.pid}`});
	//process.send({msg : `Message send from worker :: ${process.pid}`})	
}







