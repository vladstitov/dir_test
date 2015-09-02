<?php
include_once('DbConnector.php');
include_once('cl/DbConnector.php');
class Destinations{
    //var  $db;
	var $con;
	//var $P='../data/details/p/p';
	var $root='../';
    function __construct(){
		$this->con= new DbConnector();
       // $this->db =$this->con->db;
    }


	
	public function process($a,$post,$get){		
		$out=new stdClass();
		
		switch(array_shift($a)){			
			case 'maintain':
					
			break;			
			case 'get_dests':						
			$out = $this->getAllDests();		
			break;
			case 'drop_table':
			if($get['table']=='tenants'){
					$res =$this->overwriteDestsinations(array());
					if($res){
							$out->success='success';
							$out->msg='table destinations empty';
					}else{
						$out->error='error';
						$out->result=$this->con->errorInfo();
					}			
				}			
			break;			
			case 'save_pages':
			$uid=$get['uid'];
			$data = file_get_contents("php://input");
			$res = file_put_contents('../data/pages/'.$uid.'.htm',$data);
			$out = new stdClass();
			if(!$res) {
			$out->error = 'error';
			$out->info==$this->con->errorInfo();

			}else {
			$out= new stdClass();
			$out->result = 'success';
			return $out;
			}
			break;

			case 'save':
				$dest = json_decode(file_get_contents("php://input"));
				return $this->updateDestination($dest);				
				break;
			case 'delete':
			$res=  $this->deleteDest((int)$get['destid']);

			if($res) $out->result='success';
			else  {
				$out->result='error';
				$out->reason=$this->con->errorInfo();
			}
			break;
			case 'saveCatDests':			
			 $out->result=$this->updateCatDests($post);
			 
			break;			
			
			case 'add':							
			 $out->result=$this->addDests(json_decode(file_get_contents("php://input")));			 
			break;
			
			case 'overwrite':
						
			 $out->result=$this->overwriteDests(json_decode(file_get_contents("php://input")));			 
			break;			
			
			case 'get_advanced':
			return $this->getAdvanced($get['destid']);
			break;
			case 'dest_image':
				if(isset($get['id'])){
						$id= $get['id'];
						return $this->saveDestinationImage($_FILES['file'],$id);
						
				}
				return 'error '.$get['id'];
			break;
			
		}
		//header('Content-type: application/json');
		if($out===false)$out=json_encode($this->con->errorInfo());
		return $out;	
	}
	
	
	private function saveDestinationImage($file,$id){
		$out=new stdClass();
			
		if ($file["error"] > 0){
			$out->error= $file["error"];
			return $out;
		}
		
		$ext = '.'.pathinfo($file["name"], PATHINFO_EXTENSION);
		$filename=$id.'_'.time().$ext;
		
		if(move_uploaded_file($file["tmp_name"],'../data/details/img/'.$filename)){
			$out->success='success';
			$out->result='data/details/img/'.$filename;
		}
		
		return $out;
		
	
	}
	
	
	private function getAdvanced($id){
		$page= $this->con->getField('SELECT advanced FROM destinations WHERE destid='.(int)$id);
		$fn=$this->root.$page;
		return file_exists($fn)?file_get_contents($fn):'no page';
	}
	
	private function updateCatDests($data){
		$this->con->beginTransaction('UPDATE destinations SET cats=? WHERE destid=?');		
		foreach($data as $key=>$value) $this->con->execute(array($value,$key));		
		return $this->con-> commit();		
	}/*
	private function updateDests($data){
		$this->con->beginTransaction('UPDATE destinations SET name=?,unit=?,cats=? WHERE destid=?');		
		foreach($data as $value) $this->con->execute(array($value['name'],$value['unit'],$value['cats'],$value['destid']));		
		return $this->con-> commit();
	}
	*/
	
	private function insertDestinationsArray($data){
		$this->con->beginTransaction('INSERT INTO destinations (uid,name,unit,cats,kws,meta,more,info,pgs) VALUES (?,?,?,?,?,?,?,?,?)');
		foreach($data as $value) $this->con->execute(array($value[0],$value[1],$value[2],$value[3],$value[4],$value[5],$value[6],$value[7].$value[8]));
		return $this->con-> commit();		
	}
	private function overwriteDestsinations($data){
		$this->con->queryPure("DROP TABLE destinations");
		$this->con->queryPure("CREATE TABLE destinations (id INTEGER PRIMARY KEY,uid TEXT,name TEXT,unit TEXT,cats TEXT,kws TEXT,more TEXT,tmb TEXT,meta TEXT,info TEXT,pgs TEXT,imgs TEXT,locations TEXT,labels TEXT)");
		return $this->insertDestinationsArray($data);
	}
	
	
	
	private function getAllDests(){		
		$result=$this->con ->getAllAsObj('SELECT * FROM destinations ORDER BY LOWER(name)');
		
		
			//foreach($result as $value) if($value->more)$value->more = json_decode($value->more);
		return $result; 			
	}
	
	private function deleteDest($id){

		return $this->con ->query('DELETE FROM destinations WHERE id='.(int)$id);
	}
	/*
	private function updateDest($id,$dest){
			$adv=$this->updateAdvanced($id,stripslashes($dest['advanced']));
		return $this->con->updateRow('UPDATE destinations SET name=?,unit=?,phone=?,email=?,website=?,cats=?,advanced=? WHERE destid=?',array($dest['name'],$dest['unit'],$dest['phone'],$dest['email'],$dest['website'],$dest['cats'],$adv,$id));
	}
*/
		private function updateDestination($dest){
				$out = new stdClass();
				$res=false;
				$cats='';
				$imgs='';
				if(isset($dest->cats))$cats = implode(',',$dest->cats);
				if(isset($dest->imgs))$imgs = implode(',',$dest->imgs);	
				
				$ar = array($dest->uid,$dest->name,$dest->unit,$cats,$dest->kws,$dest->more,$dest->tmb,$dest->info,$dest->meta,$dest->pgs,$imgs);
				$id=(int) $dest->id;
				if($id){				
					$res= $this->con->updateRow('UPDATE destinations SET uid=?,name=?,unit=?,cats=?,kws=?,more=?,tmb=?,info=?,meta=?,pgs=?,imgs=? WHERE id='.$id,$ar);
					if($res)$out->success='update';					
				}else {				
					$res = $this->con->insert('INSERT INTO destinations (uid,name,unit,cats,kws,more,tmb,info,meta,pgs,imgs) VALUES (?,?,?,?,?,?,?,?,?,?)',$ar);
					$out->success='insert';
				}
				
				if(!$res)$out->error = $this->con->errorInfo();
				else $out->result=$res;
				return $out;


		}

	private function updateAdvanced($id,$data){
		$id=(int)$id;
        $fn="data/details/a$id.htm";
		if(strlen($data)<20)$fn='';
        else   if(!file_put_contents($this->root.$fn,$data))$fn='';
        return 	$fn;
	}
	private function insertDest(){
		return $this->con->insert("INSERT INTO destinations (advanced) VALUES ('')");
				
	}
	
}
