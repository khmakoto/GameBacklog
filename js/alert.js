// Function to show an alert sent as a parameter.
function showAlert($alert, statusText) {
    $alert.css("display", "flex");
    $alert.height("200px");
    $alert.css("top", "calc(50% - 150px)");
    $alert.css("top", "-webkit-calc(50% - 150px)");

    $alert.find("div").css("display", "flex");

    $(".alertText").html(statusText);

    $(".alertBackground").show();
}

// Function for behavior on click on an alert button.
$(document).ready(function() {
    $(".alertButton").on("click", function() {
        $(".alert").height("0px");
        $(".alert").css("top", "calc(50% - 100px)");
        $(".alert").css("top", "-webkit-calc(50% - 100px)");
        setTimeout(function() { $(".alert > div").hide(); }, 150);
        setTimeout(function() { $(".alert").css("display", "none"); }, 1000);
    });
});