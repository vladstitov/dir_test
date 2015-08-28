<?php
require "MyDatabase2.php";	

class ScreensAdmin2 {	
	private $dba;
	private $sett;
	private function getDb(){
		if(!$this->dba){
			$this->dba=new MyDatabase2();
			$this->dba-> load('../../data/directories.db');
		}
		return $this->dba;
	}
		
	public function saveData($screenid,$dataid,$obj){
		$filename='../../data/d' . $screenid. '.json';
		if(!file_exists($filename)) return 0;
		$data=json_decode(file_get_contents($filename));
		$data->$dataid=$obj;
		if(file_put_contents($filename,json_encode($data))) return $obj;
		else return 0;
			
	}
	
	public function getData($screenid,$dataid=0){
		$filename='../../data/d'.$screenid.'.json';
		if(!file_exists($filename)) return 0;
		if($dataid)	return json_decode(file_get_contents($filename))->$dataid;
		else return json_decode(file_get_contents($filename));
	}
	
	
	public function savePage($screenid,$num,$data){
		$res=file_put_contents('../../data/additional/page'.$num.'.xml',$data);
	   //	else   if(file_exists('../../data/additional/page'.$num.'.xml') ) $res=file_get_contents('../../data/additional/p'.$num.'.xml'); 
		return $res;
	}
	public function getPage($screenid,$num){
		$res=0;
		if(file_exists('../../data/additional/page'.$num.'.xml') ) $res=file_get_contents('../../data/additional/page'.$num.'.xml'); 
		return $res; 
	}
	
	public function savePageData($screenid,$file,$filename){
	   	$data = isset($file->data)?$file->data:$file;
		if(!file_exists('../../data/additional'))	 return 0;
		
		$res=file_put_contents('../../data/additional/'.$filename,$data);
		
		if($res) return 'data/additional/'.$filename;
		else return 0;
		
	}
	public function saveGetLocation($screenid,$obj=0){
		$res=0;
		if($obj)	$res=file_put_contents('../../data/location.json',json_encode($obj));
		else if(file_exists('../../data/location.json') ) $res=file_get_contents('../../data/location.json');
		return $res;
	}
	private function getScreenId(){
		$res="";
		if(file_exists('../../screen.xml')) {
			 $xml=simplexml_load_file('../../screen.xml'); 
			 $url=(string)$xml->url;
			 $id=substr($url,strrpos($url,'/s')+2);
			 $res=substr($id,0,(strpos($id,'x')));
			
		}
		return $res;
	}
	
	public function doLogin($user,$pass){
		$sql="SELECT * FROM users WHERE users.username='". addslashes($user)."' AND users.password='". addslashes($pass)."'";
		$result=$this->getDb()->query($sql);
		$row=$this->getDb()->fetch_assoc($result);
		
		if($row){
			//if($row['screenid']==""){
				$id=$this->getScreenId();
				$row['screenid']=$id;
				//$sql="UPDATE users SET screenid=$id WHERE usersid=".$row['usersid']; 
				//$result=$this->getDb()->query($sql);
			//}
			Authenticate::login($row['screenid'],$row['role']);
			
			$row=$this->getData($row['screenid']);
		}else Authenticate::logout();
		
		return $row;
	}
	
	
	public function beforeFilter($function_called){
		return true;
	if($function_called=="doLogin" || Authenticate::isUserInRole('admin')) return true;
	else return false;
	}

	





	   
}
?>