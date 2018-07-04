<?php

	# Connection to the database and errors
	require_once __DIR__ . "/database.php";
	require_once __DIR__ . "/errors.php";

    # Query to retrieve all games that have a searchTerm.
    function searchInGames($searchTerm) {
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
	
	# Query to retrieve games stats from all platforms.
    function retrieveOverallStats() {
    	# Open and validate the Database connection.
    	$conn = connect();

        if ($conn != null) {
        	$sql = "SELECT COUNT(*) as 'Total' FROM Games";
			$result = $conn->query($sql);

			if ($result->num_rows == 0) {
				# An error ocurred when retrieving stats.
				$conn->close();
				return errors(440);
			}

			while ($row = $result -> fetch_assoc()) {
				$total = $row["Total"];
			}

			$sql = "SELECT COUNT(*) as 'Completed' FROM Games WHERE State != 0";
			$result = $conn->query($sql);

			if ($result->num_rows == 0) {
				# An error ocurred when retrieving stats.
				$conn->close();
				return errors(440);
			}

			while ($row = $result -> fetch_assoc()) {
				$completed = $row["Completed"];
			}

			$conn->close();
			$ans = array("status" => "COMPLETE", "total" => $total, "completed" => $completed);
			return $ans;
        }
        else {
        	# Connection to Database was not successful.
        	$conn->close();
        	return errors(400);
        }
	}
	
	# Query to retrieve games stats from all platforms.
    function retrievePlatformStats($platform) {
    	# Open and validate the Database connection.
    	$conn = connect();

        if ($conn != null) {
        	$sql = "SELECT COUNT(*) as 'Total' FROM Games WHERE $platform = TRUE";
			$result = $conn->query($sql);

			if ($result->num_rows == 0) {
				# An error ocurred when retrieving stats.
				$conn->close();
				return errors(440);
			}

			while ($row = $result -> fetch_assoc()) {
				$total = $row["Total"];
			}

			$sql = "SELECT COUNT(*) as 'Completed' FROM Games WHERE State != 0 AND $platform = TRUE";
			$result = $conn->query($sql);

			if ($result->num_rows == 0) {
				# An error ocurred when retrieving stats.
				$conn->close();
				return errors(440);
			}

			while ($row = $result -> fetch_assoc()) {
				$completed = $row["Completed"];
			}

			$conn->close();
			$ans = array("status" => "COMPLETE", "total" => $total, "completed" => $completed);
			return $ans;
        }
        else {
        	# Connection to Database was not successful.
        	$conn->close();
        	return errors(400);
        }
    }

?>