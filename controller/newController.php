<?php

	# Header required when receiving content from the ajax at the front-end.
	header("Content-type: application/json");

	# Connection to the dataLayer.
	require_once __DIR__ . "/../model/newModel.php";	

	# Execute the action that is being called in the ajax at the front-end.
	$action = $_POST["action"];

	switch($action) {
		case "SAVE":    			saveInformation();
									break;
	}

	# Action to save a new game's information to the database.
	function saveInformation() {
        $name = $_POST["name"];
        $state = $_POST["state"];
        $image = $_POST["image"];
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

        # Get image info.
        list($type, $data) = explode(";", $image);
        list(,$ext) = explode('/',$type);
        list(, $data) = explode(",", $data);
        $data = base64_decode($data);

        $imgName = str_replace(":", "", $name);
		$name = str_replace("'", "''", $name);
		$dbImgName = str_replace(":", "", $name);

        # Add game info in Games table in database.
		$result = addGameInfo($name, $state, $dbImgName.'.'.$ext, $PlayStation, $PlayStation2, $PlayStation3, $PlayStation4,
                              $PSP, $GameboyAdvance, $NintendoDS, $Nintendo3DS, $NintendoSwitch, $XboxOne, $Blizzard, $GOG, $Epic,
                              $Origin, $Steam, $Twitch, $UPlay, $Microsoft, $PC);

        if ($result["status"] == "COMPLETE") {
            # Add image to images folder.
            file_put_contents(getcwd()."/../images/$imgName.$ext", $data);

            echo json_encode($result);
        }
        else {
            die(json_encode($result));
        }
	}

?>