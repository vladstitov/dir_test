<?
include_once('cl/DbConnector.php');
class Utils{
    var  $db;
	var $con;

	private function getDB(){	
			if(!$this->db) $this->db = new PDO('sqlite:'.DATA.'statistics.db');
			return $this->db;
	}
	public function getStatistics($get){
		$from=strtotime($get['from']);//1437096651492;
		$to=strtotime($get['to']);
		return $this->getDB()->query("SELECT * FROM stats WHERE stamp BETWEEN $from AND $to")->fetchAll(PDO::FETCH_NUM);
	}
	
	public function getData($get){
			if(isset($get['file_name'])){
				$file_name= DATA.$get['file_name'];			
				if(file_exists($file_name)) return file_get_contents($file_name);			
			}			
			return 'ERROR';
	}
	
	
	
	public function saveData($file_name,$data){
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
			$out->result= $file_name;
		} else $out->error='cant save file';
		
		return $out;
	}
	
	public function savePage($file_name,$data){
		$out=new stdClass();
		$res = file_put_contents('../'.$file_name,$data);	
		if($res){
			$out->success='file saved';
			$out->result= $file_name;
		} else $out->error='cant save file';
		
		return $out;
	}

	public function uploadImage($file,$folder,$prefix){
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


}
