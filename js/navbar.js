$(document).ready(function() {
	// Function to return to home page.
	$("#homeButton").on("click", function(evt) {
		if (evt.ctrlKey || evt.metaKey) {
            window.open("index.html");
        }
        else {
			location.href = "index.html";
		}
	});

	// Function to add new game to database.
	$("#newButton").on("click", function(evt) {
		if (evt.ctrlKey || evt.metaKey) {
            window.open("new.html");
        }
        else {
			location.href = "new.html";
		}
	});
});