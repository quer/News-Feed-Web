<?php
header("Access-Control-Allow-Origin: *");
header('Content-type: application/json');
$json = array(
	'rssFeedUrl' => 'https://www.dr.dk/nyheder/service/feeds/allenyheder', 
    'decode' => 'error');
// beta 
$jsonstring = json_encode($json);
echo $jsonstring;
die();
?>