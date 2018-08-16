$(document).ready(function() {
    // Getting the game name from URL parameters and putting it in the correct input field.
    var urlParams = new URLSearchParams(window.location.search);
    var name = urlParams.get("name");
    $("#name").val(name);

    // Ajax call to retrieve game information on load.
    $.ajax({
        type: "POST",
        url: "controller/itemController.php",
        dataType: "json",
        data: {"action": "RETRIEVE", "name": name},
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        success: function(jsonData) {
            $("#state").val(jsonData.state);
            $("#itemImage").attr("src", "images/" + jsonData.imageSource);

            if (jsonData.PlayStation == 1) {
                $("#PlayStation").addClass("active");
            }
            if (jsonData.PlayStation2 == 1) {
                $("#PlayStation2").addClass("active");
            }
            if (jsonData.PlayStation3 == 1) {
                $("#PlayStation3").addClass("active");
            }
            if (jsonData.PlayStation4 == 1) {
                $("#PlayStation4").addClass("active");
            }
            if (jsonData.PSP == 1) {
                $("#PSP").addClass("active");
            }
            if (jsonData.GameboyAdvance == 1) {
                $("#GameboyAdvance").addClass("active");
            }
            if (jsonData.NintendoDS == 1) {
                $("#NintendoDS").addClass("active");
            }
            if (jsonData.Nintendo3DS == 1) {
                $("#Nintendo3DS").addClass("active");
            }
            if (jsonData.NintendoSwitch == 1) {
                $("#NintendoSwitch").addClass("active");
            }
            if (jsonData.XboxOne == 1) {
                $("#XboxOne").addClass("active");
            }
            if (jsonData.Blizzard == 1) {
                $("#Blizzard").addClass("active");
            }
            if (jsonData.GOG == 1) {
                $("#GOG").addClass("active");
            }
            if (jsonData.Epic == 1) {
                $("#Epic").addClass("active");
            }
            if (jsonData.Origin == 1) {
                $("#Origin").addClass("active");
            }
            if (jsonData.Steam == 1) {
                $("#Steam").addClass("active");
            }
            if (jsonData.Twitch == 1) {
                $("#Twitch").addClass("active");
            }
            if (jsonData.UPlay == 1) {
                $("#UPlay").addClass("active");
            }
            if (jsonData.Microsoft == 1) {
                $("#Microsoft").addClass("active");
            }
        },
        error: function(errorMsg) {
            console.log(errorMsg.statusText);
            showAlert($("#alert"), errorMsg.statusText);
            $(".alertButton").on("click", function() {
                setTimeout(function() { location.href = "index.html"; }, 1000);
            });
        }
    });

    // Variable that tracks previous name when editing info.
    var prevName = "";

    // Variable that tracks if button should enable editing or save information.
    var editing = false;

    // Function to update information.
    function updateInformation() {
        var updatedData =
                {"action": "UPDATE", "prevName": prevName, "name": $("#name").val(), "state": $("#state").val(),
                "PlayStation": ($("#PlayStation").hasClass("active") ? 1 : 0),
                "PlayStation2": ($("#PlayStation2").hasClass("active") ? 1 : 0),
                "PlayStation3": ($("#PlayStation3").hasClass("active") ? 1 : 0),
                "PlayStation4": ($("#PlayStation4").hasClass("active") ? 1 : 0),
                "PSP": ($("#PSP").hasClass("active") ? 1 : 0),
                "GameboyAdvance": ($("#GameboyAdvance").hasClass("active") ? 1 : 0),
                "NintendoDS": ($("#NintendoDS").hasClass("active") ? 1 : 0),
                "Nintendo3DS": ($("#Nintendo3DS").hasClass("active") ? 1 : 0),
                "NintendoSwitch": ($("#NintendoSwitch").hasClass("active") ? 1 : 0),
                "XboxOne": ($("#XboxOne").hasClass("active") ? 1 : 0),
                "Blizzard": ($("#Blizzard").hasClass("active") ? 1 : 0),
                "GOG": ($("#GOG").hasClass("active") ? 1 : 0),
                "Epic": ($("#Epic").hasClass("active") ? 1 : 0),
                "Origin": ($("#Origin").hasClass("active") ? 1 : 0),
                "Steam": ($("#Steam").hasClass("active") ? 1 : 0),
                "Twitch": ($("#Twitch").hasClass("active") ? 1 : 0),
                "UPlay": ($("#UPlay").hasClass("active") ? 1 : 0),
                "Microsoft": ($("#Microsoft").hasClass("active") ? 1 : 0)};

        // Ajax call to upload new information to server.
        $.ajax({
            type: "POST",
            url: "controller/itemController.php",
            dataType: "json",
            data: updatedData,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            success: function(jsonData) {
                showAlert($("#alert"), "Information updated successfully.");
                $(".alertButton").on("click", function() {
                    setTimeout(function() { location.href = "item.html?name=" + $("#name").val(); }, 1000);
                });
            },
            error: function(errorMsg) {
                console.log(errorMsg.statusText);
                showAlert($("#alert"), "Something wrong happened while uploading your info. Reloading page.");
                $(".alertButton").on("click", function() {
                    setTimeout(function() { location.reload(); }, 1000);
                });                
            }
        });
    }

    // Function to edit information.
    $("#editButton").on("click", function() {
        // If editing, save information.
        if (editing) {
            editing = false;

            $(".input").each(function() {
                $(this).prop("disabled", true);
            });

            $(".platform").css("cursor", "default");
            $(".platform").on("click", function() {});

            $("#editButton").removeClass("saveInformation");
            $("#editButton").addClass("enableEditing");
            $("#editButton").val("Edit Information");

            updateInformation();
        }
        // If not, enable editing.
        else {
            editing = true;

            prevName = $("#name").val();

            $(".input").each(function() {
                $(this).prop("disabled", false);
            });

            // Platform toogle on/off by click is enabled.
            $(".platform").css("cursor", "pointer");
            $(".platform").on("click", function() {
                if ($(this).hasClass("active")) {
                    $(this).removeClass("active");
                }
                else {
                    $(this).addClass("active");
                }
            });

            $(this).removeClass("enableEditing");
            $(this).addClass("saveInformation");
            $("#editButton").val("Save Information");
        }
    });

});