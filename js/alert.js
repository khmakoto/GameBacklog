$(document).ready(function() {
    $(".alertButton").on("click", function() {
        $(".alert").height("0px");
        setTimeout(function() { $(".alert > div").hide(); }, 300);
        setTimeout(function() { $(".alert").css("display", "none"); }, 1000);
    });
});