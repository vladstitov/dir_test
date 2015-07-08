<?php
require "MyDatabase.php";
class TenantDetails {
	private $dba;
	private $screenid;
	public function __get($db){
		if(!$this->dba){
			$this->dba=new MyDatabase();
			$this->dba-> load('../../data/directories.db');
		}
		return $this->dba;
	}
	
	private function removeTable($table){
		$this->db->query("DROP TABLE $table");
$this->db->query("CREATE TABLE $table (id INTEGER PRIMARY KEY AUTOINCREMENT,name TEXT,unit TEXT,phone TEXT,email TEXT,website TEXT,text1 TEXT,text2 TEXT,image1 TEXT,image2 TEXT)");
	}
	//upload (tenant_name, tenant_unit) delimited csv file
	public function uploadCSV($data,$option){
		$table=$option['table'];
		if($option['operation']=="over") $this->removeTable($table);
		
		 $this->db->begin();
		 $n=count($data);
		 $sql="INSERT INTO $table (name,unit,phone,email,website,text1,text2,image1,image2) VALUES(?,?,?,?,?,?,?,?,?)";
			
		$this->db->prepare($sql);
		for($i =0; $i <$n; $i++){ $this->db->execute(array($data[$i]['name'],$data[$i]['unit'],$data[$i]['phone'],$data[$i]['email'],$data[$i]['website'],$data[$i]['hours'],$data[$i]['desc'],$data[$i]['image'],$data[$i]['image2']));
		}
		$this->db->commit();
	
		return $this->db-> error();
	}
	
	public function searchTenant($word,$table){
		//if(strlen($word)<3) $word=" ".$word."%";
		//else $word="%".$word."%";
		//$word2=$word."%";
		$result=$this->db->query("SELECT * FROM $table WHERE name LIKE '".$word."%' OR unit LIKE '".$word."%' OR name LIKE '% ".$word."%' OR unit LIKE '% ".$word."%'");
		//$result=$this->db->query("SELECT * FROM tenant WHERE name LIKE '$word' OR unit LIKE '$word' OR name LIKE '$word2' ");
		return $this->db-> fetchAllAsSoc($result);
	}
	public function getAllTenants($table){
		$result=$this->db->query("SELECT * FROM $table ORDER BY name");
		return $this->db-> fetchAllAsSoc($result);
	}
	/*
	public function getTenantsByBuildingId($buldingId){
		$sql="SELECT tenant_name,tenant_unit, FROM  tenant_details	".
		//" tenants.building_id=".$buldingId." AND".
		//"WHERE tenants.tenant_id = tenant_details.tenant_id
		" ORDER BY tenant_details.tenant_name";
		$result=$this->db->query($sql) ;// or die ($this->db->error());
		return $result;
	}
	*/
	//get list of tenants by tenant Id
	/*
	public function getTenantDetailsById($tenId){
		$sql="SELECT * FROM tenant_details WHERE tenant_id=".$tenId;
		$result=$this->db->query($sql) ;// or die ($this->db->error());
		return $result;
	}
	
	//inserts a new tenant
	*/
	
