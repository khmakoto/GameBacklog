$(document).ready(function() {
    // Getting the game name from URL parameters and putting it in the correct input field.
    var urlParams = new URLSearchParams(window.location.search);
    var searchTerm = urlParams.get("searchTerm");
    var platform = urlParams.get("platform");

    // If there is a search term, search for it.
    if (searchTerm != null && searchTerm != "") {
        // Ajax call to retrieve results' information on load.
        $.ajax({
            type: "POST",
            url: "controller/searchController.php",
            dataType: "json",
            data: {"action": "RETRIEVE", "searchTerm": searchTerm},
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            success: function(jsonData) {
                var result = "";

                for (var i in jsonData.array) {
                    result += "<div id=\"" + jsonData.array[i].name + "\" class=\"result\">";
                    result += "<div class=\"imageSection\"><span class=\"helper\"></span>";
                    result += "<img src=\"images/" + jsonData.array[i].imageSource + "\" /></div>";
                    result += "<div class=\"infoSection\">";
                    result += "<div class=\"name\">" + jsonData.array[i].name + "</div>";

                    if (jsonData.array[i].state == 0) {
                        result += "<div class=\"completed\">Not Completed</div>";
                    }
                    else if (jsonData.array[i].state == 1) {
                        result += "<div class=\"completed\">Completed</div>";
                    }
                    else if (jsonData.array[i].state == 2){
                        result += "<div class=\"completed\">Mainly Multiplayer</div>";
                    }
                    else {
                        result += "<div class=\"completed\">100% Completed</div>";
                    }
                    
                    result += "</div></div>";
                }

                $("#results").append(result);

                // Function to redirect to item page on click.
                $(".result").on("click", function(evt) {
                    if (evt.ctrlKey || evt.metaKey) {
                        window.open("item.html?name=" + $(this).attr("id"));
                    }
                    else {
                        location.href = "item.html?name=" + $(this).attr("id");
                    }
                });
            },
            error: function(errorMsg) {
                console.log(errorMsg.statusText);
                showAlert($("#errorAlert"), errorMsg.statusText);
            }
        });
    }
    // If not, check if there is a specified platform.
    else if (platform != null && platform != "") {
        // Ajax call to retrieve results' information on load.
        $.ajax({
            type: "POST",
            url: "controller/searchController.php",
            dataType: "json",
            data: {"action": "PLATFORM", "platform": platform},
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            success: function(jsonData) {
                var result = "";

                for (var i in jsonData.array) {
                    result += "<div id=\"" + jsonData.array[i].name + "\" class=\"result\">";
                    result += "<div class=\"imageSection\"><span class=\"helper\"></span>";
                    result += "<img src=\"images/" + jsonData.array[i].imageSource + "\" /></div>";
                    result += "<div class=\"infoSection\">";
                    result += "<div class=\"name\">" + jsonData.array[i].name + "</div>";

                    if (jsonData.array[i].state == 0) {
                        result += "<div class=\"completed\">Not Completed</div>";
                    }
                    else if (jsonData.array[i].state == 1) {
                        result += "<div class=\"completed\">Completed</div>";
                    }
                    else if (jsonData.array[i].state == 2){
                        result += "<div class=\"completed\">Mainly Multiplayer</div>";
                    }
                    else {
                        result += "<div class=\"completed\">100% Completed</div>";
                    }
                    
                    result += "</div></div>";
                }

                $("#results").append(result);

                // Function to redirect to item page on click.
                $(".result").on("click", function(evt) {
                    if (evt.ctrlKey || evt.metaKey) {
                        window.open("item.html?name=" + $(this).attr("id"));
                    }
                    else {
                        location.href = "item.html?name=" + $(this).attr("id");
                    }
                });
            },
            error: function(errorMsg) {
                console.log(errorMsg.statusText);
                showAlert($("#errorAlert"), errorMsg.statusText);
            }
        });
    }
    // Else, show error alert.
    else {
        showAlert($("#errorAlert"), "Error retrieving information. You'll be redirected to the main page.");
    }

    $("#errorAlertButton").on("click", function() {
        setTimeout(function() { location.href = "index.html"; }, 1000);
    });
});