<?php
session_start();
if(!isset($_SESSION['directories_user']) || $_SESSION['directories_user']!='admin'){
	echo 'please login';	
	exit;
}

$get=$_GET;
$post=$_POST;
//$a=explode('.',strtok(basename($_SERVER['REQUEST_URI']),'?'));

if(!isset($get['a'])) {
	echo 'set action';
	exit;
}
$a=explode('.',$get['a']);
$result= false;


switch(array_shift($a)){	
	case 'restart_kiosks':
	$control= json_decode(file_get_contents('../data/control.json'));
	$control->reload=time();
	file_put_contents('../data/control.json',json_encode($control));
	break;
	case 'saveTitle':	
		saveSettings('title',$post['title']);
	break;	
		
	case 'pages':
	include 'cl/Pages.php';	
		$ctr=new Pages();		
		$result = $ctr->process($a,$post,$get);		
	break;
	
	case 'cats':				
	include 'cl/Categories.php';
		$ctr=new Categories();
		$result= $ctr->process($a,$post,$get);		
	break;
		
	case 'dests':		
	include 'cl/Destinations.php';
		$ctr=new Destinations();
		$result = $ctr->process($a,$post,$get);			
	break;
    case 'destination':
        include 'cl/Destinations.php';
        $ctr=new Destinations();
        $result = $ctr->process($a,$post,$get);
        break;
			
	case 'screen':
	include 'cl/Screen.php';		
		$ctr= new Screen();
		$result=$ctr->process($a,$post,$get);
	break;
	
	case 'importexport':
	include 'cl/ImportExport.php';		
		$ctr= new ImportExport();
		$result=$ctr->process($a,$post,$get);
	break;	
	
	case 'login':
	include('gateway.php');	
		exit();
	break;
}


if($result){
	if(is_string($result)) echo($result);
	else{
		header('Content-type: application/json');
		echo json_encode($result);
	}
}else echo'no result no errors';

function getSettings(){
	$filename=	'../data/settings.json';
	return json_decode(file_get_contents($filename));
}
function saveSettings($prop,$value){
	$filename=	'../data/settings.json';
	$sett=json_decode(file_get_contents($filename));
	$sett->$prop=$value;
	return file_put_contents($filename,json_encode($sett));
}

?>