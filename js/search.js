$(document).ready(function() {
    // Getting the game name from URL parameters and putting it in the correct input field.
    var urlParams = new URLSearchParams(window.location.search);
    var searchTerm = urlParams.get("searchTerm");

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
                else {
                    result += "<div class=\"completed\">Mainly Multiplayer</div>";
                }
                
                result += "</div></div>";
            }

            $("#results").append(result);

            // Function to redirect to item page on click.
            $(".result").on("click", function() {
                location.href = "item.html?name=" + $(this).attr("id");
            });
        },
        error: function(errorMsg) {
            console.log(errorMsg);
        }
    });
});