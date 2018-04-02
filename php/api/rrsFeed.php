<?php
header("Access-Control-Allow-Origin: *");
header('Content-type: text/xml');
$link = isset($_GET["link"]) ? $_GET["link"] : "";
$ss = file_get_contents($link);
echo $ss;