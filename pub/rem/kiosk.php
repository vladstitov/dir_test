<?php
define('DATA','../../data/');
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
	case 'get_stamp':
	echo json_encode(trackKiosk($get));	
	break;
	case 'log_error':
		error_log(file_get_contents("php://input")."|\n\r|", 3,DATA.'logs/k_error'.date('m-y').'.log');			
	echo 'OK';		
	break;
	case 'log_log':
		file_put_contents(DATA.'logs/kiosk'.date("m-y").'.log', file_get_contents("php://input")."|\n\r|", FILE_APPEND);	
		echo 'OK';
	break;
	case 'log_stat':
		$type=$get['type'];		
		$val=$get['val'];	
		$db=new PDO('sqlite:'.DATA.'statistics.db');
		inserClick($get,$db);
		switch($type){
			case 'sr':
			$res = addRate('destinations',$val,$db);			
			break;
			case 'kb':
			$res = addRate('search',$val,$db);
			break;
			case 'kw':
			$res = addRate('keywords',$val,$db);
			break;
			case 'pg':
			$res = addRate('pages',$val,$db);
			break;
			case 'cp':
			$res = updateCategory($val,'+1',$db);
			break;
			case 'cm':
			$res = updateCategory($val,'-1',$db);
			break;
		
		}	
		
		if($res) echo 'OK';
		else echo json_encode($db->errorInfo());		
			
	break;
	case 'get_data':
	
		if(isset($get['file_name'])){
					$fn=DATA.$get['file_name'];
			echo file_exists($fn)?file_get_contents($fn):'NO';
		}			      
	break;	
	
	case 'get_categories':
		include_once('cl/DbConnector.php');
		$con= new DbConnector();
		$sql='SELECT catid,label FROM categories WHERE enable=1 ORDER BY sort';		
		$result=json_encode($con->query($sql));	
		//header('Content-type: application/json'); 
			      
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
}

function inserClick($get,$db){
		$type=substr($get['type'].$get['val'],0,10);	
		$who = isset($get['who'])?addslashes($get['who']): $_SERVER['REMOTE_ADDR'];	
		$stamp = isset($get['stamp'])?$get['stamp']:''.time();
		if(strlen($stamp)>10)$stamp = substr($stamp,0,10);
		$res= $db->query("INSERT INTO clicks (device,stamp,type) VALUES ('$who',$stamp,'$type')");		
		return $res;
}

function addRate($table,$word,$db){	
		$res = $db->query("UPDATE $table SET rate=rate+1 WHERE value='$word'");
		if($res->rowCount()===0)$res = $db->query("INSERT INTO $table (value,rate) VALUES('$word',1)");
		return $res;
}
function updateCategory($id,$incr,$db){		
		$res = $db->query("UPDATE categories SET rate=rate$incr WHERE id=".$id);
		if($res->rowCount()===0)$res = $db->query("INSERT INTO categories (id,rate) VALUES($id,10000)");
		return $res;
}

function trackKiosk($get){	
	
		$out=new stdClass();
		$out->success='success';			
		$file_name=DATA.'kiosks.json';
		
		$id=(int)$get['id'];
		$track = json_decode(file_get_contents($file_name));
		
		foreach($track as $kiosk) if($kiosk->id===$id) break;
		
		if($kiosk->id!==$id){
				$out->success='nothing '.$id;
				return $out;		
		}		
					
		$stamp=(int)$get['stamp'];
		$k_time=(int)@$get['now'];
		$timer=(int)@$get['timer'];
		$status=@$get['status'];
		
		if($stamp==0) {
			$stamp=time();
			$kiosk->status='started';// 1 status started;  2 status working ; 3 status screensaver; 100 restart with url; 99 reload
			$kiosk ->start_at = $k_time;
			$kiosk->stamp = $stamp;
			$kiosk->ip = $_SERVER['REMOTE_ADDR'];
			$out->success = 'stamp';
			$out->result = $stamp;
			$out->ktime = $k_time;			
			file_put_contents($file_name,json_encode($track));
			return $out;
		}
							
		if($kiosk->status=='restart'){
			$out->success='restart';
			$out->result='Kiosk1080.php?device='.$id;
		}
		if($kiosk->status=='reload'){
			$out->success='reload';
			$out->result=''.$id;
		}
		
		$kiosk->status=$status;
		$kiosk->K_time=$k_time;
		$kiosk->ping=(int)@$get['ping'];
		$kiosk->S_time = time();
		$kiosk->timer=$timer;
		
		file_put_contents($file_name,json_encode($track));
		
					
					
		
			
			return $out;
		
}



