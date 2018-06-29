$(document).ready(function() {
    // Variable that determines selected search suggestion.
    var selectedSuggestion = 0;
    var numSuggestions = 3;

    // Function to retrieve and show suggestions.
    function showSuggestions() {
        $("#searchSuggestions").remove();
        selectedSuggestion = 0;
        numSuggestions = 4;

        var offset = $("#searchBarSection").offset();

        var searchSuggestions = "<div id=\"searchSuggestions\" style=\"left: " + offset.left +  "px; top: " + (offset.top + 80) + "px;\">";

        // Ajax call to retrieve suggestions from database.
        $.ajax({
            type: "POST",
            url: "controller/indexController.php",
            dataType: "json",
            data: {"action": "SEARCH", "searchTerm": $("#searchBar").val()},
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            success: function(jsonData) {
                var count = 1;

                // Loop to append data to suggestions
                for(var i in jsonData.array) {
                    if (i >= 3) {
                        break;
                    }

                    searchSuggestions += "<div id=\"suggestion" + count + "\" class=\"suggestion\" title=\"" + jsonData.array[i].name + "\">";
                    searchSuggestions += "<div class=\"suggestionImageBlock\"><img src=\"images/" + jsonData.array[i].imageSource + "\" class=\"suggestionImage\" /></div>";
                    searchSuggestions += "<div class=\"suggestionName\">" + jsonData.array[i].name + "</div>";
                    searchSuggestions += "<div class=\"suggestionCompleted\">";
                    if (jsonData.array[i].state == 0) {
                        searchSuggestions += "Not completed";
                    }
                    else if (jsonData.array[i].state == 1) {
                        searchSuggestions += "Completed";
                    }
                    else {
                        searchSuggestions += "Mainly multiplayer";
                    }
                    searchSuggestions += "</div></div>";
                    count += 1;
                }   

                searchSuggestions += "<div id=\"suggestion" + count + "\" class=\"viewMore\">View more...</div>";
                searchSuggestions += "</div>";

                $("#contents").append(searchSuggestions);

                // Function to remove selected class on hover.
                $(".suggestion").hover(function() {
                    $(".suggestion").each(function() {
                        $(this).removeClass("selected");
                        selectedSuggestion = 0;
                    })

                    $(".viewMore").each(function() {
                        $(this).removeClass("selected");
                        selectedSuggestion = 0;
                    })
                });
                $(".viewMore").hover(function() {
                    $(".suggestion").each(function() {
                        $(this).removeClass("selected");
                        selectedSuggestion = 0;
                    })

                    $(".viewMore").each(function() {
                        $(this).removeClass("selected");
                        selectedSuggestion = 0;
                    })
                });

                if (count < numSuggestions) {
                    numSuggestions = count;
                }
            },
            error: function(errorMsg){
                console.log(errorMsg.statusText);
                
                // If no matches were found, show message.
                if (errorMsg.status == 420) {
                    searchSuggestions += "<div id=\"noMatches\">No match for search term</div></div>";
                    $("#contents").append(searchSuggestions);
                }
            }
        });
    }

    // Function to display suggestions when typing on search bar.
    $("#searchBar").keyup(function(evt) {
        // If search bar is not empty.
        if ($("#searchBar").val() !== "" && $("#searchBar").val() !== " ") {
            // If key was up or down, go through suggestions.
            if (evt.which == 38) {
                if (selectedSuggestion > 1) {
                    selectedSuggestion -= 1;
                }
                else if (selectedSuggestion == 0) {
                    selectedSuggestion = numSuggestions;
                }

                $(".selected").removeClass("selected");
                $("#suggestion" + selectedSuggestion).addClass("selected");
            }
            else if (evt.which == 40) {
                if (selectedSuggestion < numSuggestions) {
                    selectedSuggestion += 1;
                }

                $(".selected").removeClass("selected");
                $("#suggestion" + selectedSuggestion).addClass("selected");
            }

            // If a relevant key is typed, show suggestions.
            else if (evt.which != 37 && evt.which != 39) {
                showSuggestions();
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

    // Function to remove suggestions when focusing out of search bar.
    $("#searchBar").focusout(function(evt) {
        $("#searchSuggestions").remove();
        selectedSuggestion = 0;
    });

    // Function to include suggestions when focusing in search bar if it is not empty.
    $("#searchBar").focusin(function(evt) {
        if ($("#searchBar").val() != "" && $("#searchBar").val() !== " ") {
            showSuggestions();
        }
    });

    // Variable to keep track of new animations.
    var animationCount = 0;

    // Variable to keep track of previous stroke dasharray.
    var previousStroke = "0 100";

    // Function to update stats section with new information.
    function updateStatsSection(total, completed) {
        var percentage;

        // If total is zero, then update everything with zero.
        if (total == 0) {
            $("#totalGames > label").html("0");
            $("#completedGames > label").html("0");
            
            percentage = 0;
        }
        // Else, update with proper numbers.
        else {
            $("#totalGames > label").html(total);
            $("#completedGames > label").html(completed);

            percentage = Math.round(completed * 100 / total);
        }

        $("#chartText").html(percentage + "%");

        $.keyframe.define([{
            name: "donut" + animationCount,
            from: {
                "stroke-dasharray": previousStroke
            },
            to: {
                "stroke-dasharray": percentage + " " + (100 - percentage)
            }
        }]);

        $("#circle").playKeyframe("donut" + animationCount + " 1s ease-out forwards");
        animationCount += 1;
        previousStroke = percentage + " " + (100 - percentage);
    }

    // Function to get overall stats.
    function getOverallStats() {
        $.ajax({
            type: "POST",
            url: "controller/indexController.php",
            dataType: "json",
            data: {"action": "OVERALL_STATS"},
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            success: function(jsonData) {
                updateStatsSection(jsonData.total, jsonData.completed);
            },
            error: function(errorMsg) {
                console.log(errorMsg.statusText);
            }
        });
    }

    // At the beginning populate stats section with overall stats.
    getOverallStats();

    // Function to get specific platform stats.
    function getPlatformStats(selection) {
        $.ajax({
            type: "POST",
            url: "controller/indexController.php",
            dataType: "json",
            data: {"action": "PLATFORM_STATS", "platform": selection},
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
            success: function(jsonData) {
                updateStatsSection(jsonData.total, jsonData.completed);
            },
            error: function(errorMsg) {
                console.log(errorMsg.statusText);
            }
        });
    }

    // Function to change stats when clicking on another platform.
    $(".platform").on("click", function() {
        $(".platform").each(function() {
            $(this).removeClass("active");
        });

        $(this).addClass("active");

        var selection = $(this).html();
        selection = selection.replace(" ", "");
        
        // If selection is overall, get stats from all platforms.
        if (selection == "Overall") {
            getOverallStats();
        }
        // Else, get stats from specific platform.
        else {
            getPlatformStats(selection);
        }
    });
});