<?php
session_start();
if(isset($_POST['credetials'])){
	$cred = $_POST['credetials'];
	$ar = explode(',',$cred);	
	$filename='../../data/directories.db';
	
	$out = new stdClass();
	
		$db = new PDO('sqlite:'.$filename);
		
		$sth=$db->prepare("SELECT * FROM users WHERE username=? AND password=?");
		$sth->execute($ar);
		$res = $sth->fetch(PDO::FETCH_OBJ);
		//$db->close();
		
		if($res){
			$_SESSION['directories_user']=$res->role;
			$_SESSION['directories_folder']=$res->folder;			
			$out->success='loggedin';
			copy($filename,'../../data/bk/'.time().'.db');
			//header( 'Location: http://www.yoursite.com/new_page.html' );
		}else{
			$out->success='wrong';
			$out->msg='Please check username and password';			
			$_SESSION['directories_user']=NULL;
			$_SESSION['directories_folder']=NULL;
			if(isset($_POST['debug'])) 	$out->error=$db->errorInfo();			
		}
		
		echo json_encode($out);
		
}


?>