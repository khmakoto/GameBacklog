$(document).ready(function() {
    // Variable that tracks if button should habilitate editing or save information.
    var editing = false;

    // Function to edit information.
    $("#editButton").on("click", function() {
        // If editing, save information.
        if (editing) {
            editing = false;
            $(".input").each(function() {
                $(this).prop("disabled", true);
            });
            $("#editButton").removeClass("saveInformation");
            $("#editButton").addClass("habilitateEditing");
            $("#editButton").val("Edit Information");
            alert("Info saved.");
        }
        // If not, habilitate editing.
        else {
            editing = true;
            $(".input").each(function() {
                $(this).prop("disabled", false);
            });
            $(this).removeClass("habilitateEditing");
            $(this).addClass("saveInformation");
            $("#editButton").val("Save Information");
        }
    });
});