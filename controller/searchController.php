<?php

	# Header required when receiving content from the ajax at the front-end
	header("Content-type: application/json");

	# Connection to the dataLayer
	require_once __DIR__ . "/../model/searchModel.php";	

	# Execute the action that is being called in the ajax at the front-end
	$action = $_POST["action"];

	switch($action) {
		case "RETRIEVE":			retrieveResults();
									break;
	}

	# Action to retrieve results' information on a given keyword or keyphrase.
	function retrieveResults() {
		$searchTerm = $_POST["searchTerm"];

		# Search for game info in Games table in database
		$result = getResults($searchTerm);

		if ($result["status"] == "COMPLETE") {
			echo json_encode($result);
		}
		else {
			die(json_encode($result));
		}
	}

?>