<?php
session_start();
define('DATA','../data');
$kiosk_id=0;

$sett_file= 'settings.json';

if(isset($_GET['kiosk'])) {
		$kiosks = json_decode(file_get_contents(DATA.'/kiosks.json'));
		$kiosk_id=(int)$_GET['kiosk'];
		foreach($kiosks as $kiosk) if($kiosk->id==$kiosk_id) break;
		if($kiosk->id==$kiosk_id){
			if(isset($kiosk->settings) && $kiosk->settings) $sett_file = $kiosk->settings;
		}		
}

if(isset($_GET['settings'])) $sett_file=$_GET['settings'].'.json';
$settings = json_decode(file_get_contents(DATA.'/'.$sett_file));

foreach($_GET as $key=>$val) $settings->$key=$val;


$l=file_get_contents(DATA.'/'.$settings->labels);


$lbs = json_decode($l);
$labels = array();
foreach($lbs as $label) $labels[$label->index] = $label->value;
?>
<!DOCTYPE html>
<html ln="en">
<head>
    <script>
       <?php
			$out = ' var u_settings ='.json_encode($settings).";\n";
            $out.=' var u_labels = '.json_encode($labels).";\n";
			echo $out;
       ?>;		
       
    </script>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="Kiosk 1080">
    <meta name="author" content="Vlad">
	<title>Kiosk</title>
    <link href="js/lists/reset.css" rel="stylesheet" />
    <link href="js/libs/bootstrap.css" rel="stylesheet" />
    <link href="css/lightblue.css" rel="stylesheet" />
    <link href="css/kiosk1080.css" rel="stylesheet" />
   
    <link href="js/libs/font-awesome.css" rel="stylesheet" type="text/css"/>

    <script src="js/libs/jquery-2.1.0.min.js"></script>
    <script src="js/libs/svgjs.js"></script>
    <script type="text/javascript">

    </script>

    <!--<script src="js/kiosk/Kiosk.js"></script>-->
<style>
    .hide{
        display: none;
    }
    li>a{
        display: block;
        color: inherit;
    }
    body{
        background-image: url('<?= $labels['background']; ?>');
    }


</style>
</head>
<body>
<div id="Templates" class="hidden"> </div>
<div id="History" class="hidden"></div>

<div id="container">
    <section id="u-header" class="main-color view-port">

            <div id="brand-logo" >
                <?= isset($labels['logo'])?'<img src="'.$labels['logo'].'" />':''; ?>
            </div>
            <div id="brand-name" >
                   <?= isset($labels['header'])?$labels['header']:''; ?>
            </div>
            <div id="brand-more">
                <div id="Clock">
                </div>

            </div>
            <p id="brand-slogan">
                <?= isset($labels['slogan'])?$labels['slogan']:''; ?>
            </p>

    </section>


    <section id="mainview" data-ctr="SearchResult" class="view-port">
        <style>
           #mainport, #cover>.detailsL {
                position: absolute;
                width:725px;
                height: 1077px;
                left: 0;
                right: 0;
                margin: auto;
                overflow: hidden;
               white-space: nowrap;
            }

           #mainport>section{
               display: inline-block;
               width:725px;
               height: 1077px;
               vertical-align: top;

           }

           /* #mainport .view-port{
                position: absolute;
                width: 90%;
                height: 95%;
                left: 0;
                right: 0;
                top: 0;
                bottom: 0;
                margin: auto;
            }*/
           #Pages{
               overflow: hidden;
           }
            #Pages>div{
                width:1480px;
                height: 1077px;
               /* white-space: nowrap;*/
             }
           #Pages>div>div{
               float: left;
               white-space: normal;
               /*display: inline-block;*/
              /* vertical-align: top;*/
               width:725px;
               height: 1077px;
               padding: 22px;

           }

        </style>
        <div id="mainport" class="mainbg u-glow view-port-content">
                <?php
                 include('js/kiosk/search/SearchResult.html');
                ?>
               <section id="Pages" data-id="Pages">

                </section>
        </div>

    </section>


    <section id="sideview" class="view-port">
        <hr/>
        <div id="toolsview" class="mainbg view-port-content">
            <?php
            include('js/kiosk/menu/StartMenu.html');
            include('js/kiosk/search/SearchTools.html');
            ?>
        </div>
        <hr/>
    </section>


    <section id="footer">
        <?= isset($labels['footer'])?$labels['footer']:''; ?>
    </section>

    <?php
    include('js/kiosk/search/DetailsLarge.html');
    ?>

</div> <!--End of container-->

<section id="AttractLoop">
    <div  class="cover" data-id="Body">
    </div>
    <style>
        #AttractLoop {
            position: absolute;
            top: 170px;

        }
    </style>
</section>



<script src="js/kiosk/Registry.js"></script>
<script src="js/kiosk/Connector.js"></script>
<script src="js/kiosk/search/models.js"></script>

<link href="js/kiosk/search/Keyboard.css" rel="stylesheet" />
<script src="js/kiosk/search/KeyboardSimple.js" ></script>

<script src="js/kiosk/search/Keywords.js" ></script>
<script src="js/kiosk/search/SearchResult.js"></script>
<script src="js/kiosk/search/DetailsLarge.js"></script>

<script src="js/kiosk/search/SearchModel.js"></script>
<script src="js/kiosk/search/Categories.js"></script>

<script src="js/kiosk/InfoPage.js"></script>
<script src="js/kiosk/MainMenu.js"></script>
<script src="js/kiosk/utils/Relay.js"></script>
<script src="js/kiosk/utils/Timeout.js"></script>

<script src="js/kiosk/Banner.js" ></script>
<!--<script src="js/kiosk/MainView.js"></script>
<script src="js/kiosk/SearchDetails.js"></script>
-->
<?php 
if(!isset($settings->noss)) echo '<link href="js/kiosk/als/AttractLoop.css" rel="stylesheet" /><script src="js/kiosk/als/AttractLoop.js"></script><script src="js/kiosk/als/ScreenSaver.js"></script>';
if(!isset($settings->nokiosk)) echo '<script src="js/kiosk/Kiosk.js" ></script>';
?>





<script>
    $(document).ready(function(){
        $(document).triggerHandler('DOCUMENT_READY');

    })
</script>

</body>
</html>
