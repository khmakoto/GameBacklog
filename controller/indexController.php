<?php

	# Header required when receiving content from the ajax at the front-end
	header('Content-type: application/json');

	# Connection to the dataLayer
	require_once __DIR__ . '/../model/indexModel.php';	

	# Execute the action that is being called in the ajax at the front-end
	$action = $_POST['action'];

	switch($action) {
		case 'SEARCH':				searchGames();
									break;
	}

	# Action to search game.
	function searchGames() {
		$searchTerm = $_POST["searchTerm"];

		# Search searchTerm in User table in database
		$result = searchInGames($searchTerm);

		if ($result['status'] == 'COMPLETE') {
			echo json_encode($result);
		}
		else {
			die(json_encode($result));
		}
	}

?>