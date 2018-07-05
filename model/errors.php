<?php

    # Callback error messages.
	function errors($type) {
		$header = "HTTP/1.1 ";

		switch($type) {
			case 400:	$header .= "400 Bad connection to Database";
						break;
			case 420:	$header .= "420 No game matches the search term in Database";
						break;
			case 440:	$header .= "440 There was an error retrieving stats, try again";
                        break;
            case 460:   $header .= "460 Error while retrieving game information from Database";
						break;
			case 480:   $header .= "480 Error while updating game information in Database";
						break;
			default:	$header .= "404 Request Not Found";
		}

		header($header);
		return array("status" => "ERROR", "code" => $type);
	}

?>