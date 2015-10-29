<?
class Utils{ 	
	public function restartKiosks($get){
				error_log('restart: '.date("Y-m-d H:i:s")."/r/n", 3, DATA.'restart.log');
				$out=new stdClass();
				$out->success='success';
				return $out;				
	}	
	
	public function saveData($file_name,$data){
		$out=new stdClass();				
		$filename=DATA.$file_name;					
		if(!file_exists($filename)) {
					$out->error='hacker';
					return $out;				
		}
		
		rename($filename,DATA.'arch/'.time().$file_name);		
		$res = file_put_contents($filename,$data);	
			
		if($res){
			$out->success='file saved';
			$out->result= $file_name;
		} else $out->error='cant save file';
		
		return $out;
	}
	
	public function savePage($file_name,$data){
		$out=new stdClass();
		$res = file_put_contents('../'.$file_name,$data);	
		if($res){
			$out->success='file saved';
			$out->result= $file_name;
		} else $out->error='cant save file';
		
		return $out;
	}

	public function uploadImage($file,$folder,$prefix){
			$out=new stdClass();
			
		if ($file["error"] > 0){
			$out->error= $file["error"];
			return $out;
		}
		
		if (!file_exists('../'.IMG.$folder)) mkdir('../'.IMG.$folder, 0777, true);
		
		$filename = $folder.'/'.$prefix.'_'.$file["name"];
		
		if(move_uploaded_file($file["tmp_name"],'../'.IMG.$filename)){
			$out->success='success';
			$out->result=IMG.$filename;
		}		
		return $out;
		
	}


}
