<?
class Utils{
	
	public function getDevicesData(){
				$out = new stdClass();
				$devices = json_decode($this->getData(array('file_name'=>'devices.json')));
				foreach($devices  as $device){
						$filename=DATA.'devs/track_'.$device->id.'.json';
						if(file_exists($filename))$device->track = json_decode(file_get_contents($filename));
				}
				$out->result = $devices;//  json_decode($this->getData(array('file_name'=>'devices.json')));
				$out->success = time();
				return $out;
	}

	public function restartKiosks($get){
				error_log('restart: '.date("Y-m-d H:i:s")."/r/n", 3, DATA.'restart.log');
				$out=new stdClass();
				$out->success='success';
				return $out;				
	}	
	public function getData($get){
			if(isset($get['file_name'])){
				$file_name = $get['file_name'];
				$pos = strpos($file_name,'.json');
				if($pos === false)$file_name=$file_name.'.json';			
				$file_name= DATA.$file_name;			
				if(file_exists($file_name)) return file_get_contents($file_name);			
			}			
			return 'ERROR';
	}
		
	public function saveSettings($dataStr){
		$out= new stdClass();
		$filename=DATA.'settings.json';
		if(file_exists($filename)){
				copy($filename,DATA.'/bk/'.date('j-m-y_h-i-s').'settings.json');
				$out->result = file_put_contents($filename,$dataStr);
				if($out->result)$out->success='success';				
				else $out->error='cant save file';	
				
		}else $out->error='error saving data in settings';
		
		return $out;
	}
	public function saveData($file_name,$data){
		$out=new stdClass();
		if(strpos($file_name,'.json') === false)$file_name=$file_name.'.json';			
		if(!file_exists(DATA.$file_name)) {
					$out->error='hacker';
					return $out;				
		}						
		rename(DATA.$file_name,DATA.'arch/'.time().$file_name);	
		$res = file_put_contents(DATA.$file_name,$data);	
			
		if($res){
			$out->success='success';
			$out->result= 'data saved';
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
		switch ($file["error"]) {
			case UPLOAD_ERR_OK:
				$out->result = 'UPLOAD_ERR_OK';
            break;
			case UPLOAD_ERR_NO_FILE:
				$out->result = 'UPLOAD_ERR_NO_FILE';            
			case UPLOAD_ERR_INI_SIZE:
			case UPLOAD_ERR_FORM_SIZE:
				$out->result = 'UPLOAD_ERR_INI_SIZE';
			default:
				$out->result = 'UNKNOWN_ERROR';
		}
			
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
