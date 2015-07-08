<?php
if(!isset($_GET['action'])|| !isset($_GET['screenid'])) die("hello world");

$out= new stdClass;

$screenid=$_GET['screenid'];


switch($_GET['action']){
	case 'getmenuitems':
	$out->data=getMenuItems($screenid);
	$out->result='success';
	$out->target='mainmenu';
	break;
	case 'getListing':
	switch($_GET['type']){
		case 'category':
		$out->data=getListingByCategory($screenid,$_GET['id']);
		$out->result='success';
		$out->target='listview';
		break;
		
	}
	break;
	case 'getDetails':
		$out->data=getDetails($screenid,$_GET['type'],$_GET['id']);
		$out->target='detailsview';
	break;
	
}
if(isset($_GET['target']))$out->target=$_GET['target'];
echo json_encode($out);


function getDetails($screenid,$type,$id){
	
	$sql="SELECT * FROM ".addslashes($type)." WHERE id=".(int)$id;
		$dbfile='../../data/directories.db';
		$db=new PDO('sqlite:'.$dbfile);
		$smtp=$db->query($sql) ;// or die ($this->db->error());
		$row=$smtp->fetch(PDO::FETCH_ASSOC);		
		$out=new stdClass;		
		$out->name=$row['name'];
		$out->unit=$row['unit'];
		$out->image1=$row['image1'];
		$out->image2=$row['image2'];
		$out->htmltext=formatData('Unit: ',$row['unit']).formatData('Phone : ',$row['phone']).formatData('Website : ',$row['website']).formatData('Email : ',$row['email']);
		
		$out->htmltext2=formatData('',$row['text1']).formatData('<br/>',$row['text2']);
		//$row['mapimage'] = IMAGES."/MAP_" . $screenID . "_" . trim($row['unit']) . ".png";
		
		return $out;
	
}

function formatData($str1,$str2){
				
		if($str2=="" || $str2==" ") return "";
		return "$str1$str2<br/>";
		
	}
	
function getMenuItems($screenid){
	//$db=$this->getDb();
	$dbfile='../../data/directories.db';
	$db=new PDO('sqlite:'.$dbfile);
	$out=array();
	$smtp=$db->query('SELECT word_id,value,sort FROM word_tenant WHERE visible=1 ORDER BY sort DESC');
	while($row=$smtp->fetch(PDO::FETCH_NUM)){
		$vo=new stdClass;
		$vo->id=$row[0];
		$vo->label=$row[1];
		$vo->type='category';
		$out[]=$vo;
	}
	$datafile='../../data/d'.$screenid.'.json';
	$data=json_decode(file_get_contents($datafile));
	$additional=$data->additional->data;
	foreach($additional as $value){
		if($value->enabled != TRUE) continue;
		$vo=new stdClass;
		$vo->id=$value->id;
		$vo->type='additional';
		$vo->img=$value->image;
		$vo->label=$value->label;
		$out[]=$vo;
	}
	
	return $out;
	
}
function getListingByCategory($screnid,$id){
	$dbfile='../../data/directories.db';
	$db=new PDO('sqlite:'.$dbfile);
	$out=array();
	$id=(int)$id;
	if($id==0) {
		$res=$smtp=$db->query('SELECT word_id FROM word_tenant WHERE visible=1 ORDER BY sort DESC');
		$row=$smtp->fetch(PDO::FETCH_NUM);
		$id=$row[0];
		
	}
	//var_dump($row);
	
	$sql="SELECT tenant.id,tenant.name,tenant.unit,words_tenant.sort FROM tenant,words_tenant WHERE  tenant.id=words_tenant.data_id  AND words_tenant.word_id=".$id." ORDER BY words_tenant.sort DESC";	
	$smtp=$db->query($sql);
	while($row=$smtp->fetch(PDO::FETCH_NUM)){
		$vo=new stdClass;
		$vo->id=$row[0];
		$vo->name=$row[1];
		$vo->unit=$row[2];
		$vo->type='tenant';
		$out[]=$vo;
	}
	return $out;
}

function getDb(){
	$dbfile='../../data/directories.db';
	$db=new PDO('sqlite:'.$dbfile);
	return $db;
}
?>