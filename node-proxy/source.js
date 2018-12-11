const 
	express		= require('express'),
	app			= express(),
	requester	= require('requestor'),
	requestobj  	= new requester({
			maxSockets : 100,
			minSockets : 10,
			timeout    : 6000,
			maxPendingCount : 1000,
			debugLog  : true
	});

PORT = 3000


app.all("/send", function(request, response) {
	process_request(process_request, response);
});

app.all("*", function(request, response) {
	response.status(200).send("hello this is source server an reachable from you");
})

function process_request(request, response) {
	
	var 
		apiOpts = {

			uri : "http://127.0.0.1:3001",
			body : request.body,
			method : 'POST',
			headers : {

			}
		}

		requestobj.hit(apiOpts, {}, function(err, statcode, body, header, remoteResponse) {
			console.log("status code in source server::", {
				"statcode" : statcode,
				"body" : body,
				"err" : err
			});

			response.status(statcode || 500).send(body);
		})	

}


app.listen(PORT, function(err) {
	if(err) {
		console.log("error occured while try to start source server on port:: 3000");
	}
	console.log("source server is start to listen on port", PORT);
})







