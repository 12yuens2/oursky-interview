var SECOND = 1000;
var TIMERS = [];


function add_new_task() {
	
	/* Get name and clear the text box */
	var name = document.getElementById("name").value;
	document.getElementById("name").value = "";

	var task_element = document.createElement("p");
	var task = new Task(name, task_element);
	task.updateElement();

	$("body").append(task_element);
}

var Task = function(name, element) {
	this.name = name;
	this.element = element;
	this.time = 0;

	/* Increment time for this task every second */
	this.timer = setInterval(function() {
		this.time++;
		this.updateElement();
	}.bind(this), SECOND);

	/* Update HTML element */
	this.updateElement = function() {
		this.element.innerHTML = this.name + " " + this.time;
	}
}