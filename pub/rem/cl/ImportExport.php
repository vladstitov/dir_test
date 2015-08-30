<?php
include_once('DbConnector.php');
include_once('cl/DbConnector.php');
class ImportExport{	
	var $con;
	var $P='../data/details/p/p';
	var $A='../data/details/a/a';
    function __construct(){
		$this->con= new DbConnector();      
    }      
	function process($a,$data,$opt){
		$out=new stdClass();	
		switch(array_shift($a)){
			case 'export_CSV':	
					$res = $this->sendAsCSV();
					if($res) return '  ';
					else $out->error='error';
				return $out;
			break;	
			
				case 'parse_csv':			
				return  $this->importFromCSV($_FILES["file"]);			
			break;
			
			case 'get_all':				
				return $this->getAllDests();			
			break;
			
			case 'save_file':	
				$filename = '/bk/exp_'.date('m-d-y-H-i-s').'.txt';
				if(isset($opt['filename']))	{
				$filename = preg_replace(array('/\s/', '/\.[\.]+/', '/[^\w_\.\-]/'), array('_', '.', ''), $opt['filename']);
				}			
							
				if(file_put_contents('../data/bk/'.$filename,file_get_contents("php://input"))){
					
					$out->success='file saved';
					$out->result=$filename;
				
				}else $out->error='cant save file';

				return $out;
			break;
			
			case 'insert_destinations':				
				$data = json_decode(file_get_contents("php://input"));				
				if(isset($opt['overwrite'])) $out=$this->overwriteDestsinations($data);
				else $out=$this->insertDestinations($data);
				
				return $out;
			break;
			case 'insert_categories':				
				$data = json_decode(file_get_contents("php://input"));				
				if(isset($opt['overwrite'])) $out=$this->overwriteCategories($data);
				else $out=$this->insertCategories($data);
				
				return $out;
			break;
			
			
		}
	}
	
	
	
	
		private function insertCategories($data){
			$out= new stdClass();		
			$this->con->beginTransaction('INSERT INTO categories (label,icon,type,enable,sort) VALUES (?,?,?,?,?)');
			foreach($data as $v) $this->con->execute(array($v->label,$v->icon,$v->type,$v->enable,$v->sort));
			$res= $this->con-> commit();
			if($res) $out->success='success';
			else  $out->error=$this->con->errorInfo();
			return $out;		
		}
		private function overwriteCategories($data){
			$out= new stdClass();
			$this->con->queryPure("DROP TABLE categories");
			$res = $this->con->queryPure("CREATE TABLE categories (id INTEGER PRIMARY KEY,label TEXT,icon TEXT,type INTEGER,enable INTEGER,sort INTEGER)");
			
			if($res)return $this->insertCategories($data);
			else  $out->error=$this->con->errorInfo();
			return $out;
		}	
		
		private  function toArray($data){
				$out=[];
				foreach($data as $v)if(isset($v->name)) $out[]=array( 
				(isset($v->uid)?$v->uid:''),
				$v->name,
				(isset($v->unit)?$v->unit:''),
				(isset($v->cats)?$v->cats:''),
				(isset($v->kws)?$v->kws:''),
				(isset($v->meta)?$v->meta:''),
				(isset($v->more)?$v->more:''),
				(isset($v->info)?$v->info:''),
				(isset($v->pgs)?$v->pgs:'')
				);
				return $out;
		}
		private function insertDestinations($data){
			$data = $this->toArray($data);
			$out= new stdClass();
			$this->con->beginTransaction('INSERT INTO destinations (uid,name,unit,cats,kws,meta,more,info,pgs) VALUES (?,?,?,?,?,?,?,?,?)');
			//foreach($data as $v)$this->con->execute(array($v->uid,$v->name,$v->unit,$v->cats,$v->kws,$v->meta,$v->more,$v->info,$v->pgs));
			foreach($data as $v)$this->con->execute($v);
			$res= $this->con-> commit();
			if($res){
				$out->success='success';
				$out->msg='inserted '.count($data);
			}
			else  $out->error=$this->con->errorInfo();
			return $out;
		}
		private function overwriteDestsinations($data){
			$this->con->queryPure("DROP TABLE destinations");
			$res = $this->con->queryPure("CREATE TABLE destinations (id INTEGER PRIMARY KEY,uid TEXT,name TEXT,unit TEXT,cats TEXT,kws TEXT,more TEXT,meta TEXT,info TEXT,pgs TEXT,imgs TEXT,locations TEXT,labels TEXT)");
			$out = new stdClass();
			if($res) return $this->insertDestinations($data);
			else  $out->error=$this->con->errorInfo();
			return $out;
			
		}	
		
	
	
		private  function convertCSV($ar){
				$out ='';
				foreach($ar as $v){				
				$out.='"'.implode('","',$v).'"'."\r\n";		
				}
				return $out;		
		}
		private  function convertTAB($ar){
				$out ='';
				foreach($ar as $key=>$v){
				$out.=implode("\t",$v)."\r\n";
				}
				return $out;	
		
		}
		
		
		private function getAllDests(){	
			$er=new stdClass();	
		//$ar=array( 'destid','name','unit','cats');
		$r=$this->con->queryPure('SELECT id,label FROM categories');
		if(!$r) return $er->error=$this->con->errorInfo();
		$cats=array();
		while($v=$r->fetch(PDO::FETCH_NUM))$cats[(int)$v[0]]=$v[1];
		
		$r=$this->con ->queryPure('SELECT * FROM destinations ORDER BY LOWER(name)');
		$out =array();
		$i=1;
		
		while($v=$r->fetch(PDO::FETCH_OBJ)){
					$cs =  explode(',',$v->cats);					
					$ar=array();
					foreach($cs as $c) if(isset($cats[$c])) $ar[] = $cats[$c];
					$v->cats=implode(',',$ar);					
					$out[]=$v;
		};
		return $out; 			
	}
	
	
	private function importFromCSV($file){
		if ($file["error"] > 0)return  $file["error"]; 
		$ar=array();
		if (($handle = fopen($file["tmp_name"], "r")) !== FALSE) {
			while (($data = fgetcsv($handle)) !== FALSE){
				$ar[]=$data;
			}
		}
		return $ar;
	}
	
	
	private function sendAsCSV(){	
			header( 'Content-Type: text/csv' );
            header( 'Content-Disposition: attachment;filename=directories.csv');
            $fp = fopen('php://output', 'w');   
			$ar = $this->getAllDests();	
			$out=0;
			if($ar){
				fputcsv($fp, array('UID','Name','Unit','Info','Categories','Keywords','Table','Pages','Meta'));	        
				foreach($ar as $v) fputcsv($fp, array($v->uid,$v->name,$v->unit,$v->info,$v->cats,$v->kws,$v->more,$v->pgs,$v->meta));
				$out=1;
			}			
			fclose($fp);		
       
		return $out;
    }
	
	
}