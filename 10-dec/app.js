'use strict'
const 

	express = require('express'),
	app 	= express(),
	http 	= require('http'),
	PROC 			= require('ptmproc'),

	port 	= process.env.PORT || 3000;




console.log("**************NODE TEST SERVER STARTED**********************");
console.log("**************NODE TEST SERVER STARTED**********************");

console.log("**************NODE TEST SERVER STARTED**********************");
console.log("**************NODE TEST SERVER STARTED**********************");
console.log("**************NODE TEST SERVER STARTED**********************");
console.log("**************NODE TEST SERVER STARTED**********************");

console.log("**************NODE TEST SERVER STARTED**********************");
console.log("**************NODE TEST SERVER STARTED**********************");

console.log("**************NODE TEST SERVER STARTED**********************");
console.log("**************NODE TEST SERVER STARTED**********************");

console.log("**************NODE TEST SERVER STARTED**********************");
console.log("**************NODE TEST SERVER STARTED**********************");

console.log("**************NODE TEST SERVER STARTED**********************");
console.log("**************NODE TEST SERVER STARTED**********************");

console.log("**************NODE TEST SERVER STARTED**********************");
console.log("**************NODE TEST SERVER STARTED**********************");
console.log("**************NODE TEST SERVER STARTED**********************");
console.log("**************NODE TEST SERVER STARTED**********************");

console.log("**************NODE TEST SERVER STARTED**********************");
console.log("**************NODE TEST SERVER STARTED**********************");

console.log("**************NODE TEST SERVER STARTED**********************");
console.log("**************NODE TEST SERVER STARTED**********************");

console.log("**************NODE TEST SERVER STARTED**********************");
console.log("**************NODE TEST SERVER STARTED**********************");


PROC.init();

app.get("/test", function(request, response) {
	check(request, response, 0); 
});

app.all("*", function(request, response) {
	console.log("Request come", new Date());
	response.status(200).send("Response from default route");
})


function check(request, response, count) {
	
	if(count < 2) {
		setTimeout(function() {
			check(request, response, count+1)
		}, 100)
		//check(request, response, count+1);
	}
	
	else {
		console.log('response sent to client');
		response.status(200).send("*********************\nWELCOCME TO TEST APPLICATION\n************************\n");
	}
}


app.listen(port, function(err) {
	if(err) {
		throw "Error occured while listen to port::"+port;
	}
	console.log("Server is started and listen to port number::", port);
})
