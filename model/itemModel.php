<?php

    # Connection to the database and errors
	require_once __DIR__ . "/database.php";
	require_once __DIR__ . "/errors.php";

    # Query to retrieve game information.
    function retrieveGameInfo($name) {
    	# Open and validate the Database connection.
    	$conn = connect();

        if ($conn != null) {
        	$sql = "SELECT * FROM Games WHERE Name = '$name'";
			$result = $conn->query($sql);

			if ($result->num_rows == 0) {
				# There are no games that match the searchTerm in the database.
				$conn->close();
				return errors(460);
			}

			# Get game information
			while ($row = $result -> fetch_assoc()) {
                $ans = array("status" => "COMPLETE", "state" => $row["State"], "imageSource" => $row["ImageSource"],
                             "PlayStation" => $row["PlayStation"], "PlayStation2" => $row["PlayStation2"],
                             "PlayStation3" => $row["PlayStation3"], "PlayStation4" => $row["PlayStation4"],
                             "PSP" => $row["PSP"], "GameboyAdvance" => $row["GameboyAdvance"],
                             "NintendoDS" => $row["NintendoDS"], "Nintendo3DS" => $row["Nintendo3DS"],
                             "NintendoSwitch" => $row["NintendoSwitch"], "XboxOne" => $row["XboxOne"],
                             "Blizzard" => $row["Blizzard"], "GOG" => $row["GOG"], "Epic" => $row["Epic"],
                             "Origin" => $row["Origin"], "Steam" => $row["Steam"], "Twitch" => $row["Twitch"],
                             "UPlay" => $row["UPlay"], "Microsoft" => $row["Microsoft"]);
			}

			$conn->close();
			return $ans;
        }
        else {
        	# Connection to Database was not successful.
        	$conn->close();
        	return errors(400);
        }
	}

	# Update to change game information
    function updateGameInfo($prevName, $name, $state, $PlayStation, $PlayStation2, $PlayStation3, $PlayStation4, $PSP,
							$GameboyAdvance, $NintendoDS, $Nintendo3DS, $NintendoSwitch, $XboxOne, $Blizzard, $GOG, $Epic, $Origin,
							$Steam, $Twitch, $UPlay, $Microsoft, $PC) {
    	# Open and validate the Database connection
    	$conn = connect();

        if ($conn != null) {
        	$sql = "UPDATE Games SET Name = '$name', State = '$state', PlayStation = '$PlayStation', PlayStation2 = '$PlayStation2',
					PlayStation3 = '$PlayStation3', PlayStation4 = '$PlayStation4', PSP = '$PSP', GameboyAdvance = '$GameboyAdvance',
					NintendoDS = '$NintendoDS', Nintendo3DS = '$Nintendo3DS', NintendoSwitch = '$NintendoSwitch',
					XboxOne = '$XboxOne', Blizzard = '$Blizzard', GOG = '$GOG', Epic = '$Epic', Origin = '$Origin',
					Steam = '$Steam', Twitch = '$Twitch', UPlay = '$UPlay', Microsoft = '$Microsoft', PC = '$PC'
				    WHERE Name = '$prevName'";	
			if (mysqli_query($conn, $sql)) 
	    	{
	    		$conn->close();
			    return array("status" => "COMPLETE");
			} 
			else 
			{
				$conn->close();
				return errors(480);
			}
        }
        else {
        	# Connection to Database was not successful
        	$conn->close();
        	return errors(400);
        }
    }

?>