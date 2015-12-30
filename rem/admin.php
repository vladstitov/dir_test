<?
error_reporting(E_ALL);
session_start();
define('DATA','../data/');
define('IMG','images/');
define('DETAILS','details/');
define('MEDIA','media/');
define('DETAILS_IMG','details/img/');
define('PREFIX','../');
define('PAGES','pages/');
define('LOG','../log/');

$admin_email='uplight.ca@gmail.com';
if(!isset($_SESSION['directories_user'])){
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
	case 'log_error':
		$result = new stdClass();
		$result->success='success';
		$txt=file_get_contents('php://input');
		error_log($txt,3,LOG.'sdmin_error.txt');
		if(mail($admin,'Error admin directories',$txt))	$result->result='emailed';	
	break;
		
	case 'get_statistics':
		include 'cl/Statistics.php';
		$ctr = new Statistics();
		$result = $ctr->getStatistics();
	break;
	case 'get_usage':
		include 'cl/Statistics.php';		
		$ctr = new Statistics();		
		$result = $ctr->getUsage($get['devices'],$get['from'],$get['to']);
	break;
	case 'get_devices_data':
	$result = utils()->getDevicesData();
	break;
	case 'restart_kiosks':		
		$result = utils()->restartKiosks($get);
	break;
	case 'upload_image':	
		$result = utils()->uploadImage($_FILES["file"],$get['folder'],$get['prefix']);	
	break;
	
	case 'save_settings':
		$result = utils()->saveSettings(file_get_contents('php://input'));
	break;	
	case 'get_data':
		$result = utils()->getData($get);
	break;
	case 'save_data':	
		if(!isset($get['file_name'])) die('ERROR 1');
		$result = utils()->saveData($get['file_name'],file_get_contents('php://input'));					
	break;	
	case 'save_page':
		if(!isset($get['url'])) die('ERROR 1');
		$result = utils()->savePage($get['url'],file_get_contents('php://input'));		
	break;
	case 'get_page':
		if(!isset($get['url'])) die('ERROR 1');
		$result = file_get_contents(PREFIX.$get['url']);
	break;
	
	
	// LARGE Classes here
	case 'cats':				
		include 'cl/Categories.php';
		$ctr=new Categories();		
		$result=$ctr->process($a,$post,$get);	
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
		$result=$ctr->process($a,json_decode(file_get_contents("php://input")),$get);
	break;	
}


if($result!==false){
	if(is_string($result)) echo($result);
	else{
		header('Content-type: application/json');
		echo json_encode($result);
	}
}else echo'no result no errors';


function utils(){
	include 'cl/Utils.php';
	return new Utils();
}
