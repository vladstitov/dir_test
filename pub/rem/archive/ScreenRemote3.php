<?php
include 'MyDatabase.php';
class ScreenRemote3 {
	private $dba;
	private $dbid='';
	public function __construct() {
			
	}
	public function __get($db){
		if(!$this->dba){
			$this->dba=new MyDatabase();
			$this->dba-> load('../../data/directories.db');
		}
		return $this->dba;
	}
	
	public function getAdditional($vars){
		$res=0;
		if(isset($vars['page']) && file_exists('../../data/additional/'.$vars['page']))$res=file_get_contents('../../data/additional/'.$vars['page']);
			
		
		return $res;
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
	public function getAllTenants($screenId){
		$result=$this->db->query("SELECT id,name,unit  FROM tenant ORDER BY name");
		//$n=$this->db->num_rows($result);
		return $this->db-> fetchAllAsSoc($result);		
	}
	
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

	public function SearchResult($obj){
		$res=array();
		if(isset($obj['word'])) $res = $this->searchList($obj);
		else  if(isset($obj['category'])) $res=$this->getListByCategory($obj);
		else $res= $this->getAll($obj);
		
		return $res;
	}
	
	private function searchList($obj){
		
		switch($obj['table']){
			case "tenant":
			return $this->getTenants($obj['word'],0,6,$obj['screenid']);
			break;
			case "people":
			return $this->getPeople($obj['word'],$obj['page'],$obj['limit'],$obj['screenid']);
			break;
		}
	}
	
	private  function getAll($obj){
		$out = array();
		$sql=0;
		switch($obj['table']){
			case "people":
			$sql="SELECT id, name,unit FROM people";
			break;
			case "tenant":
			$sql="SELECT id, name,unit FROM tenant";
			break;
			case "category":
			$sql="SELECT * FROM category WHERE visible=1";
			break;
		}
		
		if($sql){
			$result=$this->db->query($sql);
			 return $this->db-> fetchAllAsSoc($result);
		}
			
			return $obj;
	}
	private function getTenants($keyword,$page,$limit,$screenid){
		
	$out= array();
	$sql="SELECT COUNT (*) FROM word_tenant WHERE lower(value) = lower('".$keyword."') AND visible=0 ";
	$n = $this->db->count($sql);
	$word_id=0;
	
		if($n>0){
			$sql="SELECT word_id FROM word_tenant WHERE lower(value) = lower('".$keyword."') AND visible=0 ORDER BY sort DESC";
			$result=$this->db->query($sql);
			$row=$this->db->fetch_row($result);
			//return $row;
		$sql="SELECT distinct tenant.id, tenant.name, tenant.unit FROM tenant INNER JOIN words_tenant ON(words_tenant.data_id = tenant.id) 
			WHERE (words_tenant.word_id = ".$row[0];
			
				
		while($row=$this->db->fetch_row($result)){				
				$sql .=" OR words_tenant.word_id=".$row[0];
			}
		
			$sql.="  )OR tenant.name LIKE '".$keyword."%'  OR tenant.name LIKE '% ".$keyword."%'  ORDER BY tenant.name ASC";
			
			//return $sql;
			$result=$this->db->query($sql);
			//return $this->db->error();
			return $this->db-> fetchAllAsSoc($result);
		}else{
			$sql="SELECT tenant.id,tenant.name,tenant.unit FROM tenant WHERE tenant.name  LIKE '".$keyword."%' OR tenant.name LIKE '% ".$keyword."%'  ORDER BY tenant.name ASC";
			
			$result= $this->db->insert_update($sql) or die( $this->db->error());
			return $this->db-> fetchAllAsSoc($result);
		}
	}
	
	private function getPeople($keyword,$page,$limit,$screenid){
		
	$out= array();
	$sql="SELECT COUNT (*) FROM word_people WHERE lower(value) =lower('".$keyword."') AND visible=0 ORDER BY sort DESC";
	
	$n = $this->db->count($sql);
	
	$word_id=0;
		if($n>0){
			$sql="SELECT word_id FROM word_people WHERE lower(value) =lower('".$keyword."') AND visible=0 ORDER BY sort DESC";
			$result=$this->db->query($sql);
			$row=$this->db->fetch_row($result);
			//return $row;
		$sql="SELECT distinct  people.id, people.name, people.unit FROM people INNER JOIN words_people ON(words_people.data_id = people.id)	WHERE (words_people.word_id = ".$row[0];
			
				
		while($row=$this->db->fetch_row($result)){
				
				$sql .=" OR words_people.word_id=".$row[0];
			}
		
			$sql.="  )OR people.name  LIKE '".$keyword."%' OR people.name LIKE '% ".$keyword."%'  ORDER BY people.name ASC";
			
			//return $sql;
			$result=$this->db->query($sql);
			//return $this->db->error();
			return $this->db-> fetchAllAsSoc($result);
		}else{
			$sql="SELECT people.id,people.name,people.unit FROM people WHERE people.name  LIKE '".$keyword."%' OR people.name LIKE '% ".$keyword."%'  ORDER BY people.name ASC";
			
			$result= $this->db->query($sql);// or die( $this->db->error());
			return $this->db-> fetchAllAsSoc($result);
		}
	}
	
	
	public function getDetails($tenId,$table, $screenID = 1){
		$sql="SELECT * FROM $table WHERE id=".(int)$tenId;
		$result=$this->db->query($sql) ;// or die ($this->db->error());
		$row=$this->db-> fetch_assoc($result);
		$htmltext='<span color="#FFFFFF">Unit: </span><span  color="#00FF00">'.$row['unit'].'</span>';
		$row['table']=$table;
		if($row['phone']!="") $htmltext.='<span color="#FFFFFF">Phone: </span><span  color="#00FF00">'.$row['phone'].'</span>';
		if($row['details']!="") $htmltext.='<p  color="#00FF00">'.$row['details'].'</p>';
		$row['htmltext']=$htmltext;
		//$row['mapimage'] = IMAGES."/MAP_" . $screenID . "_" . trim($row['unit']) . ".png";
		return $row;
	}
	
	
}

?>