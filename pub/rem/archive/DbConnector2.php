<?php
class DbConnector{
    var  $db;
    function __construct(){
        $this->db = new PDO('sqlite:../data/directoriesMFS.db');
    }
    
    public function getMenu(){
        $sql='SELECT * FROM menu';
        $res=$this->db ->query($sql);
        $out= new stdClass();
        $out->sql=$sql;
        return  $res->fetchAll(PDO::FETCH_OBJ);    
        
    }
	
	public function getAllData(){
		$data=array();		 
		 $res1=$this->db->query('SELECT * FROM tenant ORDER BY name')->fetchAll(PDO::FETCH_CLASS, 'VOTenant');
		  $res2=$this->db->query('SELECT * FROM people ORDER BY name')->fetchAll(PDO::FETCH_CLASS, 'VOPeople');		 
		return array_merge($res1,$res2);
		  
	}
	public function getDestInfo($destid){					
			$sql='SELECT info FROM destinations WHERE destid='.(int)$destid;
			$res=$this->db->query($sql);						 
			return $res->fetchColumn();		
	}
	public function process($a,$data,$opt){		
		$out=new stdClass();
		
		switch(array_shift($a)){			
			case 'maintain':			
		
			break;
			case 'get_pages':
			$sql='SELECT * FROM pages';
			$res=$this->db ->query($sql);			
			return $res->fetchAll(PDO::FETCH_OBJ);   			
			break;
			case 'get_page':
			$sql='SELECT info FROM pages WHERE id='.(int)$opt['pageid'];
			$res=$this->db->query($sql);						 
			return $res->fetchColumn();					
			break;
			case 'save_pages':
			$out->result=$this->savePages($data);							
			break;
			case 'create_page':
			$out->result=$this->createPage();					
			break;
			case 'delete_page':
			$out->result=$this->deletePage($data);					
			break;
			case 'save_page':
			$out->result=$this->savePage($data);					
			break;
			case 'update_page':
			$out->result=$this->updatePage($data);					
			break;			
			
			case 'get_all':
				return $this->getDests();			
			break;
			case 'saveDest':
			if($data['destid']!=0)	return $this->updateDest($data);
			else return $this->insertDest($data);
			break;
			case 'delDest':
			$out->result = $this->deleteDest($data);
			return $out;
			break;
			case 'saveCatDests':			
			 $out->result=$this->updateCatDests($data);
			 return $out;
			break;
			case 'tenants':
			 $sql='SELECT destid,type,name,unit FROM destinations WHERE type=1 ORDER BY name';
			  $res=$this->db ->query($sql);
			  $out->type='tenant';
			  $out->result='success';	
			  $out->data= $res->fetchAll(PDO::FETCH_OBJ);    
			break;
			case 'peoples':
			$sql='SELECT destid,type,name,unit FROM destinations WHERE type=2 ORDER BY name';
			$res=$this->db ->query($sql);
			$out->type='people';
			$out->result='success';			 
			$out->data=$res->fetchAll(PDO::FETCH_OBJ);
				   
			break;		
			
		}
		return $out;
	}
	private function deletePage($data){
		$sql="DELETE FROM pages WHERE id=".(int)$data['id'];
		return $this->db->query($sql);		
	}
	private function createPage(){
		$sql="INSERT INTO pages (label,enable,sort,info) VALUES ('New Page',1,1000,'')";
		if($this->db ->query($sql))	 return $this->db->lastInsertId();
		else return $this->db->errorInfo();		
	}
	
	private function savePageInfo($data){
		$sql="UPDATE pages SET info=? WHERE id=?";
		$stmt=$this->db->prepare($sql);	
		return $stmt->execute(array($data['id'],$data['info']));		
	}
	private function savePages($data){
		$this->db->beginTransaction();
		$sql="UPDATE pages SET label=?,enable=?,sort=? WHERE id=?";
		$stmt=$this->db->prepare($sql);				
		foreach($data as $value) $stmt->execute(array($value['label'],$value['enable'],$value['sort'],$value['id']));	
		if($this->db-> commit()) return 'success';		
		return $this->db->errorInfo();
	}
	
	
	
	private function updateCatDests($data){
		$this->db->beginTransaction();
		$sql="UPDATE destinations SET cats=? WHERE destid=?";
		$stmt=$this->db->prepare($sql);
		foreach($data as $key=>$value) $stmt->execute(array($value,$key));
		
		if($this->db-> commit()) return 'success';		
		return $this->db->errorInfo();
	}
	////////////Destinations/////////////
	
	
	private function getDests(){		
			return $this->db ->query('SELECT destid,name,unit,contact,cats FROM destinations ORDER BY name')->fetchAll(PDO::FETCH_OBJ);			
	}
	private function deleteDest($dest){
		return $this->db ->query('DELETE FROM destinations WHERE destid='.(int)$dest['destid']);		
	}
	private function updateDest($dest){
		$out=new stdClass();
		if(isset($dest['info']) && $dest['info']){ 
		
			$sql='UPDATE destinations SET name=?,unit=?,contact=?,info=?,cats=? WHERE destid='.(int)$dest['destid'];
			$q = $this->db->prepare($sql);
			$res=$q->execute(array($dest['name'],$dest['unit'],$dest['contact'],$dest['info'],$dest['cats']));
			$out->result=$res;
			$out->destid=$dest['destid'];
			$out->info='saved with info';
		}else{               
			$sql='UPDATE destinations SET name=?,unit=?,contact=?,cats=? WHERE destid='.(int)$dest['destid'];
			$q = $this->db->prepare($sql);
			$out->result=$q->execute(array($dest['name'],$dest['unit'],$dest['contact'],$dest['cats']));
			$out->info='saved without info';
			$out->destid=$dest['destid'];
		}
		
		
		return $out;
	}
	
	private function insertDest($dest){
		$sql="INSERT INTO destinations (name,unit,contact,cats,info) VALUES (?,?,?,?,?)";
		$q = $this->db->prepare($sql);
		$res=$q->execute(array($dest['name'],$dest['unit'],$dest['contact'],$dest['cats'],$dest['info']));
		$out=new stdClass();
		$out->result=$res;
		$out->info='inserted ';
		$out->destid=$this->db->lastInsertId();
		return $out;
	}
	/////////////////////////////////////////////
	/*
	private function deleteDestinantionInCats($data){
		$destid=$data['destid'].',';
		$sql="SELECT * FROM categories WHERE dest LIKE '%$destid%'";
		$res= $this->db ->query($sql);
		while($row=$this->db->fetch_assoc($res)){
			str_replace($destid,'',$row['dests']);
			$this->db ->query("UPDATE categories SET dests='".$row['dests']."' WHERE catid=".$row['catid']);
		}
	}
	private function updateDestsInCatategory($data){
		$out= new stdClass();		
		$sql="UPDATE categories SET dests='".$data['dests']."' WHERE catid=".(int)$data['catid'];
		return $this->db ->query($sql);		
	}
	*/
	
}

class VOTenant{
	var $t='t';		
}
class VOPeople{
	var $t='p';	
}