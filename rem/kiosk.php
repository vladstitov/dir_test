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
		error_log(file_get_contents("php://input")."|\n\r|", 3,'../data/logs/k_error'.date('m-y').'.log');			
	echo 'OK';		
	break;
	case 'log_log':
		file_put_contents('../data/logs/kiosk'.date("m-y").'.log', file_get_contents("php://input")."|\n\r|", FILE_APPEND);	
		echo 'OK';
	break;
	case 'log_stat':
		$type=$get['type'];		
		$val=$get['val'];
		$who=$get['who'];
		$stamp= $get['stamp'];
		$db=new PDO('sqlite:statistics.db');
		$db->query('CREATE TABLE IF NOT EXISTS stats (id INTEGER PRIMARY KEY, type CHAR(10),val CHAR(10),who CHAR(10),stamp INTEGER)');				
		$res= $db->query("INSERT INTO stats (type,val,who,stamp) VALUES ('$type','$val','$who',$stamp)");
		if($res) echo 'OK';
		else echo json_encode($db->errorInfo());		
			
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
		
	case 'get_dests':
	include 'cl/DbConnector.php';	
		$con=new DbConnector();
		$out=new stdClass();
		header('Content-type: application/json');
		$cats = $con->query('SELECT * FROM categories WHERE enable=1 ORDER BY sort');
		foreach($cats as $val) $val->id=(int)$val->id;		
		$out->cats = $cats;
		
		$dests = $con->query('SELECT * FROM destinations ORDER by LOWER(name)');
		foreach($dests as $val) $val->id=(int)$val->id;		
		$out->dests = $dests;
		
		echo json_encode($out);


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
	case 'get_stamp':
		header('Content-type: application/json');
		echo json_encode(trackController($get));	
		
	break;

	case 'get_rss':
	
	$id=json_decode(file_get_contents('../data/settings.json'))->screensaver->rss;
	
	$rss=json_decode(file_get_contents('../data/rss.json'));
	$rss = $rss[$id]->url;
	if($rss) $result= curl_exec(curl_init($rss)); 
	exit();
	
	break;
}



function trackController($get){
		$out=new stdClass();
		$out->success='success';
			if(isset($get['stamp']) && isset($get['kiosk_id'])){
					$file_name='../data/track.json';
					$id='kiosk_'.$get['kiosk_id'];
					$track= json_decode(file_get_contents($file_name));
					if(!isset($track->$id))	$track->$id = new stdClass();			
					$kiosk = $track->$id;					
					$stamp=(int)$get['stamp'];
					$k_time=(int)$get['now'];
					$timer=(int)$get['timer'];
					if($stamp==0) {
						$stamp=time();
						$kiosk->status='started';
						$kiosk ->start_at=$k_time;
						$kiosk->stamp=$stamp;
						$kiosk->ip=$_SERVER['REMOTE_ADDR'];
						$out->success='stamp';
						$out->result = $stamp;
						$out->ktime=$k_time;
						$track->$id=$kiosk;
						file_put_contents($file_name,json_encode($track));
						return $out;
					}
										
					if($kiosk->status=='restart'){
							$out->success='restart';
							$out->result='Kiosk1080.php?kiosk_id='.$id;
					}
					
					$kiosk->status='working';
					$kiosk->K_time=$k_time;
					$kiosk->let=(int)$get['let'];
					$kiosk->S_time = time();
					$kiosk->timer=$timer;
					$track->$id=$kiosk;
					file_put_contents($file_name,json_encode($track));
					
					
					
			}
			
			return $out;
		
}

//if(is_string($result))  echo($result);
//else  echo json_encode($result);

