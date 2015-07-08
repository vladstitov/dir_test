<?php
session_start();
$get=$_GET;
$post=$_POST;
//$a=explode('.',strtok(basename($_SERVER['REQUEST_URI']),'?'));

if(!isset($get['a'])) {
	echo 'Hello world';
	exit;
}
$a=explode('.',$get['a']);
$result= false;


switch(array_shift($a)){
	case 'get_updates':
	$result=new stdClass();
	$stapm=(int)$get['stamp'];

	$mystamp=filemtime('../data/control.json');
	if($stapm==0) $result->stamp=$mystamp;
	else if($mystamp>$stapm){				
		 $result=json_decode(file_get_contents('../data/control.json'));
		// $result->stamp=$mystamp;
	}
	
	break;
	case 'log_error':
		$result=file_put_contents("../data/error_kiosk.log",file_get_contents("php://input")."\n\r", FILE_APPEND);		
	break;
	case 'log_data':
		$result=file_put_contents("../data/kiosk.log", file_get_contents("php://input"), FILE_APPEND);		
	break;
	case 'get_pages_list':
		include_once('cl/DbConnector.php');
		$con= new DbConnector();
		
		$sql='SELECT id,label FROM pages WHERE enable=1 ORDER BY sort';
		$result=json_encode($con->query($sql));	
		//header('Content-type: application/json'); 
			      
	break;
	case 'get_page':		
		$fn='../data/pages/p'.$get['id'].'.htm';
		$result= file_exists($fn)?file_get_contents($fn):'NO';			      
	break;
	
	case 'get_categories':
		include_once('cl/DbConnector.php');
		$con= new DbConnector();
		$sql='SELECT catid,label FROM categories WHERE enable=1 ORDER BY sort';		
		$result=json_encode($con->query($sql));	
		//header('Content-type: application/json'); 
			      
	break;
	
	case 'get_settings':
	header('Content-type: application/json');
	echo file_get_contents('../data/settings.json');
	break;
		
	case 'get_dests_list':
	include 'cl/DbConnector.php';	
		$con=new DbConnector();
		header('Content-type: application/json');
		$sql='SELECT * FROM destinations ORDER by name'	;	
		echo json_encode($con->query($sql));


	break;
	case 'get_messages':
		$fn='../data/messages.json';
		$result= file_exists($fn)?file_get_contents($fn):'NO';	
	break;
	case 'get_advanced':
        if(!isset($get['id'])) break;
		$fn='../data/details/a'.$get['id'].'.htm';
		$result = file_exists($fn)?file_get_contents($fn):'NO';	
	break;
	
	case 'get_background':
	include 'cl/Screen.php';		
		$ctr= new Screen();
		$result=$ctr->getBackground();
	break;	
	

	case 'get_rss':
	
	$id=json_decode(file_get_contents('../data/settings.json'))->screensaver->rss;
	
	$rss=json_decode(file_get_contents('../data/rss.json'));
	$rss = $rss[$id]->url;
	if($rss) $result= curl_exec(curl_init($rss)); 
	exit();
	
	break;
}


//if(is_string($result))  echo($result);
//else  echo json_encode($result);

