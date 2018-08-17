<?php

	# Header required when receiving content from the ajax at the front-end.
	header("Content-type: application/json");

	# Connection to the dataLayer.
	require_once __DIR__ . "/../model/itemModel.php";	

	# Execute the action that is being called in the ajax at the front-end.
	$action = $_POST["action"];

	switch($action) {
		case "RETRIEVE":			retrieveInformation();
									break;
		case "UPDATE":				updateInformation();
									break;
	}

	# Action to retrieve game information.
	function retrieveInformation() {
		$name = $_POST["name"];
		$name = str_replace("'", "''", $name);

		# Search for game info in Games table in database.
		$result = retrieveGameInfo($name);

		if ($result["status"] == "COMPLETE") {
			echo json_encode($result);
		}
		else {
			die(json_encode($result));
		}
	}

	# Action to update game information.
	function updateInformation() {
		$prevName = $_POST["prevName"];
		$name = $_POST["name"];
		$name = str_replace("'", "''", $name);
		$state = $_POST["state"];
		$PlayStation = $_POST["PlayStation"];
		$PlayStation2 = $_POST["PlayStation2"];
		$PlayStation3 = $_POST["PlayStation3"];
		$PlayStation4 = $_POST["PlayStation4"];
		$PSP = $_POST["PSP"];
		$GameboyAdvance = $_POST["GameboyAdvance"];
		$NintendoDS = $_POST["NintendoDS"];
		$Nintendo3DS = $_POST["Nintendo3DS"];
		$NintendoSwitch = $_POST["NintendoSwitch"];
		$XboxOne = $_POST["XboxOne"];
		$Blizzard = $_POST["Blizzard"];
		$GOG = $_POST["GOG"];
		$Epic = $_POST["Epic"];
		$Origin = $_POST["Origin"];
		$Steam = $_POST["Steam"];
		$Twitch = $_POST["Twitch"];
		$UPlay = $_POST["UPlay"];
		$Microsoft = $_POST["Microsoft"];
		$PC = $_POST["PC"];

		# Update info in Games table in database.
		$result = updateGameInfo($prevName, $name, $state, $PlayStation, $PlayStation2, $PlayStation3, $PlayStation4, $PSP,
								 $GameboyAdvance, $NintendoDS, $Nintendo3DS, $NintendoSwitch, $XboxOne, $Blizzard, $GOG, $Epic,
								 $Origin, $Steam, $Twitch, $UPlay, $Microsoft, $PC);

		if ($result["status"] == "COMPLETE") {
			echo json_encode($result);
		}
		else {
			die(json_encode($result));
		}
	}

?>