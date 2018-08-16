$(document).ready(function() {
    // Function to toggle platform state for game on/off.
    $(".platform").on("click", function() {
        if ($(this).hasClass("active")) {
            $(this).removeClass("active");
        }
        else {
            $(this).addClass("active");
        }
    });

    // Function to submit the information and add the game to the database.
    $("#addButton").on("click", function() {
        showAlert($("#alert"), "Game successfully added to database.");
    });
});