<?php
/**
 * Creates the methodTable for a service class.
 *
 * @usage $this->methodTable = MethodTable::create($this);
 * @author Christophe Herreman
 * @since 05/01/2005
 * @version $id$
 * 
 * Special contributions by Allessandro Crugnola and Ted Milker
 */

if (!defined('T_ML_COMMENT')) {
   define('T_ML_COMMENT', T_COMMENT);
} else {
   define('T_DOC_COMMENT', T_ML_COMMENT);
}

function strrstr($haystack, $needle)
{
	return substr($haystack, 0, strpos($haystack.$needle,$needle));
}

function strstrafter($haystack, $needle)
{
	return substr(strstr($haystack, $needle), strlen($needle));
}

class MethodTable
{
	
	function MethodTable(){
	}


	
	static function create($className, $servicePath = NULL, &$classComment){
		
		$methodTable = array();
		if(file_exists($className))
		{
			//The new __FILE__ way of doing things was used
			$sourcePath = $className;
			$className = str_replace("\\", '/', $className);
			$className = substr($className, strrpos($className, '/') + 1);
			$className = str_replace('.php', '', $className);
		}
		else
		{
			$className = str_replace('.php', '', $className);
			$fullPath = str_replace('.', '/', $className);
			$className = $fullPath;
			if(strpos($fullPath, '/') !== FALSE)
			{
				$className = substr(strrchr($fullPath, '/'), 1);
			}
			
			if($servicePath == NULL)
			{
				if(isset($GLOBALS['amfphp']['classPath']))
				{
					$servicePath = $GLOBALS['amfphp']['classPath'];
				}
				else
				{
					$servicePath = "../services/";
				}
			}
			$sourcePath = $servicePath . $fullPath . ".php";
		}
		
		if(!file_exists($sourcePath))
		{
			trigger_error("The MethodTable class could not find {" . 
				$sourcePath . "}", 
				E_USER_ERROR);
		}
		
		if(class_exists('ReflectionClass'))
		{
			//PHP5
			$classMethods = MethodTable::getClassMethodsReflection($sourcePath, $className, $classComment);
		}
		else
		{
			//PHP4
			
			$classMethods = MethodTable::getClassMethodsTokenizer($sourcePath, $className, $classComment);
		}
		
		foreach ($classMethods as $key => $value) {
			if($value['name'][0] == '_' || $value['name'] == 'beforeFilter')
			{
				continue;
			}
			$methodSignature = $value['args'];
			$methodName = $value['name'];
			$methodComment = $value['comment'];
			
			$description = MethodTable::getMethodDescription($methodComment) . " " . MethodTable::getMethodCommentAttribute($methodComment, "desc");
			$description = trim($description);
			$access = MethodTable::getMethodCommentAttributeFirstWord($methodComment, "access");
			$roles = MethodTable::getMethodCommentAttributeFirstWord($methodComment, "roles");
			$instance = MethodTable::getMethodCommentAttributeFirstWord($methodComment, "instance");
			$returns = MethodTable::getMethodCommentAttributeFirstLine($methodComment, "returns");
			$pagesize = MethodTable::getMethodCommentAttributeFirstWord($methodComment, "pagesize");
			$params = MethodTable::getMethodCommentArguments($methodComment);
						
			//description, arguments, access, [roles, [instance, [returns, [pagesize]]]]
			$methodTable[$methodName] = array();
			//$methodTable[$methodName]["signature"] = $methodSignature; //debug purposes
			$methodTable[$methodName]["description"] = ($description == "") ? "No description given." : $description;
			$methodTable[$methodName]["arguments"] = MethodTable::getMethodArguments($methodSignature, $params);
			$methodTable[$methodName]["access"] = ($access == "") ? "private" : $access;
			
			if($roles != "") $methodTable[$methodName]["roles"] = $roles;
			if($instance != "") $methodTable[$methodName]["instance"] = $instance;
			if($returns != "") $methodTable[$methodName]["returns"] = $returns;
			if($pagesize != "") $methodTable[$methodName]["pagesize"] = $pagesize;
		}
		
		$classComment = trim(str_replace("\r\n", "\n", MethodTable::getMethodDescription($classComment)));
		
		return $methodTable;
	}
	
