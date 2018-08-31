<?php

    # Callback error messages.
	function errors($type) {
		$header = "HTTP/1.1 ";

		switch($type) {
			case 400:	$header .= "400 Bad connection to database.";
						break;
			case 420:	$header .= "420 No game matches the search term in database.";
						break;
			case 440:	$header .= "440 There was an error retrieving stats, try again.";
                        break;
            case 460:   $header .= "460 Error while retrieving game information from database.";
						break;
			case 480:   $header .= "480 Error while updating game information in database.";
						break;
			case 500:	$header .= "500 No game found in database for the specified platform.";
						break;
			case 520:   $header .= "520 Error while adding game information to database.";
						break;
			case 540:	$header .= "540 Error while deleting game information from database.";
						break;
			default:	$header .= "404 Request Not Found.";
		}

		header($header);
		return array("status" => "ERROR", "code" => $type);
	}

?>