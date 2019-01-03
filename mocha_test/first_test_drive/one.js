// we are changing dynamic property of function

var first = {
	"first_name" : "ravi",
	"last_name" : "guru",
	"getName" :function() {
		return this.first_name + " " + this.last_name;
	}
}
var third = {
	"first_name" : "sunil",
	"last_name" : "raghav",
	"getName" :function() {
		return this.first_name + " " + this.last_name;
	}
}

function second() {
	return this.getName() + " I am from second function";
}



fn = second.bind(first);
console.log(fn());

fn = second.bind(third);
console.log(fn());

// function check() {
// 	console.log("hello this is before::",arguments);

// 	var arr = Array.prototype.slice.call(arguments);
// 	// console.log("Hello this is not==",arr);
	
// 	if(Array.isArray(arguments)) {
// 		console.log("this is a array");
// 	}
// 	else {
// 		console.log("arguments is not an array");
// 	}
// }

// check(0,1,2,3,4,5);