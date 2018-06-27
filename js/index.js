$(document).ready(function() {
    // Function to change stats when clicking on another platform.
    $(".platform").on("click", function() {
        $(".platform").each(function() {
            $(this).removeClass("active");
        });

        $(this).addClass("active");
    });


    // Variable that determines selected search suggestion.
    var selectedSuggestion = 0;

    // Function to display suggestions when typing on search bar.
    $("#searchBar").keyup(function(evt) {
        // If search bar is not empty.
        if ($("#searchBar").val() != "") {
            // If key was up or down, go through suggestions.
            if (evt.which == 38) {
                if (selectedSuggestion > 1) {
                    selectedSuggestion -= 1;
                }
                else if (selectedSuggestion == 0) {
                    selectedSuggestion = 3;
                }

                $(".selected").removeClass("selected");
                $("#suggestion" + selectedSuggestion).addClass("selected");
            }
            else if (evt.which == 40) {
                if (selectedSuggestion < 3) {
                    selectedSuggestion += 1;
                }

                $(".selected").removeClass("selected");
                $("#suggestion" + selectedSuggestion).addClass("selected");
            }

            // If a relevant key is typed, show suggestions.
            else if (evt.which != 37 && evt.which != 39) {
                $("#searchSuggestions").remove();

                var offset = $("#searchBarSection").offset();

                var searchSuggestions = "<div id=\"searchSuggestions\" style=\"left: " + offset.left +  "px; top: " + (offset.top + 80) + "px;\">";
                
                // TODO: Replace with actual info
                searchSuggestions += "<div id=\"suggestion1\" class=\"suggestion\">Suggestion 1</div>";
                searchSuggestions += "<div id=\"suggestion2\" class=\"suggestion\">Suggestion 2</div>";
                searchSuggestions += "<div id=\"suggestion3\" class=\"suggestion\">Suggestion 3</div>";

                searchSuggestions += "</div>";

                $("#contents").append(searchSuggestions);

                // Function to remove selected class on hover.
                $(".suggestion").hover(function() {
                    $(".suggestion").each(function() {
                        $(this).removeClass("selected");
                        selectedSuggestion = 0;
                    })
                });
            }
        }

        // If it is empty, delete suggestions.
        else {
            $("#searchSuggestions").remove();
        }
    });

    // Function to prevent default behavior when typing certain keys.
    $("#searchBar").keydown(function(evt) {
        if (evt.which == 38 || evt.which == 40) {
            evt.preventDefault();
        }
    });
});