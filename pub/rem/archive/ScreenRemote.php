<?php
include 'MyDatabase.php';
class ScreenRemote {
	private $dba;
	private $dbid='';
	
	public function __get($db){
		if(!$this->dba){
			$this->dba=new MyDatabase();
			$this->dba-> load('../../data//directories.db');
		}
		return $this->dba;
	}
	
	public function getSettings($screenId,$stamp=123456){
		$link='../../data/settings' . $screenId. '.json';
		$lastmod= getlastmod($link);
		if($stamp==$lastmod) return json_decode('{"lastmod":0}');
		$settings =json_decode(file_get_contents($link));
		$settings->lastmod=$lastmod;
		return $settings;
	}
	//get list of attract loops by screen id
	public function getLoops($screenId=1){
		$settings=$this->getSettings($screenId);
		return isset($settings->loops)?$settings->loops:"/templats/AL_".$settings->resolution.".swf";	
		}	
		
	public function getCategories($table='tenant',$screenid=1){
		
		$sql="SELECT * FROM word_$table WHERE  visible=1 ORDER BY sort DESC";
	 	$result=$this->db->query($sql) ;// or die ($this->db->error());
		return $this->db-> fetchAllAsSoc($result);
	}
		
	//gets list of tenants by keyword/category selection
	private function getTenantsByKeywordId($keywordId,$screenId=1){
		$id=(int)$keywordId;
		//$sql="SELECT tenant.tenantid, tenant.name, tenant.unit words_tenant.sort FROM tenant LEFT JOIN words_tenant ON ( tenant.tenantid=words_tenant.tenant_id) WHERE words_tenant.word_id=".$keywordId." ORDER BY words_tenant.sort DESC";
		$sql="SELECT tenant.id,tenant.name,tenant.unit,words_tenant.sort FROM tenant,words_tenant WHERE  tenant.id=words_tenant.data_id  AND words_tenant.word_id=".$id." ORDER BY words_tenant.sort DESC";	
		$result= $this->db->insert_update($sql);// or die( $this->db->error());
		return $result?$this->db-> fetchAllAsSoc($result):$this->db->error();//;
	}
	//get list of all tenants
	//public function getAllTenants($screenId){
		
		
		//$result=$this->db->query($sql);
		//$n=$this->db->num_rows($result);
		//return $this->db-> fetchAllAsSoc($result);
		
	//}
	
	//get tenants by user entered input
	/*
	private function getTenantsByWord($word){
		$sql="SELECT word_id FROM word_tenant WHERE value ='".$word."' AND visible=0 ORDER BY sort DESC";
			$result=$this->db->query($sql);
			
			$row=$this->db->fetch_row($result);
			if($row){
				$result= $this->db->query("SELECT * FROM words_tenant WHERE word_id=".$row[0]);
				
				return $this->db-> fetchAllAsSoc($result);
			}
			return array();
			
			
	}
	private function getPeopleByWord($word){
		
	}

	public function getTenants($word,$page,$limit,$screenid){
		
		//return $this->getTenantsByWord($word);
		
		if($word=="") $sql="SELECT * FROM tenant ORDER BY name";
		else $sql="SELECT * FROM tenant  WHERE tenant.name  LIKE '".$word."%' OR tenant.name LIKE '% ".$word."%'  ORDER BY tenant.name ASC";
		$result= $this->db->insert_update($sql);// or die( $this->db->error());
		
		return $this->db-> fetchAllAsSoc($result);
	}
	public function getPeople($word,$page,$limit,$screenid){
		
		if($word=="")$sql="SELECT * FROM people ORDER BY name";
		else $sql="SELECT people.id,people.name,people.unit FROM people WHERE people.name  LIKE '".$word."%' OR people.name LIKE '% ".$word."%'  ORDER BY people.name ASC";
		
		$result=$this->db-> insert_update($sql);
		return $this->db-> fetchAllAsSoc($result);
		
	}
	
*/

	private function getListByCategory($obj){
		return $this->getTenantsByKeywordId($obj['category']);
	}

	
	
	public function getDetails($tenId,$table, $screenID = 1){
		$sql="SELECT * FROM $table WHERE id=".(int)$tenId;
		$result=$this->db->query($sql) ;// or die ($this->db->error());
		$row=$this->db-> fetch_assoc($result);
		//$row['mapimage'] = IMAGES."/MAP_" . $screenID . "_" . trim($row['unit']) . ".png";
		return $row;
	}
	
	/*
	public function getTenantDetails($tenId, $screenID = 1) {
		//$settings = $this->getSettings($screenID);

		//if (!$settings->showDetails) return 0;
		$sql="SELECT * FROM tenant WHERE id=".$tenId;
		$result=$this->db->query($sql) ;// or die ($this->db->error());
		$row=$this->db-> fetch_assoc($result);

		//$row['mapimage'] = IMAGES."/MAP_" . $screenID . "_" . trim($row['unit']) . ".png";


		return $row;
	}
	*/
	//get all records from additional content

	
	
	
	
	

	
}

?>