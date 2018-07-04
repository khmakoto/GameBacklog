<?php

    # Establishing the connection to the Database.
	function connect() {
		$servername = "localhost";
		$username = "root";
		$password = "";
		$dbname = "GameBacklog";

		$connection = new mysqli($servername, $username, $password, $dbname);
	
		// Check connection.
		if ($connection->connect_error) {
		    return null;
		}
		else {
			return $connection;
		}
	}

?>