<?php
header("Access-Control-Allow-Origin: *");
header('Content-type: application/json');

include_once '../includes/db_connect.php';
include_once '../includes/functions.php';
$json = array();
$result = $mysqli->query("SELECT `id`, `loopTag`, `name`, `feedUrl`, `mainImage` FROM `feeds`");

if ($result->num_rows > 0) {
    while ($row = $result->fetch_object()) {
        $bus = array(
			'name' => $row->name, 
		    'icon' => $row->mainImage,
		    'rssFeedUrl' => $row->feedUrl, 
	    	'decode' => getTags($mysqli, $row->id),
	    	'loopTag' => $row->loopTag
		);

		array_push($json, $bus);
    }
}
$jsonstring = json_encode($json);
echo $jsonstring;
die();

function getTags($mysqli, $id)
{
	$returnList = array();
	$result = $mysqli->query("SELECT `id`, `attrTag`, `fieldName`, `fieldValue`, `feeds_id` FROM `attr` WHERE `feeds_id` = '". $id. "'");

	if ($result->num_rows > 0) {
	    while ($row = $result->fetch_object()) {
	    	$returnList[$row->fieldName] = array(
	    		'fieldValue' => $row->fieldValue, 
	    		'attrTag' => $row->attrTag
	    	);
	    }
	}
	return $returnList;
}
?>