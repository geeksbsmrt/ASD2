<?php
	header('Content-type: application/json');
	$results = file_get_contents('../js/wo.json');

	echo $results;
	?>