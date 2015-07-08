<?php

if(!isset($_GET['url'])) exit();
 curl_exec(curl_init($_GET['url'])); 
?>