	static function getClassMethodsReflection($sourcePath, $className, & $classComment)
	{
		//Include the class in question
		$dir = dirname($sourcePath);
		if(!is_dir($dir))
		{
			return array();
		}
		
		chdir($dir);
		
		if(!file_exists($sourcePath))
		{
			return array();
		}
		
		//HACK: eAccelerator
		//Check if eAccelator is installed
		if( extension_loaded( "eAccelerator" ))
		{
			//Touch the file so the results of getDocComment will be accurate
			touch($sourcePath);
		}
		
		$included = include_once($sourcePath);
		if($included === FALSE)
		{
			return array();
		}
		
		//Verify that the class exists
		if(!class_exists($className))
		{
			return array();
		}
		
		$methodTable = array();
		
		$class = new ReflectionClass($className);
		
		$classComment = $class->getDocComment();
		$methods = $class->getMethods();
		
		
		foreach($methods as $reflectionMethod){
			
			if($reflectionMethod->isPublic() && $method->name[0] != '_' && $method->name != 'beforeFilter')
			{
				if($reflectionMethod->isConstructor())
				{
					$classComment .= $reflectionMethod->getDocComment();
				}
				else
				{
					$reflectionParameter = $reflectionMethod->getParameters();
					
					$methodTableEntry = array();			
					$parameters = array();
					
					foreach($reflectionParameter as $parameter){
						$parameters[] = $parameter->getName();
					}
					
					$methodTableEntry['args'] = '(' . implode(', ', $parameters);
					$methodTableEntry['name'] = $reflectionMethod->name;
					$methodTableEntry['comment'] = $reflectionMethod->getDocComment();
					
					$methodTable[] = $methodTableEntry;
				}
			}
		}
		
		return $methodTable;
	}
	
	static function getClassMethodsTokenizer($sourcePath, $className, & $classComment)
	{
		$source = file_get_contents($sourcePath);
		$tokens = token_get_all($source);
		
		$waitingForOpenParenthesis = false;
		$waitingForFunction = false;
		$waitingForClassName = false;
		$bufferingArgs = false;
		$argBuffer = "";
		$lastFunction = "";
		$lastFunctionComment = "";
		$lastComment = "";
		$classMethods = array();
		$realClassName = "";

		$openBraces = -10000;

		$waitingForEndEncapsedString = false;
		foreach($tokens as $token)
		{
		   if (is_string($token)) {
				if($token == '{')
				{
					$openBraces++;
				}
				if($token == '}')
				{
					if($waitingForEndEncapsedString)
					{
						$waitingForEndEncapsedString = false;
					}
					else
					{
						$lastComment = '';
						$openBraces--;
						
						if($openBraces == 0)
						{
							//break;
						}
					}
				}
				elseif($waitingForOpenParenthesis && $token == '(')
				{
					$bufferingArgs = true;
					$argBuffer = "";
					$waitingForOpenParenthesis = false;
				}
				elseif($bufferingArgs)
				{
					if($token != ')')
					{
						$argBuffer .= $token;
					}
					else
					{
						if($lastFunction != $realClassName && $lastFunction != "__construct")
						{
							$classMethods[] = array("name" => $lastFunction,
											   "comment" => $lastFunctionComment,
											   "args" => $argBuffer);
						}
						else
						{
							$classComment .= "\n\n" . $lastComment;
						}
						
						$bufferingArgs = false;
						$argBuffer = "";
						$lastFunction = "";
						$lastFunctionComment = "";
					}
					
				}
		   } else {
			   // token array
			   list($id, $text) = $token;
				
				if($bufferingArgs)
				{
					$argBuffer .= $text;                    
				}
			   switch ($id) 
			   {
					
				   case T_COMMENT:
				   case T_ML_COMMENT: // we've defined this
				   case T_DOC_COMMENT: // and this
				   // no action on comments
						$lastComment = $text;
						break;
				   case T_FUNCTION:
						if($openBraces >= 1)
						{
							$waitingForFunction = true;
						}
						break;
					case T_STRING:
						if($waitingForFunction)
						{
							$waitingForFunction = false;
							$waitingForOpenParenthesis = true;
							$lastFunction = $text;
							$lastFunctionComment = $lastComment;
							$lastComment = "";              
						}
						if($waitingForClassName)
						{
							$waitingForClassName = false;
							if(strpos(strtolower($className), strtolower($text)) !== FALSE)
							{
								//Not the class we were looking for
								$classComment = $lastComment;
								$realClassName = $text;
							}
						}
						break;
					case T_CLASS:
						$openBraces = 0;
						$waitingForClassName = true;
						break;
					case T_CURLY_OPEN:
					case T_DOLLAR_OPEN_CURLY_BRACES:
						$waitingForEndEncapsedString = true;
						break;
				}
			}
		}
		return $classMethods;
	}
	
