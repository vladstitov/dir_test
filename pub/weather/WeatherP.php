<?php
$callback=$_GET['callback'];
$result= new stdClass();
$result->temp=25;
$result->img='http://uplight.ca/weather/images/3.png';

echo $callback . "(" . json_encode($result) . ")";
?>