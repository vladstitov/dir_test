<?php
session_start();
define('DATA','../../data/');
define('IMG','images/');


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
$result = false;


switch(array_shift($a)){	
	case 'get_statistics':
	$from=strtotime($get['from']);//1437096651492;
	$to=strtotime($get['to']);	
	////echo'   from '.$from.'  '.$get['from'];
	//echo'   to '.$to.'  '.$get['to'];
	$db = new PDO('sqlite:'.DATA.'statistics.db');
	 $result = $db->query("SELECT * FROM stats WHERE stamp BETWEEN $from AND $to")->fetchAll(PDO::FETCH_NUM);
	break;
	case 'upload_image':
	
	$result = uploadImage($_FILES["file"],$get['folder'],$get['prefix']);
	
	break;
	case 'get_data':
			if(!isset($get['file_name'])){
				$result =  'ERROR';
				break;
			}
			$file_name= DATA.$get['file_name'];
			
			if(file_exists($file_name)) $result = file_get_contents($file_name);
			else $result='ERROR';
	break;
	case 'save_data':	
			if(!isset($get['file_name'])) die('ERROR 1');
			$result = saveData($get['file_name'],file_get_contents('php://input'));					
					
	break;	
	
	case 'save_page':
		if(!isset($get['url'])) die('ERROR 1');
		$result = savePage($get['url'],file_get_contents('php://input'));		
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


if($result!==false){
	if(is_string($result)) echo($result);
	else{
		header('Content-type: application/json');
		echo json_encode($result);
	}
}else echo'no result no errors';
/*
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
*/

function savePage($file_name,$data){
		$out=new stdClass();
		$res = file_put_contents('../'.$file_name,$data);	
		if($res){
			$out->success='file saved';
			$out->result= $file_name;
		} else $out->error='cant save file';
		
		return $out;
}

function saveData($file_name,$data){
		$out=new stdClass();				
		$filename=DATA.$file_name;
					
		if(!file_exists($filename)) {
					$out->error='hacker';
					return $out;				
		}
		
		rename($filename,DATA.'arch/'.time().$file_name);
		
		$res = file_put_contents($filename,$data);	
			
		if($res){
			$out->success='file saved';
			$out->result= DATA.$file_name;
		} else $out->error='cant save file';
		
		return $out;
		
}

function uploadImage($file,$folder,$prefix){
			$out=new stdClass();
			
		if ($file["error"] > 0){
			$out->error= $file["error"];
			return $out;
		}
		
		if (!file_exists('../'.IMG.$folder)) mkdir('../'.IMG.$folder, 0777, true);
		
		$filename = $folder.'/'.$prefix.'_'.$file["name"];
		
		if(move_uploaded_file($file["tmp_name"],'../'.IMG.$filename)){
			$out->success='success';
			$out->result=IMG.$filename;
		}		
		return $out;
		
		}
?>