<?
include_once('cl/DbConnector.php');
class Device{
		var $type;
		var $id;
		function Device($type,$id){
			$this->type=$type;
			$this->id=$id;
		}
}
class Statistics{
    var  $db;
	var $con;
	var $pub;
	var $filename;
	
	function Statistics(){
	
			$this->filename = DATA.'statistics.json';
	}

	function getUsage($get){
			$devs=array();		
			if(isset($get['kiosks'])) foreach(explode(',',$get['kiosks']) as $id) $devs[] = new Device('kiosk',$id);		
			$from=isset($get['from'])?$get['from']:0;
			$to = isset($get['to'])?$get['to']:time();
			if(isset($get['web']))$devs[] = new Device('web',0);
			return $this->getCount($devs,$from,$to);
	
	}
	private function getDB(){	
			if(!$this->db) $this->db = new PDO('sqlite:'.DATA.'statistics.db');
			return $this->db;
	}
	
	
	function getCount($ar,$from,$to){	
				$from=is_numeric($from)?(int)$from:strtotime($from);//1437096651492;
				$to=is_numeric($to)?(int)$to:strtotime($to);				
				$db= $this->getDB();
				foreach($ar as $device){
					$id = (int)$device->id;
					$name = addslashes($device->type);
					$sql = "SELECT stamp FROM stats WHERE (stamp BETWEEN $from AND $to) AND who='$name' AND did=$id";					
					$res = $db->query($sql);
					if($res)$device->clicks = $res->fetchAll(PDO::FETCH_COLUMN, 0);	
					else var_dump($db->errorInfo());			
				}

			return $ar;
	
	}
	function getStatistics(){
				$pub= $this->getPublished();
				$now= time();				
				$pub = $this->addStatistics($pub,$now);
				return $pub;			
	
	}
		
	
	private function addValue(&$ar,$str){
				foreach($ar as $val) {
					if($val->str == $str) return $val->val++;
				}
				$val= new stdClass();				
				$val->str=$str;
				$val->val=1;
				$ar[]=$val;				
	}
	
	private function addStatistics($stat,$till){				
				$indb = $this->getStatsFromNumToNum($stat->stamp,$till)->fetchAll(PDO::FETCH_OBJ);				
				if(count($indb)===0) return $stat;
				echo count($indb);
				$categories= isset($stat->categories)?$stat->categories:array();
				$keywords = isset($stat->keywords)?$stat->keywords:array();
				$keyboard = isset($stat->keyboard)?$stat->keyboard:array();
				$destinations = isset($stat->destinations)?$stat->destinations:array();
				foreach($indb as $row){
						switch($row->type){
						case 'sr':
						if(isset($destinations[$row->val])) $destinations[$row->val]++;
						else $destinations[$row->val]=0;
						break;
						case 'kb':
						$this->addValue($keyboard,$row->val);
						break;
						case 'kw':
						$this->addValue($keywords ,$row->val);
						break;
						case 'cp':
						if(isset($categories[$row->val])) $categories[$row->val]++;
						else $categories[$row->val]=0;
						break;
						case 'cm':
						if(isset($categories[$row->val])) $categories[$row->val]--;
						else $categories[$row->val]=0;
						break;
						
						}				
				}
				$stat->destinations = $destinations;
				$stat->categories = $categories;
				$stat->keyboard = $keyboard;
				$stat->keywords = $keywords;
				$stat->stamp = $till;
				$this->pup=$stat;
				$this->savePublished();
				return $stat;				
				
	}
	function getStatsFromStrToStr($fromStr,$toStr){
		$fromN=strtotime($fromStr);//1437096651492;
		$toN=strtotime($toStr);
		return $this->getDB()->query("SELECT * FROM stats WHERE stamp BETWEEN $fromN AND $toN")->fetchAll(PDO::FETCH_NUM);
	}
	
	public function getStatsFromNumToNum($fromN,$toN){		
		return $this->getDB()->query("SELECT * FROM stats WHERE stamp BETWEEN $fromN AND $toN");
	}
	
	
	private function createData(){
			$data = new stdClass();
			$data->stamp = 0;
			//$data->searches=array();
			//$data->keywords=array();
			//$data->destinations=array();
			//$data->categories=array();
			return $data;
	}
	
	private function getPublished(){
			if(!$this->pub){					
				if(file_exists($this->filename))$this->pub = json_decode(file_get_contents($this->filename));
				else $this->pub = $this->createData(); 
			}
			return $this->pub;
	}
	
	private function savePublished(){
				return file_put_contents($this->filename,json_encode($this->pub));
	
	}
	

}
