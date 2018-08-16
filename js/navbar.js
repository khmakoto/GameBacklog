$(document).ready(function() {
	// Function to return to home page.
	$("#homeButton").on("click", function() {
		location.href = "index.html";
	});

	// Function to add new game to database.
	$("#newButton").on("click", function() {
		location.href = "new.html";
	});
});