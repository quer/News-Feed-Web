<?php
header("Access-Control-Allow-Origin: *");
header('Content-type: application/json');
$json = array();
include_once '../includes/db_connect.php';
include_once '../includes/functions.php';
 
sec_session_start(); // Our custom secure way of starting a PHP session.
if (isset($_POST['username'], $_POST['password'])) {
    $username = $_POST['username'];
    $password = $_POST['password']; // The hashed password.
 
    if (login($username, $password, $mysqli) == true) {
        // Login success 
        $json = array('status' => 1);
    } else {
        // Login failed 
        $json = array('success' => 0);
    }
} else {
    // The correct POST variables were not sent to this page. 
    $json = array('success' => 2);
}

$jsonstring = json_encode($json);
echo $jsonstring;
die();