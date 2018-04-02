<?php
header("Access-Control-Allow-Origin: *");
header('Content-type: application/xml');
$json = array(
	'rssFeedUrl' => 'http://localhost/News-Feed/api/rrsfeed', 
    'decode' => 'error');
// beta 
$jsonstring = json_encode($json);
echo $jsonstring;
die();
?>