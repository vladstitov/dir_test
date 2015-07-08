<?php
	
	/**
	 * JSON gateway
	 */
	
	include("../remote/globals.php");
	
	include "../remote/core/json/app/Gateway.php";
	
	$gateway = new Gateway();
	
	$gateway->setBaseClassPath($servicesPath);
	
	$gateway->service();
?>