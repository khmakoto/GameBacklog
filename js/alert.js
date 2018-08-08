$(document).ready(function() {
    $(".alertButton").on("click", function() {
        $(".alert").height("0px");
        $(".alert").css("top", "calc(50% - 100px)");
        $(".alert").css("top", "-webkit-calc(50% - 100px)");
        setTimeout(function() { $(".alert > div").hide(); }, 150);
        setTimeout(function() { $(".alert").css("display", "none"); }, 1000);
    });
});