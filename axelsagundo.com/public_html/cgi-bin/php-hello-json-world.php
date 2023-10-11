<?php
$myObj = new stdClass();
$myObj->message = "Issac was here, Hello World";
$myObj->date = date("Y-m-d");
$myObj->time = date("h:i:sa");
$myObj->ip = $_SERVER['REMOTE_ADDR'];

$myJSON = json_encode($myObj);

echo $myJSON;
?>
