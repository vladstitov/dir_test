<?php
class MyDatabase2 {
	private $db;
	private $stmt;
	private $rowar;
	private $rowasar;
	private $resar;
	private $count;
	
	public function begin(){
		$this->db->beginTransaction();
	}
	public function commit(){
		$this->db-> commit();
	}
public function prepare($sql){
	$this->stmt=$this->db->prepare($sql);
	}
	public function execute($ar){
		$this->stmt->execute($ar);
	}
	public function load($str){
			$this->db = new PDO('sqlite:'.$str);
	}
	private function reset(){
		$this->rowar=0;
		$this->resar=0;
		$this->rowasar=0;
	}
	public function query($sql){
		$this->stmt=$this->db->query($sql);
		return $this->stmt;
	}
	public function requery($sql){
		$this->reset();
		$this->stmt=$this->db->query($sql);
		return $this->db->query($sql);
	}
	public function total(){
		return $this->stmt-> fetchColumn();
	}
	public function count($sql){
		$st=$this->db->query($sql);
		//return $this->db->errorInfo();
		if(st) return $st->fetchColumn();
		else return $this->db->errorInfo();
	}
	public function insert_update($sql){
		return $this->db->query($sql);
	}
	public function myquery($sql){
		return $this->db->query($sql);
	}
	public function fetchAllAsSoc($result){
		return $result->fetchAll(PDO::FETCH_ASSOC);
	}
	public function fetch_assoc($result){
		return $result-> fetch(PDO::FETCH_ASSOC);
	}
	public function fetch_array($result){
		return $result->fetch();
	}
	
	public function fetch_array_num($result){
		return  $result->fetchAll(PDO::FETCH_NUM);
	}
	public function error(){
		return $this->db->errorInfo();
	}
	
	public function fetch_row($result){
		return $result->fetch(PDO::FETCH_NUM);
	}
	public function num_rows($result){
		return  count($this->stmt->fetchAll(PDO::FETCH_NUM));
	}
	public function insert_id(){
		
		return $this->db->lastInsertId();
	}
	public function nextValue($result,$col){
		$ar=$result->fetch(PDO::FETCH_NUM);
		return $ar[$col];
	}
	public function result($result,$row=0,$col=0){
		if(!$this->rowar)$this->rowar=$result->fetch(PDO::FETCH_NUM);
		
		return $this->rowar[$col];
	}
}