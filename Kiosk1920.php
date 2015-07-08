<?php
$strSettings=file_get_contents("data/settings.json");
$settings=json_decode($strSettings);

?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<meta name="viewport" content="width=1920, initial-scale=0.5"/>
	<title></title>
    <link href="css/kiosk.css" />
    <link href="css/<?php echo $settings->main->color; ?>.css" rel="stylesheet" type="text/css"/>
    <link href="css/KeyboardBlack.css" rel="stylesheet" type="text/css"/>
    <style>
        body{
            background-image:url(<?php echo $settings->main->background; ?>);
        }
        -webkit-padding-start{
            marging:0;
        }

    </style>

    <script src="Scripts/jquery-2.1.0.min.js"></script>
    <script src="Scripts/svgjs.js"></script>
    <!--<script src="/Scripts/TweenMax.min.js"></script>
    <script src="/Scripts/easeljs-0.7.1.min.js"></script>-->
    <script type="text/javascript">
        var settings =<?=$strSettings?>

    </script>
    <script src="js/kiosk/Registry.js"></script>
    <script src="js/kiosk/Connector.js"></script>
    <script src="js/kiosk/models.js"></script>
    <script src="js/kiosk/Banner.js" ></script>
    <script src="js/kiosk/Keyboard.js" ></script>
    <script src="js/kiosk/KeyboardView.js" ></script>
    <script src="js/kiosk/SearchResult.js"></script>
    <script src="js/kiosk/InfoPage.js"></script>
    <script src="js/kiosk/Menu.js"></script>

    <script src="js/kiosk/MainView.js"></script>
    <script src="js/kiosk/Details.js"></script>
    <script src="js/kiosk/ScreenSaver.js"></script>
    <script src="js/kiosk/Kiosk.js"></script>
</head>
<body>

<div id="container">
<div id="DISPATCHER"></div>
	<div id="Banner">
    <div id="Header" class="u-brand"><?php echo $settings->header->title;  ?></div>
     </div>
	
	<div id="RightSide">
        <div id="ViewPort2" data-ctr="ViewPort1">
            <div id="Menu" >                
                <div id="menutitle" class="mytitle">Menu</div>
                <ul  class="mylist"> </ul>
               <!-- <div id="myArrow" >
                <img style="position:absolute;" src="css/icons/arrow2.png"/>
                </div>-->
                      
            </div>
        </div>
		<div id="KeyboardView"> 
			<a id="SearchButton" class="redbutton" href="#search">Search</a>     
            <div id="Keyboard">
                <div id="kb_hints"></div>
                <div id="kb_top">
                        <div id="kb_text"> <span>Keyboard text goes here</span> </div>
                        <div class="kb_space kb_button" ><span>DEL</span></div>
                        <a href="#kb-close" id="kb_close" class="ubutton" ></a>
                 </div>
                <div id="kb_keys"> </div>
            </div>		
		</div>
        
	</div>
	
	<div id="LeftSide">
		  <div id="MainView">  
                           
                    
                    
              
		<a  href="#back" class="redbutton"> Back </a>
	</div>
    
   
</div>
<div id="History" style="display:none;"></div>

</body>
</html>
