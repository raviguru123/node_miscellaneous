var 	
		_ 	= require('lodash');
		Q   = require('q');


function Producer(config) {
	var 
		self = this;
		self.producer = _.get(config, "PRODUCER", {});
		
		console.log("producer function call");
}

Producer.prototype.init = function() {
	var 
		self  = this;
	Q(undefined)
	.then(function() {
		return self.producer._initClient();
	})
	.then(function(message) {
		return self.producer.initProducer("simple");
	})
	.then(function(data) {
		console.log("data::",data);
		var messages = "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat";
		var messageArray = messages.split(" ");
		var index = 0;
		var interval = setInterval(function() {
			var payloads = [{"topic" : "test", "partitions" : 0, "messages": messageArray[index]}];
			console.log("index",index, payloads);
			self._sendMessage(payloads);
			index += 1;
		}, 3000);
		

	})
	.catch(function(err) {
		console.error("+++++++++++++++++++++++error::",err);
	});
}

Producer.prototype._sendMessage = function(payloads) {
	var self = this;
	self.producer.sendMessage(payloads)
	.then(function(response) {
		console.log("Response from send Message ::", response);
	})
	.catch(function(err) {
		console.error("Error occured while send Message::",err);
	})
}

module.exports = Producer;