<?php

	# Establishing the connection to the Database
	function connect() {
		$servername = "localhost";
		$username = "root";
		$password = "";
		$dbname = "GameBacklog";

		$connection = new mysqli($servername, $username, $password, $dbname);
	
		// Check connection
		if ($connection->connect_error) {
		    return null;
		}
		else {
			return $connection;
		}
	}

	# Callback error messages
	function errors($type) {
		$header = "HTTP/1.1 ";

		switch($type) {
			case 400:	$header .= "400 Bad connection to Database";
						break;
			case 420:	$header .= "420 No game matches the search term in Database";
						break;
			default:	$header .= "404 Request Not Found";
		}

		header($header);
		return array('status' => 'ERROR', 'code' => $type);
	}

    # Query to retrieve all games that have a searchTerm.
    function searchInGames($searchTerm) {
    	# Open and validate the Database connection
    	$conn = connect();

        if ($conn != null) {
        	$sql = "SELECT Name, State, ImageSource FROM Games WHERE Name LIKE '%$searchTerm%' ORDER BY Name ASC";
			$result = $conn->query($sql);
			
			$arr = array();

			if ($result->num_rows == 0) {
				# There are no games that match the searchTerm in the database
				$conn->close();
				return errors(420);
			}

			# If there is more than one post
			while ($row = $result -> fetch_assoc()) {
				array_push($arr, array("name" => $row["Name"], "state" => $row["State"], "imageSource" => $row['ImageSource']));
			}

			$conn->close();
			$ans = array("status" => "COMPLETE", "array" => $arr);
			return $ans;
        }
        else {
        	# Connection to Database was not successful
        	$conn->close();
        	return errors(400);
        }
    }

?>