	/**
	 * 
	 */
	static function getMethodCommentArguments($comment)
	{
		$pieces = explode('@param', $comment);
		$args = array();
		if(is_array($pieces) && count($pieces) > 1)
		{
			for($i = 0; $i < count($pieces) - 1; $i++)
			{
				$ps = strrstr($pieces[$i + 1], '@');
				$ps = strrstr($ps, '*/');
				$args[] = MethodTable::cleanComment($ps);
			}
		}
		return $args;
	}
	
	
	static function getMethodDescription($comment){
		$comment = MethodTable::cleanComment(strrstr($comment, "@"));
		return trim($comment);
	}
		
	static function getMethodCommentAttribute($comment, $attribute){
		$pieces = strstrafter($comment, '@' . $attribute);
		if($pieces !== FALSE)
		{
			$pieces = strrstr($pieces, '@');
			$pieces = strrstr($pieces, '*/');
			return MethodTable::cleanComment($pieces);
		}
		return "";
	}
		
	static function getMethodCommentAttributeFirstLine($comment, $attribute){
		$pieces = strstrafter($comment, '@' . $attribute);
		if($pieces !== FALSE)
		{
			$pieces = strrstr($pieces, '@');
			$pieces = strrstr($pieces, "*");
			$pieces = strrstr($pieces, "/");
			$pieces = strrstr($pieces, "-");
			$pieces = strrstr($pieces, "\n");
			$pieces = strrstr($pieces, "\r");
			$pieces = strrstr($pieces, '*/');
			return MethodTable::cleanComment($pieces);
		}
		return "";
	}
	
	static function getMethodCommentAttributeFirstWord($comment, $attribute){
		$pieces = strstrafter($comment, '@' . $attribute);
		if($pieces !== FALSE)
		{
			$val = MethodTable::cleanComment($pieces);
			return trim(strrstr($val, ' '));
		}
		return "";
	}
		
	static function getMethodArguments($methodSignature, $commentParams){
		if(strlen($methodSignature) < 2){
			//no arguments, return an empty array
			$result = array();
		}else{
			//clean the arguments before returning them
			$result = MethodTable::cleanArguments(explode(",", $methodSignature), $commentParams);
		}
		
		return $result;
	}
	
	
	static function cleanArguments($args, $commentParams){
		$result = array();
		
		foreach($args as $index => $arg){
			$arg = strrstr(str_replace('(', '', $arg), '=');
			if(!isset($commentParams[$index]))
			{
				$result[] = trim($arg);
			}
			else
			{
				$start = trim($arg);
				$end = trim(str_replace('$', '', $commentParams[$index]));
				//echo($start);
				//echo($end);
				if($end != "" && $start != "" && strpos(strtolower($end), strtolower($start)) === 0)
				{
					$end = substr($end, strlen($start));
				}
				$result[] = $start . ' - ' . trim($end);
			}
		}
		
		return $result;
	}
	
	
	static function cleanComment($comment){
		$comment = str_replace("/**", "", $comment);
		$comment = str_replace("*/", "", $comment);
		$comment = str_replace("*", "", $comment);
		$comment = str_replace("\r", "", trim($comment));
		$comment = preg_replace("{\n[ \t]+}", "\n", trim($comment));
		$comment = str_replace("\n", "\\n", trim($comment));
		$comment = preg_replace("{[\t ]+}", " ", trim($comment));
		
		$comment = str_replace("\"", "\\\"", $comment);
		return $comment;
	}

	
	function showCode($methodTable){
		

		foreach($methodTable as $methodName=>$methodProps){
			$result .= "\n\t\"" . $methodName . "\" => array(";
			
			foreach($methodProps as $key=>$value){
				$result .= "\n\t\t\"" . $key . "\" => ";

				if($key=="arguments"){
					$result .= "array(";
					for($i=0; $i<count($value); $i++){
						$result .= "\"" . addslashes($value[$i]) . "\"";
						if($i<count($value)-1){
							$result .= ", ";
						}
					}
					$result .= ")";
				}else{
					$result .= "\"" . $value . "\"";
				}

				$result .= ",";
			}
			
			$result = substr($result, 0, -1);
			$result .= "\n\t),";
		}
		
		$result = substr($result, 0, -1);
		$result = "\$this->methodTable = array(" . $result;
		$result .= "\n);";
			
		return $result;
	}
}
?>