'use strict'
	const 
		express 	= require('express'),
		app 		= express(),
		httpProxy   = require('http-proxy'),
		port 		= 3001;


const proxy = httpProxy.createProxyServer({});


app.all("*", function(request, response) {
	console.log("Request is land in middleware function", request.params);
	proxy.web(request, response, {'target' : "http://127.0.0.1:3002/test"});
});


app.listen(port, function(err) {
	if(err) {
		throw "Error occured while middleware start::"+port;
	}
	console.log("MiddleWare server is listening on port number::", port);
})


