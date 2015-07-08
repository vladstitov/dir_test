<?php
require "MyDatabase.php";
class KeywordsManager {
private $dba;
private $dbid='';
	public function __get($db){
		if(!$this->dba){
			$this->dba=new MyDatabase();
			$this->dba-> load('../../data/directories'.$dbid.'.db');
		}
		return $this->dba;
	}
		//insert a keyword
		private function table($table){
			return ($table=='people')?'word_people':'word_tenant';
		}
		
	private  function insertKeyword($word,$visible,$table){
		$sql="SELECT  COUNT(*) FROM $table WHERE value='$word' AND visible=".$visible;
		//return $sql;
		$result=$this->db->query($sql) ; //or die ($this->db->error());
	
		if($this->db->total()==0){
			$sql="INSERT INTO $table (value,sort,visible) VALUES ('".$word."',1,$visible)";
				$result = $this->db->query($sql) ; //or die( $this->db->error());
				return $result?$this->getKeywords($visible,$table):array("error"=>$this->db->error());
		} else return array("error"=>"Word ".$word." already exists in ".$table);
	
	}
	
	public function getKeywords($visible,$table){
		
		$table=$this->table($table);
		$sql="SELECT *  FROM $table WHERE  visible=$visible ORDER BY sort DESC";
		//else $sql="SELECT *  FROM keywords WHERE screen_id=1 AND visible=0 ORDER BY word_name";
		$result=$this->db->query($sql) ; //or die ( $this->db->error());
		return $result?$result:$this->db->error();//
	}
	
	function updateKeyword($id,$word,$visible,$table){
		
	$table=$this->table($table);
	if($id==0) return $this->insertKeyword($word,$visible,$table);
	
		$result = $this->db->query("UPDATE $table SET value='$word' WHERE word_id=$id") ; //or die( $this->db->
		return $result?$this->getKeywords($visible,$table):array("error"=>$this->db->error());
	}
	//deletes a keyword 
	function deleteKeyword($id,$table){
		$wtable=$this->table($table);
		$sql="DELETE FROM $wtable WHERE word_id=$id";
		$result=$this->db-> query($sql) ; //or die ($this->db->error());
		$sql="DELETE FROM  words_$table WHERE word_id=$id";
		$result=$this->db-> query($sql) ; //or die ( $this->db->error());
		return $result;
	}
	

	public function updateKeywordsSortOrder($ar,$table){
		$table=$this->table($table);
		$n=count($ar);
		$sql='';
		$this->db->query("BEGIN TRANSACTION");
		for($i=0;$i<$n;$i++){
			$sql="UPDATE  $table SET sort=".($i+1)." WHERE word_id=".$ar[$i];
			$result=$this->db->query($sql);
		}
		$this->db->query("COMMIT");
		
		return $result;
	}
///
	public function getDataByKewordId($kwid,$table){
		if($table!='people') return $this->getTenantsByKeywordId($kwid);
		else return $this->getPeopleByKeywordId($kwid);
		
	}
	private function getTenantsByKeywordId($keywordId){
		$id=(int)$keywordId;
		//$sql="SELECT tenant.tenantid, tenant.name, tenant.unit words_tenant.sort FROM tenant LEFT JOIN words_tenant ON ( tenant.tenantid=words_tenant.tenant_id) WHERE words_tenant.word_id=".$keywordId." ORDER BY words_tenant.sort DESC";
		$sql="SELECT tenant.id,tenant.name,tenant.unit,words_tenant.sort FROM tenant,words_tenant WHERE  tenant.id=words_tenant.data_id  AND words_tenant.word_id=".$id." ORDER BY words_tenant.sort DESC";	
		
		$result= $this->db->query($sql); //or die( $this->db->error());
		return $result?$this->db-> fetchAllAsSoc($result):$this->db->error();
	}
	private function getPeopleByKeywordId($keywordId){
		$id=(int)$keywordId;
		//$sql="SELECT tenant.tenantid, tenant.name, tenant.unit words_tenant.sort FROM tenant LEFT JOIN words_tenant ON ( tenant.tenantid=words_tenant.tenant_id) WHERE words_tenant.word_id=".$keywordId." ORDER BY words_tenant.sort DESC";
		$sql="SELECT people.id,people.name,people.unit,words_people.sort FROM people,words_people WHERE  people.id=words_people.data_id  AND words_people.word_id=".$id." ORDER BY words_people.sort DESC";	
		
		$result= $this->db->query($sql); //or die( $this->db->error());
		return $result?$this->db-> fetchAllAsSoc($result):$this->db->error();
	}
	//tenants.tenant_unit,
	
	function updateIdisToKeyword($keywordid,$arids,$table){
		$sql="DELETE FROM words_$table WHERE word_id=".$keywordid;
		$result = $this->db->query($sql) ; //or die( $this->db->error());
		$n=count($arids);
		$this->db->query("BEGIN TRANSACTION");
		for($i=0;$i<$n;$i++){
			$sql="INSERT INTO words_$table (word_id,data_id,sort) VALUES (".$keywordid.",".$arids[$i].",".($i+1).")";
			$result = $this->db->query($sql) ; //or die( $this->db->error());
		}
		$this->db-> query("COMMIT");;
		return $n;
	}
	/*
	function updateKeywordsToTenant($tenant,$keywords,$screenId){
		$sql="DELETE FROM words_tenant WHERE tenant_id=".$tenant;
		$result = $this->db-> insert_update($sql) ; //or die( $this->db->error());
		$n=count($keywords);
		$this->db-> insert_update("BEGIN TRANSACTION");;
		for($i=0;$i<$n;$i++){
		$sql="INSERT INTO words_tenant (word_id,tenant_id,sort) VALUES (".$keywords[$i].",".$tenant.",".($i+1).")";
		$result = $this->db-> insert_update($sql) ; //or die( $this->db->error());
	}
	$this->db-> insert_update("COMMIT");;
		return $n;
	}
	
	public function getKeywordsByTenantId($id,$screenId){
		$words_tenants="words_tenant";
		$tenants="tenants";
		$keywords="keywords";
		
		$sql="SELECT ".$keywords.".word_id,".$keywords.".word_name FROM ".$keywords." LEFT JOIN ".$words_tenants." ON ( keywords_".$addressId.".word_id=words_tenant_".$addressId.".word_id) WHERE words_tenant_".$addressId.".tenant_id=".$id." ORDER BY words_tenant_".$addressId.".sort DESC";
		$result= $this->db->query($sql); //or die( $this->db->error());
		return $result;
		
	}
	*/
	public function beforeFilter($function_called){
		return true;
		if(Authenticate::isUserInRole('admin'))	return true;
		else return false;
	}	   
}
?>