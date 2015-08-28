<?php
include 'MyDatabase.php';
class ScreenRemote2 {
	private $dba;
	private $dbid='';
	private $id='';
	private $sett;
	
	
	public function getDb(){
		if(!$this->dba){
			$this->dba=new MyDatabase();
			$this->dba-> load('../../data/directories'.$dbid.'.db');
		}
		return $this->dba;
	}
	
	
	
	public function getSettings($screenId,$stamp=123456){
		$link='../../data/d' . $screenId. '.json';
		$lastmod= filemtime($link);
		
		if($stamp==$lastmod) return 0;
		$settings =json_decode(file_get_contents($link));
		$settings->lastmod=$lastmod;
		//$settings->screenid= $screenId;
		return $settings;
	}
	private function settings($screenid){
		if(!$this->sett) $this->sett =json_decode(file_get_contents('../../data/settings' . $screenid. '.json')); 
		return $this->sett;
	}
	public function getCategories($screenid){
		//$cat= $this->settings($screenid)->categories;
		//if($cat->show){
			$sql="SELECT * FROM word_tenant WHERE  visible=1 ORDER BY sort DESC";
			
	 		$result=$this->getDb()->query($sql);
			if($result) return $this->getDb()-> fetchAllAsSoc($result);
			return $this->getDb()->error();
			
			return $this->getDb()-> fetchAllAsSoc($result);
		//} 
		
		
		//$data=$this->db-> fetchAllAsSoc($result);
		
		//return $cat;
	}
	
	public function getDetails($obj){
		$sql=0;
		
		$table=$obj['table'];
		switch($table){
			case 'people':
			$sql="SELECT * FROM people WHERE id=".(int)$obj['id'];
			break;
			case 'tenant':
			$sql="SELECT * FROM tenant WHERE id=".(int)$obj['id'];
			break;
		}
		
		if($sql){
			$result=$this->getDb()->query($sql) ;// or die ($this->db->error());
			$row=$this->getDb()-> fetch_assoc($result);
			$row['table']=$table;
			return $row;
		}else return "ERROR";
		
		//$row['mapimage'] = IMAGES."/MAP_" . $screenID . "_" . trim($row['unit']) . ".png";
		
	}
	public function getAdditional($obj){
		
		 
		if(isset($obj['page']))	$url='../../data/additional/page'.$obj['page'].'.xml';
		
				
		
		if($url && file_exists($url)) return file_get_contents($url);
		else return "ERROR getAdditional ";
	}
	
	public function getLayout($obj){
		$url=0;
		switch($obj['id']){
			case 'mainmenu':
			$url='../../data/mainmenu.xml';
			break;
		}
		if($url) return file_get_contents($url);
		else return "ERROR";
	}
	public function getAllAdditionals($screenid){
			
			return  $this->settings($screenid)->additional;// array("amenities","leasing");
			
	}
	public function getAdditionalPage($data){
		
		$file='../../data/additional/p'.$data['file'].'.xml';
			if(file_exists($file)) return file_get_contents($file);
			else return "File not exists ".$file;
			
	}
	
	
	
		public function getProfile($id){
			$xml=simplexml_load_file("../../screen$id.xml");
								
			return $xml;
		
		}
		
		
		
		public function getPage($page,$vars=null){
			return file_get_contents('../../data/pages/'.$page.'xml');
		}
		
	
}

?>