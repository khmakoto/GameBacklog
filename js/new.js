$(document).ready(function() {
    // Variable to store original value of image.
    var placeholderImage = $("#itemImage")[0].src;

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
        var PC = $("#Blizzard").hasClass("active") || $("#GOG").hasClass("active") || $("#Epic").hasClass("active") ||
                 $("#Origin").hasClass("active") || $("#Steam").hasClass("active") || $("#Twitch").hasClass("active") ||
                 $("#UPlay").hasClass("active") || $("#Microsoft").hasClass("active");

        var gameInformation =
            {"action": "SAVE", "name": $("#name").val(), "state": $("#state").val(), "image": $("#itemImage")[0].src,
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
            "Microsoft": ($("#Microsoft").hasClass("active") ? 1 : 0),
            "PC": (PC ? 1 : 0)};

        // A name must be specified.
        if (gameInformation.name != "") {
            // At least one platform has to be chosen.
            if (gameInformation.PlayStation || gameInformation.PlayStation2 || gameInformation.PlayStation3 ||
                gameInformation.PlayStation4 || gameInformation.PSP || gameInformation.GameboyAdvance ||
                gameInformation.NintendoDS || gameInformation.Nintendo3DS || gameInformation.NintendoSwitch ||
                gameInformation.XboxOne || gameInformation.PC) {
                // An image must be uploaded.
                if (gameInformation.image != placeholderImage) {
                    $.ajax({
                        type: "POST",
                        url: "controller/newController.php",
                        dataType: "json",
                        data: gameInformation,
                        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                        success: function() {
                            showAlert($("#alert"), "Game successfully added to database.");
                            $(".alertButton").on("click", function() {
                                setTimeout(function() { location.href = "item.html?name=" + $("#name").val(); }, 1000);
                            });
                        },
                        error: function(errorMsg) {
                            console.log(errorMsg.statusText);
                            showAlert($("#alert"), errorMsg.statusText);
                            $(".alertButton").on("click", function() {
                                setTimeout(function() { location.href = "index.html"; }, 1000);
                            });
                        }
                    });
                }
                else {
                    showAlert($("#alert"), "You must upload an image for the game.");
                    $(".alertButton").on("click", function() {
                        setTimeout(function() { $(".alertBackground").hide(); }, 500);
                    });
                }
            }
            else {
                showAlert($("#alert"), "At least one platform must be selected.");
                $(".alertButton").on("click", function() {
                    setTimeout(function() { $(".alertBackground").hide(); }, 500);
                });
            }
        }
        else {
            showAlert($("#alert"), "A name must be specified for the game.");
            $(".alertButton").on("click", function() {
                setTimeout(function() { $(".alertBackground").hide(); }, 500);
            });
        }
    });

    // Functions to change image when clicking on it.
    $("#imageFileDialog").change(function(evt) {
        var selectedFile = evt.target.files[0];
        var reader = new FileReader();
        var image = $("#itemImage")[0];

        image.title = selectedFile.name;

        reader.onload = function(event) {
            image.src = event.target.result;
        };

        var fileName = selectedFile.name;
        var fileExt = fileName.substr(fileName.lastIndexOf(".") + 1);
        if (fileExt == "jpg" || fileExt == "jpeg" || fileExt == "png") {
            reader.readAsDataURL(selectedFile);
        }
        else {
            showAlert($("#alert"), "Only JPG and PNG files are accepted.");
            $(".alertButton").on("click", function() {
                setTimeout(function() { $(".alertBackground").hide(); }, 500);
            });
            $("#imageFileDialog").val("");
        }
    });

    $("#itemImage").on("click", function() {
        $("#imageFileDialog").trigger("click");
    });
});