<?php
require "MyDatabase.php";	

class ScreensAdmin {	
	private $dba;
	public function __get($db){
		if(!$this->dba){
			$this->dba=new MyDatabase();
			$this->dba-> load('../../data/directories.db');
		}
		return $this->dba;
	}
	/*
	public function saveData($dataid,$obj){
		$filename='../../data/'.$dataid.'.json';
		if(file_put_contents($filename,json_encode($obj))) return "success: File saved";
		else return "error: Can't save file in location".$filenam;
		
	}
	
	function getData($dataid){
		$filename='../../data/'.$dataid.'.json';
		if(!file_exists($filename)) return 'error: File not exists: '.$filename;
		return json_decode(file_get_contents($filename));
	}
		*/
	public function getMedia($screenId,$type){
		
		$resolution=$this->getSettings($screenId);
		$resolution=$resolution->resolution;
		$files=array();
		
		if($type=="ss") $files[]='templates/AL_'.$resolution.'.swf';
		else if($type=="bg") $files[]='templates/BG_'.$resolution.'.jpg';
		else if($type=="tc") $files[]='templates/TC_'.$resolution.'.swf';
		
		if(!file_exists('../../data/media'))return "no folder:../../data/media";
				
		if ($handler = opendir('../../data/media')){
					
			while (false !== ($myfile = readdir($handler))) {
				if(substr($myfile,0,2)!=$type)continue;
				$files[]='data/media/'.$myfile;
			 }
			}
		
	    closedir($handler); # close handler for media	
		
		return $files;
	}
	
	
	public function  getSettings($screenid){
		$file='../../data/d'.$screenid.'.json';
		if(file_exists($file))	return json_decode(file_get_contents($file));
		else return "File not exists ".$file;
		
	}
	
	public function saveSetting($key,$value,$screenid){
		$settings = json_decode(file_get_contents('../../data/d'.$screenid.'.json'));
		$settings->$key=$value;
				
		if(file_put_contents('../../data/d'.$screenid.'.json',json_encode($settings))) return $settings->$key;
		else return 0;
		
	}
	
	public function getAttractLoopsByScreenId($screenId){
		$sql="SELECT * FROM attract_loops ";
		$result=$this->db->insert_update($sql) ; //or die ($this->db->error());
		
		return $this->db->fetchAllAsSoc($result);
	}
	
	function addLoop($url,$screenid){
		$sql="INSERT INTO attract_loops (loop_name,path,loop_order,screen_id) VALUES ('default','".$url."',1,".$screenid.")";
		$result=$this->db->insert_update($sql) ; //or die ($this->db->error());
		return $result?array('success'=>true):array('alert'=>"Fail to insert Attract loop \n".$this->db->error());
	}
	
	function removeLoop($number,$screenid){
		$loops=$this->getAttractLoopsByScreenId($screenid);
		$result=$this->db->insert_update("DELETE FROM attract_loops WHERE attractloop_id=".$loops[$number]['attractloop_id']);
		return $result?array('success'=>true):array('alert'=>"Fail to insert Attract loop \n".$this->db->error());
	}
	
	public function saveMedia($file,$id,$original_name,$screnid){
	   	$data = $file->data;
		if(!file_exists('../../data/media'))	 return returnAlert("Folder not exist: ../../data/media");
		$fn=$id.'_'.$original_name;
		$res=file_put_contents('../../data/media/'.$fn,$data);
		
		if($res) return $this->returnResult('data/media/'.$fn);
		else return $this->returnAlert("Can't save file Probably ");
		
	}
	private function returnAlert($value){
		return array("alert"=>$value);
	}
	private function returnResult($value){
		return array("success"=>$value);
	}
	//deletes file from media folder
	public function deleteMedia($filename,$screenid){
		
		if(substr($filename,0,8)=="template") return array('alert'=>"You can't remove Template");
		else if(unlink('../../'.$filename)) return array('success'=>true);
		
		return array('alert'=>"Can't reemove: ../../".$filename);;
		
	}
	public function doLogin($user,$pass){
		
		$sql="SELECT * FROM users WHERE users.username='". addslashes($user)."' AND users.password='". addslashes($pass)."'";
		
		$result=$this->db->insert_update($sql);
	
		$row=$this->db->fetch_assoc($result);
		if($row){
			$userId = $row['screenid'];
			
			Authenticate::login($userId,$row['role']);
			$row['server']=$_SERVER['SERVER_ADDR'];
			//$row['screenid']=$userId;	
			if(file_exists('../../'.$row['profile']))	$row['profile']=file_get_contents('../../'.$row['profile']);					
		}else Authenticate::logout();
		
		return $row;
	}
	
	
	public function beforeFilter($function_called){
	if($function_called=="doLogin" || Authenticate::isUserInRole('admin')) return true;
	else return false;
	}

	





	   
}
?>