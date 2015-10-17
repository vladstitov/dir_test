<?php
define('DATA','../../data');
session_start();
if(isset($_POST['credetials'])){
	$cred = $_POST['credetials'];
	$out = new stdClass();
	if($cred=='logout'){
				logout();				
				$out->success='logout';
				$out->msg='User Logout';
				echo json_encode($out);
				exit();
	}
	
	$ar = explode(',',$cred);	
	$filename=DATA.'/directories.db';	
	
		$db = new PDO('sqlite:'.$filename);
		
		$sth=$db->prepare("SELECT * FROM users WHERE username=? AND password=?");
		$sth->execute($ar);
		$res = $sth->fetch(PDO::FETCH_OBJ);
		
		if($res){
			$_SESSION['directories_user']=$res->username;
			$_SESSION['directories_role']=$res->role;
			$_SESSION['directories_folder']=$res->folder;			
			$out->success='loggedin';
			if(!file_exists(DATA.'/bk'))  mkdir(DATA.'/bk', 0777, true);
			copy($filename,DATA.'/bk/'.date('j-m-y_h-i-s').'_'.$res->usersid.'.db');
			//header( 'Location: http://www.yoursite.com/new_page.html' );
		}else{
			$out->success='wrong';
			logout();
			$out->msg='Please check username and password';			
			if(isset($_GET['debug'])) 	$out->error=$db->errorInfo();			
		}
		
		echo json_encode($out);
		
}

function logout(){
				$_SESSION['directories_user']=NULL;
				$_SESSION['directories_folder']=NULL;
				$_SESSION['directories_role']=NULL;
}


?>