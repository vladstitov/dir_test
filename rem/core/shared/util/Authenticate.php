<?php

class Authenticate {
	
	function isAuthenticated () {
		if (isset($_SESSION['amfphp_username'])) {
			return true;
		} else {
			return false;
		} 
	} 

	function getAuthUser () 
	{
		if(isset($_SESSION['amfphp_username']))
		{
		  return $_SESSION['amfphp_username'];
		}
		else
		{
		  return false;
		}
	} 
	
	function isUserInRole($roles) {
		$methodRoles = explode(",", $roles); // split the method roles into an array
		foreach($methodRoles as $key => $role) {
			$methodRoles[$key] = strtolower(trim($role));
		}
		if(!isset($_SESSION['amfphp_roles']))	$_SESSION['amfphp_roles'] = "";
		
		$userRoles = explode(",", $_SESSION['amfphp_roles']); // split the users session roles into an array
		
		foreach($userRoles as $key => $role) {
			$userRoles[$key] = strtolower(trim($role));
			if (in_array($userRoles[$key], $methodRoles)) {
				return true;
			} 
		} 
		return false;
	} 

	/**
	 * login assumes that the user has verified the credentials and logs in the user.
	 * 
	 * The login method hides the session implementation for storing the user credentials
	 * 
	 * @param string $name The user name
	 * @param string $roles The comma delimited list of roles for the user
	 */
	static function login($name, $roles) {
		if(!session_id()){	session_start();}
		$_SESSION['amfphp_username'] = $name;
		$_SESSION['amfphp_roles'] = $roles;
	} 

	/**
	 * logout kills the user session and terminates the login properties
	 */
	static function logout() {
		$_SESSION['amfphp_username'] = null;
		$_SESSION['amfphp_roles'] = null;
		if(isset($_SESSION['amfphp_username']))
		{
			unset($_SESSION['amfphp_username']);
		}
		if(isset($_SESSION['amfphp_roles']))
		{
			unset($_SESSION['amfphp_roles']);
		}
		return true;
	} 
} 

?>