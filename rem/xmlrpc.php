<?php

	/**
	 * XML-RPC server
	 */
	include("../remote/globals.php");

	include "../remote/core/xmlrpc/app/Gateway.php";
	
	$gateway = new Gateway();
	
	$gateway->setBaseClassPath($servicesPath);
	
	$gateway->service();
?>