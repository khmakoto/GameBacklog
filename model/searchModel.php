<?php

    # Connection to the database and errors
	require_once __DIR__ . "/database.php";
	require_once __DIR__ . "/errors.php";

    # Query to retrieve results of search on a given keyword or keyphrase.
    function getResults($searchTerm) {
    	# Open and validate the Database connection.
    	$conn = connect();

        if ($conn != null) {
        	$sql = "SELECT Name, State, ImageSource FROM Games WHERE Name LIKE '%$searchTerm%' ORDER BY Name ASC";
			$result = $conn->query($sql);
			
			$arr = array();

			if ($result->num_rows == 0) {
				# There are no games that match the searchTerm in the database.
				$conn->close();
				return errors(420);
			}

			# If there is more than one game.
			while ($row = $result -> fetch_assoc()) {
				array_push($arr, array("name" => $row["Name"], "state" => $row["State"], "imageSource" => $row["ImageSource"]));
			}

			$conn->close();
			$ans = array("status" => "COMPLETE", "array" => $arr);
			return $ans;
        }
        else {
        	# Connection to Database was not successful.
        	$conn->close();
        	return errors(400);
        }
	}

	# Query to retrieve results all entries.
    function overallResults() {
    	# Open and validate the Database connection.
    	$conn = connect();

        if ($conn != null) {
        	$sql = "SELECT Name, State, ImageSource FROM Games ORDER BY Name ASC";
			$result = $conn->query($sql);
			
			$arr = array();

			if ($result->num_rows == 0) {
				# There are no games in the database.
				$conn->close();
				return errors(500);
			}

			# If there is more than one game.
			while ($row = $result -> fetch_assoc()) {
				array_push($arr, array("name" => $row["Name"], "state" => $row["State"], "imageSource" => $row["ImageSource"]));
			}

			$conn->close();
			$ans = array("status" => "COMPLETE", "array" => $arr);
			return $ans;
        }
        else {
        	# Connection to Database was not successful.
        	$conn->close();
        	return errors(400);
        }
	}

	# Query to retrieve results all entries of a given platform.
    function getPlatformResults($platform) {
    	# Open and validate the Database connection.
    	$conn = connect();

        if ($conn != null) {
        	$sql = "SELECT Name, State, ImageSource FROM Games WHERE $platform = 1 ORDER BY Name ASC";
			$result = $conn->query($sql);
			
			$arr = array();

			if ($result->num_rows == 0) {
				# There are no games that match the platform in the database.
				$conn->close();
				return errors(500);
			}

			# If there is more than one game.
			while ($row = $result -> fetch_assoc()) {
				array_push($arr, array("name" => $row["Name"], "state" => $row["State"], "imageSource" => $row["ImageSource"]));
			}

			$conn->close();
			$ans = array("status" => "COMPLETE", "array" => $arr);
			return $ans;
        }
        else {
        	# Connection to Database was not successful.
        	$conn->close();
        	return errors(400);
        }
	}

?>