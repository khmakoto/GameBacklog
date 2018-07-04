<?php

	# Header required when receiving content from the ajax at the front-end
	header("Content-type: application/json");

	# Connection to the dataLayer
	require_once __DIR__ . "/../model/itemModel.php";	

	# Execute the action that is being called in the ajax at the front-end
	$action = $_POST["action"];

	switch($action) {
		case "RETRIEVE":			retrieveInformation();
									break;
	}

	# Action to search game.
	function retrieveInformation() {
		$name = $_POST["name"];

		# Search for game info in Games table in database
		$result = retrieveGameInfo($name);

		if ($result["status"] == "COMPLETE") {
			echo json_encode($result);
		}
		else {
			die(json_encode($result));
		}
	}

?>