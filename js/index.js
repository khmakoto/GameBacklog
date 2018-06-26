$(document).ready(function() {
    $(".platform").on("click", function() {
        $(".platform").each(function() {
            $(this).removeClass("active");
        });

        $(this).addClass("active");
    });
});