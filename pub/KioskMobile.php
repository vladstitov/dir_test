<?php

$strSetttings=file_get_contents("data/settings.json");
$settings=json_decode($strSetttings);

$title=$settings->admin->title;
$bg= $settings->main->background;


?>
<!DOCTYPE html> 
<html>
<head>
	<title>INTERACTIVE DIRECTORIES</title>
	<meta name="viewport" content="width=device-width, initial-scale=1">

  <<link rel="stylesheet" href="css/mobile.css" />
    <link href="css/<?php echo $settings->main->color; ?>.css" rel="stylesheet" type="text/css"/>
	 <script src="libs/jquery-2.1.0.min.js"></script>
    <script src="js/kiosk/Registry.js"></script>
    <script src="js/kiosk/Connector.js"></script>
    <script src="js/kiosk/models.js"></script>
    <script src="js/mobile/InfoPage.js"></script>
    <script src="js/mobile/FilterPage.js"></script>
    <script src="js/mobile/Menu.js"></script>
    <script src="js/mobile/DetailsPage.js"></script>
    <script src="js/mobile/SearchResult.js"></script>
    <script src="js/mobile/Main.js"></script>

     <script type="text/javascript">
	 
	 <?php
	 $js='var settings='.$strSetttings;
	 /*
	 $js.=file_get_contents('js/kiosk/Registry.js');
	 $js.=file_get_contents('js/kiosk/utils/net.js');
	 $js.=file_get_contents('js/kiosk/mods/models.js');
	 $js.=file_get_contents('js/mobile/InfoPage.js');
	 $js.=file_get_contents('js/mobile/FilterPage.js');
	 $js.=file_get_contents('js/mobile/Menu.js');
	 $js.=file_get_contents('js/mobile/DetailsPage.js');
	 $js.=file_get_contents('js/mobile/SearchResult.js');
	 $js.=file_get_contents('js/mobile/Main.js');
	 */
	 echo $js;
	 ?>	 
	 </script>   
    <style type="text/css">


	</style>
            
    
</head>

<body>
 <div class="large ubutton">
                 <p class="center"><?=$title ?></p>
            </div><!-- /header --> 
            
 <div id="Content">             
        <div id="Filter" class="page">
        
                     <div data-role="main" class="content">
                               <input class="searchinput" type="search" value placeholder="search" />
                                <div data-id="list" class="list">
                                </div>
                                
                     </div>  
        </div>	
        <div id="Results" class="page">         
                     <div data-role="main" class="content">
                                <p class="center large bgwhite" data-id="title">Results</p>
                                <div data-id="list" class="list">
                                </div>
                                
                     </div>  
        </div>
        <div id="Info" class="page">        
                    <div data-role="main" class="content bgwhite">
                                <p data-id="title" class="center">Info</p>
                                <div data-id="content">
                                </div>
                                
                     </div>  
                      
        </div>
        <div id="Details" class="page">        
                    <div data-role="main" class="content">                       
                                <div data-id="details" class="details">
                                Details
                                </div>
                                <div data-id="advanced">
                                Advanced
                                </div>
                                
                     </div>  
                      
        </div>
        <div id="Menu" class="page" style="display:block" >                   
                            <div class="content">
                            <div style="position:relative;">
                            <a href="#Search" class="left sb bgred" ><img src="css/img/search-bg.png"  />Search</a>
                            </div>
                                <p class="topic xlarge red center" >MENU </p>
                                <div data-id="list" class="list">
                                    
                                </div>                    
                         </div><!-- /content -->
                
                    
            
        </div><!-- /page -->
</div><!-- End content -->
<div id="footer">

<img  width="60%" src="<?=$bg?>" />
    <hr/>
</div>
</body>
</html>
