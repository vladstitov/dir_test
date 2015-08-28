<?php
require "MyDatabase.php";	

class SearchTenants {	
private $dba;
	public function __get($db){
		if(!$this->dba){
			$this->dba=new MyDatabase();
			$this->dba-> load("whatever");
		}
		return $this->dba;
	}
	
	/////////////////////////////////////////////////////////
	public function getTenantsByScreenIdTotal($screenId){
		$sql="SELECT address_id FROM screens WHERE screen_id=".$screenId;
		$result=$this->db->query($sql);
		$n=$this->db->num_rows($result);
		if($n==0) return 0;
		$sql="SELECT COUNT(*) AS recordCount FROM tenants WHERE building_id=".$this->db->result($result,0);
		for($i=1;$i<$n;$i++){
			$sql.=" OR building_id=".$this->db->result($result,$i);
		}
		
		$result=$this->db->query($sql);
		
		$row   = $this->db->fetch_assoc($result);
		return $row['recordCount'];
	
	}
	
	public function getTenantsByScreenId($screenId,$page,$limit){
		$sql="SELECT address_id FROM screens WHERE screen_id=".$screenId;
		$result=$this->db->query($sql);
				
		$n=$this->db->num_rows($result);
		if($n<1) return 0;
		$sql="SELECT * FROM tenants WHERE building_id=".$this->db->result($result,0);
		for($i=1;$i<$n;$i++){
			$sql.=" OR building_id=".$this->db->result($result,$i);
		}
		$sql.=" LIMIT $page,$limit";
		$result=$this->db->query($sql);
		return $result;
		
	}
	
	function getTenantsLikeUnitTotal($screenId,$word){
		$sql="SELECT address_id FROM screens WHERE screen_id=".$screenId;
		$result=$this->db->query($sql);
		$n=$this->db->num_rows($result);
		if($n==0) return 0;
		$sql="SELECT COUNT(*) AS recordCount FROM tenants, tenant_details WHERE building_id=".$this->db->result($result,0);
		for($i=1;$i<$n;$i++){
			$sql.=" OR building_id=".$this->db->result($result,$i);
		}
		$sql.=" AND tenant_unit LIKE '$word%' ";
	$result=$this->db->query($sql) ; //or die ( $this->db->error());
		
		$row   = $this->db->fetch_assoc($result);
		return $row['recordCount'];
	}

	function getTenantsLikeUnit($screenId,$word,$page,$limit){
		
		$sql="SELECT address_id FROM screens WHERE screen_id=".$screenId;
		$result=$this->db->query($sql);
		$n=$this->db->num_rows($result);
		if($n==0) return 0;
		$sql="SELECT tenants.tenant_id, tenants.tenant_name, tenant_details.tenant_unit, tenants.building_id 
		 FROM tenant_details
		 LEFT JOIN tenants 
		 ON tenants.tenant_id = tenant_details.tenant_id 
		 WHERE building_id=".$this->db->result($result,0);
		for($i=1;$i<$n;$i++){
			$sql.=" OR building_id=".$this->db->result($result,$i);
		}
		$sql.=" AND tenant_details.tenant_unit LIKE '$word%'  LIMIT $page,$limit ";
		$result=$this->db->query($sql);
			
		return $result;	
			
	}
	
	function getTenantsLike($screenId,$word,$page,$limit){
		$sql="SELECT address_id FROM screens WHERE screen_id=".$screenId;
		$result=$this->db->query($sql);
		$n=$this->db->num_rows($result);
		if($n==0) return 0;
		$sql="SELECT * FROM tenants WHERE building_id=".$this->db->result($result,0);
		for($i=1;$i<$n;$i++){
			$sql.=" OR building_id=".$this->db->result($result,$i);
		}
		$sql.=" AND tenant_name LIKE '%$word%'  LIMIT $page,$limit ";
		$result=$this->db->query($sql);
		
		return $result;
	}
	public function getTenantsLikeTotal($screenId,$word){
		
		$sql="SELECT address_id FROM screens WHERE screen_id=".$screenId;
		$result=$this->db->query($sql);
		$n=$this->db->num_rows($result);
		if($n==0) return 0;
		$sql="SELECT COUNT(*) AS recordCount FROM tenants WHERE building_id=".$this->db->result($result,0);
		for($i=1;$i<$n;$i++){
			$sql.=" OR building_id=".$this->db->result($result,$i);
		}
		$sql.=" AND tenant_name LIKE '%$word%' ";
	$result=$this->db->query($sql) ; //or die ( $this->db->error());
		
		$row   = $this->db->fetch_assoc($result);
		return $row['recordCount'];
	
	}
	
	public function beforeFilter($function_called){
		if(Authenticate::isUserInRole('admin')){
			$userId=Authenticate::getAuthUser();
			//define(ACCOUNT,$id);
			//define(MEDIA,PROJECT.'account_'.$id.'/media');
			//define(IMAGES,PROJECT.'account_'.$id.'/images');
			return true;
		}
		else return false;
	}

	   
}
?>