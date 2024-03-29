var SECOND = 1000;

var SECONDS_IN_HOUR = 3600;
var SECONDS_IN_MINUTE = 60;

var container = $("body").find(".container");

/**
 * Function to create a new task with the name from input field
 * and append the task to the container 
 */
function add_new_task() {
	
	/* Get name and clear the text box */
	var name = document.getElementById("name").value;
	document.getElementById("name").value = "";

	if (name != "") {
		/* Create new task */
		var task_element = create_task_element();
		var task = new Task(name, task_element);
		task.update_element();

		/* Append task to HTML */
		$(container).prepend(task_element);	
	}
}

/**
 * Function to create the element that holds each task
 */
function create_task_element() {
	var div = $("<div>", {"class": "task"});

	$(div).append($("<span class='name'></span>"));
	$(div).append($("<button class='stop'>stop</button>"));
	$(div).append($("<button class='pause'>pause</button>"));
	$(div).append($("<span class='time'></span>"));

	return div;
}

var Task = function(name, element) {
	this.name = name;
	this.element = element;
	this.time = 0;

	/* Different elements of the task */
	this.name_element = $(this.element).find(".name");
	this.time_element = $(this.element).find(".time");
	this.pause_button = $(this.element).find(".pause");
	this.stop_button = $(this.element).find(".stop");

	this.tick = function() {
		this.time++
		this.update_element();
	}

	/* Increment time for this task every second */
	this.timer = setInterval(this.tick.bind(this), SECOND);

	/* Variable for dealing with scope */
	var task = this;

	/* Handler for pausing and resuming */
	this.pause_button.click(function() {
		/* Pause the timer */
		if (task.timer) {
			$(this).html("resume");
			$(task.element).attr("done", "paused");
			clearInterval(task.timer)
			task.timer = undefined;
		} 

		/* Resume the timer */
		else {
			$(this).html("pause");
			$(task.element).attr("done", "false");
			task.timer = setInterval(task.tick.bind(task), SECOND);
		}
	});

	/* Handler for stopping */
	this.stop_button.click(function() {
		clearInterval(task.timer);

		/* Disable buttons */
		$(task.pause_button).prop("disabled", true);
		$(task.stop_button).prop("disabled", true);

		/* Move to bottom of container */
		$(task.element).remove();
		$(container).append(task.element);

		/* Set done attribute of task for background colour change*/
		$(task.element).attr("done", "true");

		/* Add button to remove the element */
		$(task.element).prepend($("<button class='remove'>x</button>").click(function() {
			$(task.element).remove();
		}));
	});

	/* Update HTML element */
	this.update_element = function() {
		$(this.name_element).html(this.name);
		$(this.time_element).html(this.display_time());
	}

	/* Display the time in hrs:mins:secs */
	this.display_time = function() {
		var time = this.time

		var hours = Math.floor(time / SECONDS_IN_HOUR);
		time -= hours * SECONDS_IN_HOUR;
		hours = hours == 0 ? "" : hours + " hr ";

		var minutes = Math.floor(time / SECONDS_IN_MINUTE);
		time -= minutes * SECONDS_IN_MINUTE;
		minutes = minutes == 0 ? "" : minutes + " min ";

		var seconds = time + " sec";

		return hours + minutes + seconds;
	}
}