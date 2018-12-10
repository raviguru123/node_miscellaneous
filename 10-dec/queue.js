'use strict'
	const 
		Q = require('q');




function init() {
	
		Q(undefined)
		.then(function() {
			console.log("success response");
			return init1()
		})
		.then(function() {
			console.log("After call we have received response");
		})
		.fail(function(err) {
			console.log("Error occured in promise chain");
		})

}

function init1() {
	var 
		defer = Q.defer();
	
	Q(undefined)
	.then(function() {
		var defer1 = Q.defer();
		setTimeout(function() {
			console.log("SetTimeout inside");
			return Q("Message from");
			defer1.resolve();
		}, 1000)
		return defer1.promise;
	}).
	then(function(message) {
		console.log("Promise Chain next call::", message)
	})
	.then(function() {
		console.log("Promsie chain ****************");
	})
	.fail(function() {
		console.log("Failed Promise chain  error");
	})

	return defer.promise;
}


init()
