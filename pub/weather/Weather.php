<?php
$q=0;
if(isset($_GET['city'])){
	$city=$_GET['city'];
	$filename='data/'.$city.'.json';
	if(file_exists($filename) && time() - filemtime($filename)<12000){		
		 echo file_get_contents($filename);		
	}else{		
		$q=getQ($city);
		if($q){
			$weather=getWeather($q);
			file_put_contents($filename,$weather);
			echo $weather;
		}else echo 'Dontt have city: '.$city;
	}
	
	
	 
}


function getQ($city){
	$q=0;	
	switch($city){
		case 'Toronto': 
		$q='43.63000107,-79.40000153';
		break;
	}
	
	return $q;
}

function getWeather($q){
	$c=curl_init('http://api.wunderground.com/api/5b9eb056e60d346d/conditions/q/'.$q.'.json');
	curl_setopt($c, CURLOPT_RETURNTRANSFER, true);
	
	$w=json_decode(curl_exec($c));
	
	$w=$w->current_observation;
	$w2=new stdClass();
	$w2->temp=$w->temp_c;
	$w2->tempf=$w->temp_f;
	$w2->img=$w->icon_url;	
	return json_encode($w2) ;
}
?>