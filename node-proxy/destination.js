'use strict'
const 
	express = require('express'),
	app 	= express(),
	port    = 3002;



app.all("/test", function(request, response) {
	process(request, response);
});


app.all("*", function(request, response) {
	response.status(200).send("Hello this is remote server");
})


function process(request, response) {
	console.log("final response in destination server is ::", request.body);
	response.status(200).send({
		"yes" : "Ok i am rechable via node proxy"
	});
}


app.listen(port, function(err) {
	if(err) {
		throw "Error in destination server while trying to start";
	}
	console.log("Hello i am listening on port::" ,  port);
})