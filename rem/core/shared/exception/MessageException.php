<?php

require_once(AMFPHP_BASE . "shared/app/Constants.php");

@ini_set("html_errors", 0);

class MessageException {
	
	function MessageException ($code, $description, $file, $line, $detailCode = 'AMFPHP_RUNTIME_ERROR') {
		$this->code = $detailCode;
		$this->description = $description; // pass the description    
		$this->details = $file; // pass the details
		$this->level = MessageException::getFriendlyError($code); 
		$this->line = $line; // pass the line number
	}
	
	
	static function throwException (&$body, $exception) {
		$body->responseURI = $body->responseIndex . "/onStatus";
		$results = &$body->getResults();

		if($GLOBALS['amfphp']['encoding'] == 'amf3')
		{
			$results = new ErrorMessage();
			$results->correlationId = $GLOBALS['amfphp']['lastMessageId'];
			$results->faultCode = $exception->code;
			$results->faultDetail = $exception->details . ' on line ' . $exception->line;
			$results->faultString = $exception->description;
		}
		elseif($GLOBALS['amfphp']['encoding'] == 'amf0')
		{
			$results["description"] = $exception->description;
			$results["details"] = $exception->details;
			$results["level"] = $exception->level;
			$results["line"] = $exception->line;
			$results["code"] = $exception->code;
		}
		else
		{
			$results['faultCode'] = $exception->code;
			$results['faultDetail'] = $exception->details . ' on line ' . $exception->line;
			$results['faultString'] = $exception->description;
		}
	} 
	
	static function getFriendlyError ($err) {
		$errortype = array (1 => "Error",
			2 => "Warning",
			4 => "Parsing Error",
			8 => "Notice",
			16 => "Core Error",
			32 => "Core Warning",
			64 => "Compile Error",
			128 => "Compile Warning",
			256 => "User Error",
			512 => "User Warning",
			1024 => "User Notice",
			2048 => "Strict error",
			);
		if(isset($errortype[$err]))
		{
			return $errortype[$err];
		}
		else
		{
			return "Unknown error type";
		}
	} 
} 

?>