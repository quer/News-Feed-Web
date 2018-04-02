<?php
header("Access-Control-Allow-Origin: *");
header('Content-type: application/json');
$json = array();
include_once '../includes/db_connect.php';
include_once '../includes/functions.php';
sec_session_start(); // Our custom secure way of starting a PHP session.
if (isset($_POST['data'])) {
    $data = $_POST['data'];
    $rrsfeedData = json_decode($data);

    $loopTag = $rrsfeedData->loopTag;
    $name = $rrsfeedData->name;
    $feedUrl = $rrsfeedData->rssUrl;
    $mainImage = $rrsfeedData->mainImage;

    $image = $rrsfeedData->image;
    $title = $rrsfeedData->title;
    $link = $rrsfeedData->link;
    $DateFiled = $rrsfeedData->Date;

    $resultat = addRrsfeed($mysqli, $loopTag, $name, $feedUrl, $image, $title, $link, $DateFiled, $mainImage);
    $json = $resultat;
} else {
    // The correct POST variables were not sent to this page. 
    $json = array('success' => 2);
}

$jsonstring = json_encode($json);
echo $jsonstring;
die();