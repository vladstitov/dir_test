<?php
//require_once('../cl/DbConnector.php');
class Login {	
		
	public function logmein($data){
		$filename='../../data/directories.db';
		copy($filename,'../../data/bk/'.time().'.db');
	
		$db = new PDO('sqlite:'.$filename);
		
		$sth=$db->prepare("SELECT * FROM users WHERE username=? AND password=?");
		$sth->execute(array($data['user'],$data['pass']));
		$res = $sth->fetch(PDO::FETCH_OBJ);
		$out='Please check username and password';
		if($res){
			$_SESSION['directories_user']=$res->role;
			$_SESSION['directories_folder']=$res->folder;
			///$result= new stdClass();
			//$result->url=$res->url;
			$out=array();	
			$out['result']=json_encode($result);
			$out['url']=$res->url;
			$db=null;
			
			//header( 'Location: http://www.yoursite.com/new_page.html' );
		}else{
			$_SESSION['directories_user']=NULL;
			$_SESSION['directories_folder']=NULL;
			if(isset($data['debug'])) 	$out=json_encode($db->errorInfo());				
			
			
		}
		
		
		
		return $out;
	}

}
?>