	public function insertTenant($buildingId, $tenantName){
	/*
		$sql="SELECT * FROM tenant_details WHERE tenant_name='$tenantName'";
		$result=$this->db->query($sql) ;// or die ($this->db->error());
		if($this->db->num_rows($result)==0)
		{
		*/
			$sql="INSERT INTO tenant_details (tenant_name) VALUES ('".$tenantName."')";//,'".(int)$buildingId."')";
			$result=$this->db->query($sql) ;// or die ('I cannot connect to the database because: '.$this->db->error());
			$id=$this->db->insert_id();
			return $id;
			/*
		}
		else return $this->db->result($result,0);
		*/
	}
		/*
	public function updateTenant($tenId,$tenName){
		$sql= sprintf("UPDATE tenant_details SET tenant_name='%s' WHERE tenant_id=".(int)$tenId, $tenName);
		$result=$this->db->query($sql) ;// or die ($this->db->error());
		return $result;
	}

	//save new tenant unit Details for existing tenant
	public function saveTenantUnitDetails($tenantId, $details){
		
		$sql="SELECT COUNT(tenant_unit) as t_count FROM tenant_details WHERE tenant_id='".$tenantId."' AND tenant_unit = '".$details['unit']."'";
		$result=$this->db->query($sql) ;// or die (mysql_error());
		$count = 0;
		while($row = $this->db->fetch_array($result))
		{
			$count = $row['t_count']; // count of the tenant units
		}
		if($count == 0)
		{
			$sql="INSERT INTO tenant_details (tenant_id,tenant_unit,phone,email,website,hours,description,image,image2) VALUES ('".$tenantId."', '".$details['unit']."', '".$details['phone']."', '".$details['email']."', '".$details['website']."', '".$details['hours']."', '".$details['description']."', '".$details['image']."', '".$details['image2']."')";
			$result=$this->db->query($sql) ;// or die ($this->db->error());
			return $details;
		}
		else
		{
			return 0; 
		}
	}
	
	*/
	public function updateTenantDetails($details,$table){		
		//Added to find the old value and new value
		$id=(int)$details['id'];
		$ar=array($details['name'], $details['unit'], $details['phone'], $details['email'], $details['website'], $details['text1'], $details['text2'], $details['image1'], $details['image2']);
		//$ar=array('name','unit','phone','email','website','text1','text2','image1','image2');
		//return $ar;
		if($id==0){
			
			//$sql=sprintf("INSERT INTO  tenant (name,unit,phone,email,website,text1,text2, image1,image2) VALUES ('%s','%s','%s','%s','%s','%s','%s','%s','%s')",$details['name'], $details['unit'], $details['phone'], $details['email'], $details['website'], $details['text1'], $details['text2'], $details['image1'], $details['image2']);
			$sql="INSERT INTO  $table (name,unit,phone,email,website,text1,text2, image1,image2) VALUES (?,?,?,?,?,?,?,?,?)";
		//$ar=array($details['name'], $details['unit'], $details['phone'], $details['email'], $details['website'], $details['text1'], $details['text2'], $details['image1'], $details['image2']);
		}else{
			//$ar=array($details['name'], $details['unit'], $details['phone'], $details['email'], $details['website'], $details['text1'], $details['text2'], $details['image1'], $details['image2']);
			//$sql=sprintf("UPDATE  tenant SET name='%s',unit='%s',phone='%s',email='%s',website='%s', text1='%s', text2='%s', image1='%s', image2='%s' WHERE tenantid=".$id,$details['name'], $details['unit'], $details['phone'], $details['email'], $details['website'], $details['text1'], $details['text2'], $details['image1'], $details['image2']);
		$sql="UPDATE  $table SET name=?,unit=?,phone=?,email=?,website=?, text1=?, text2=?, image1=?, image2=? WHERE id=".$id;
		}
			$result=$this->db-> prepare($sql);
			$result=$this->db-> execute($ar);
			
			//$result=$this->db->insert_update($sql) ;
			$id=$this->db-> insert_id();
			return $sql;
		
	}
	//function to save tenant image uploaded to file system
	public function saveImage1($file,$filename){		
		$data = $file->data;
		$res=file_put_contents('../../data/images/'.$filename,$data);
		if($res) return 'data/images/'.$filename;
		else return $res;		
	}
	public function saveImage2($file,$filename){		
		$data = $file->data;
		$res=file_put_contents('../../data/images/'.$filename,$data);
		if($res) return 'data/images/'.$filename;
		else return $res;		
	}
	public function saveImage($file,$filename){		
		$data = $file->data;
		$res=file_put_contents('../../data/images/'.$filename,$data);
		if($res) return 'data/images/'.$filename;
		else return $res;		
	}
	
	//Deletes a unit from a tenant
	/*
	public function deleteTenantUnit($details)
	{
		$sql="DELETE FROM tenant_details WHERE tenant_id=".$details['tenantId']." AND tenant_unit=".$details['unit'];
		$result=$this->db->query($sql) ;// or die ($this->db->error());
		return $result;
	}
	*/
	public function showDetails($isShown,$table){
		
	if($table=="tenant")	$sql="UPDATE screens SET showDetails=".$isShown; 
	else if($table=="people") $sql="UPDATE screens SET isDetails2=".$isShown; 
		
		if($sql)$result=$this->db->insert_update($sql) ; //or die ($this->db->error());
		return $result?$isShown."=".$table:$this->db->error();
		
		//return $this->isDetailsShown($screenId);
		
	}
	public function deleteTenant($ar,$table)	{
		$this->db->insert_update("BEGIN TRANSACTION");
		foreach ($ar as $id){
			$sql="DELETE FROM  $table WHERE id =".$id;
		$result=$this->db->insert_update($sql);
		}
		$this->db->insert_update("COMMIT");
		return $result;
	}
	

	public function beforeFilter($function_called){
		if(Authenticate::isUserInRole('admin'))	{
			$this->screenid=Authenticate::getAuthUser();
			return true;
		}
		else return false;
	}

}
?>