<?php
class NetDebug 
{
	
	static function initialize()
	{
		
	}
	
	function trace($what)
	{
		NetDebug::getTraceStack($what);
	}
	
	function printr($what)
	{
		ob_start();
		print_r($what);
		$result = ob_get_clean();
		NetDebug::getTraceStack($result);
	}
		
	static function getTraceStack($val=NULL)
	{
		static $traceStack = array();
		if($val !== NULL)
		{
			$traceStack[] = $val;
		}
		return $traceStack;
	}
} 

?>