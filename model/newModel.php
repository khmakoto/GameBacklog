<?php

    # Connection to the database and errors
	require_once __DIR__ . "/database.php";
	require_once __DIR__ . "/errors.php";

	# Add game information to database
    function addGameInfo($name, $state, $image, $PlayStation, $PlayStation2, $PlayStation3, $PlayStation4, $PSP,
					     $GameboyAdvance, $NintendoDS, $Nintendo3DS, $NintendoSwitch, $XboxOne, $Blizzard, $GOG, $Epic, $Origin,
						 $Steam, $Twitch, $UPlay, $Microsoft, $PC) {
    	# Open and validate the Database connection
    	$conn = connect();

        if ($conn != null) {
        	$sql = "INSERT INTO Games(Name, State, ImageSource, PlayStation, PlayStation2, PlayStation3, PlayStation4, PSP,
                    GameboyAdvance, NintendoDS, Nintendo3DS, NintendoSwitch, XboxOne, PC, Blizzard, GOG, Epic, Origin, Steam,
                    Twitch, UPlay, Microsoft)
                    VALUES('$name', '$state', '$image', '$PlayStation', '$PlayStation2', '$PlayStation3',
                    '$PlayStation4', '$PSP', '$GameboyAdvance', '$NintendoDS', '$Nintendo3DS', '$NintendoSwitch',
                    '$XboxOne', '$PC', '$Blizzard', '$GOG', '$Epic', '$Origin', '$Steam', '$Twitch', '$UPlay', '$Microsoft')";
            
			if (mysqli_query($conn, $sql)) 
	    	{
	    		$conn->close();
			    return array("status" => "COMPLETE");
			}
			else 
			{
				$conn->close();
				return errors(520);
			}
        }
        else {
        	# Connection to Database was not successful
        	$conn->close();
        	return errors(400);
        }
    }

?>