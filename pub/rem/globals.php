<?php

	//Set start time before loading framework
	list($usec, $sec) = explode(" ", microtime());
	$amfphp['startTime'] = ((float)$usec + (float)$sec);
	
	$servicesPath = "services/";
	$voPath = "services/vo/";
	$data='../../data/';
	
	define("ROOT",$_SERVER['DOCUMENT_ROOT']);
	define("WEB",$_SERVER['HTTP_HOST']);
	//define("PROJECT",'directories/');
	define("MEDIA",'data/media');
	define("BACK",'../../');
	define("IMAGES",'data/images');
	//define("ROOT_HOST",$_SERVER['DOCUMENT_ROOT']."/directories/location/Client Assets");
	//define("CLIENT_ASSETS_LOCAL",'C:\NovoTouch\Client Assets');	
	//define("CLIENT_ASSETS_LOCAL",'/Client Assets');
	//define("CLIENT_ASSETS",PROJECT.'location/Client Assets');
	define("DATA",'../../data/');
	
	
	//As an example of what you might want to do here, consider:
	
	/*
	if(!PRODUCTION_SERVER){
		define("DB_HOST", "localhost");
		define("DB_USER", "root");
		define("DB_PASS", "");
		define("DB_NAME", "amfphp");
	}
	*/
	
?>