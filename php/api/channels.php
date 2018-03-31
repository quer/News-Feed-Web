<?php
header("Access-Control-Allow-Origin: *");
header('Content-type: application/json');
$json = array();
/*$result = mysqli_query ($connection, $query);
while($row = mysqli_fetch_array ($result))     
{
    $bus = array(
        'latitude' => $row['lat'],
        'longitude' => $row['lng'],
        'icon' => './images/' . $row['busColor'] . '.png'
    );
    array_push($json, $bus);
}*/
// beta
for ($i=0; $i < 10; $i++) { 
	$bus = array(
		'name' => $i.'test', 
	    'icon' => 'https://cdn.discordapp.com/icons/377117180766060566/ac44aada691596882d1850f4fc5f007a.png'
	);
	array_push($json, $bus);
}
$jsonstring = json_encode($json);
echo $jsonstring;
die();
?>