'use strict'
const 

	express = require('express'),
	app 	= express(),
	http 	= require('http'),
	port 	= 6000;




app.get("/test", function(request, response) {
	check(request, response, 0); 
});



function check(request, response, count) {
	
	if(count < 100) {
		setTimeout(function() {
			check(request, response, count+1)
		}, 100)
		//check(request, response, count+1);
	}
	
	else {
		console.log('response sent to client');
		response.status(200).send("welocme to test application");
	}
}


app.listen(port, function(err) {
	if(err) {
		throw "Error occured while listen to port::"+port;
	}
	console.log("Server is started and listen to port number::", port);
})