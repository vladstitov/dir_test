<?php
session_start();
define('DATA','../data/');
$kiosk_id=0;

$sett_file= 'settings.json';

if(isset($_GET['kiosk'])) {
		$kiosks = json_decode(file_get_contents(DATA.'kiosks.json'));
		$kiosk_id=(int)$_GET['kiosk'];
		foreach($kiosks as $kiosk) if($kiosk->id==$kiosk_id) break;
		if($kiosk->id==$kiosk_id){
			if(isset($kiosk->settings) && $kiosk->settings) $sett_file = $kiosk->settings;
		}		
}

if(isset($_GET['settings'])) $sett_file=$_GET['settings'].'.json';
$settings = file_get_contents(DATA.$sett_file);
$sett=json_decode($settings);


$l=file_get_contents(DATA.$sett->labels);


$lbs = json_decode($l);
$labels = array();
foreach($lbs as $label) $labels[$label->index] = $label->value;



?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <script>
       <?php
			$out = ' var u_settings ='.$settings.";\n";
            $out.= ' var kiosk_id='.$kiosk_id.";\n";
            $out.=' var u_labels = '. $l.";\n";
			$out.=' var u_params = '.json_encode($_GET).";\r\n";
			echo $out;
       ?>;		
       
    </script>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="Kiosk 1080">
    <meta name="author" content="Vlad">
	<title>Kiosk</title>
    <link href="libs/reset.css" rel="stylesheet" />
    <link href="libs/bootstrap.css" rel="stylesheet" />
    <link href="css/lightblue.css" rel="stylesheet" />
    <link href="css/kiosk1080.css" rel="stylesheet" />
   <link href="css/kiosk/mainview.css" rel="stylesheet" />
    <link href="libs/font-awesome.css" rel="stylesheet" type="text/css"/>
    <!--
    <link href="css/KeyboardBlack.css" rel="stylesheet" type="text/css"/>
-->
    <script src="libs/jquery-2.1.0.min.js"></script>
    <script src="libs/svgjs.js"></script>
    <!--<script src="/libs/TweenMax.min.js"></script>
    <script src="/libs/easeljs-0.7.1.min.js"></script>-->
    <script type="text/javascript">

    </script>

    <!--<script src="js/kiosk/Kiosk.js"></script>-->
<style>
    .hidden{
        display: none;
    }

</style>
</head>
<body style="background-image: url('<?= $labels['background']; ?>')">
<section id="Templates" class="hidden">
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

</section>
<div id="container">
    <section id="u-header" class="main-color">
        <div id="brand-logo" >
            <?= isset($labels['logo'])?'<img src="'.$labels['logo'].'" />':''; ?>"
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


    <section id="mainview" data-ctr="SearchResult">
        <div id="mainport" class="mainbg u-glow">
            <div class="view-port">
                <section id="list-header">
                    <div id="list-header-main">
                        <?= isset($labels['list-header'])?$labels['list-header']:''; ?>
                    </div>
                </section>
                <br>

                <hr/>
                <section id="list-main" class="nano">

                </section>
                <hr/>
                <br>

                <section id="list-footer">
                    <div id="list-footer-main">
                        <div class="more">
                            <?=  isset($labels['list_footer'])?$labels['list_footer']:'( <span class="fa fa-plus"></span> More... More Info Available )'; ?>

                        </div>
                        <div id="searchinput">
                           <!-- <span class="fa fa-search"></span>-->
                            <input type="text" class="Plastic031" />
                            <span class="fa fa-times-circle" data-id="btnClear"></span>
                        </div>


                    </div>
                </section>

            </div>
        </div>

    </section>
    <section id="sideview">
        <hr/>
        <div id="toolsview" class="mainbg">
            <div class="view-port">
                <section class="view2">
                    <div id="Keyboard" data-js="Keyboard">
                    </div>
                </section>
                <section class="view1">
                    <div id="Categories">
                        <h3>
                            <?= isset($labels['categories'])?$labels['categories']:'Categories'; ?>
                        </h3>

                    </div>
                </section>

                <section class="view3">
                    <div id="keywords">
                        <h3>
                            <?= isset($labels['keywords'])?$labels['keywords']:'Keywords'; ?>
                        </h3>

                        <div id="kw-container" class="nano">
                        </div>

                    </div>
                </section>
            </div>
        </div>
        <hr/>
    </section>
<section id="footer">
    <?= isset($labels['footer'])?$labels['footer']:''; ?>
</section>

    <section id="cover">


    </section>

   <section id="DetailsLarge" class="modal" data-id="btnClose"  style="display: none">
        <div class="modal-dialog">
            <div class="modal-content Plastic031 central">
                    <div class="fa fa-close pull-right" data-id="btnClose"></div>
                <div class="modal-body content">


                </div>
                <div class="modal-footer">

                    <button class="btn btn-default pull-right" data-id="btnClose">Close</button>
                </div>
            </div>

        </div>

    </section>



</div>


<div id="History" style="display:none;"></div>

<script src="js/kiosk/Registry.js"></script>
<script src="js/kiosk/Connector.js"></script>
<script src="js/kiosk/models.js"></script>

<link href="css/kiosk/Keyboard.css" rel="stylesheet" />
<script src="js/kiosk/KeyboardSimple.js" ></script>

<script src="js/kiosk/Keywords.js" ></script>
<script src="js/kiosk/SearchResult.js"></script>
<script src="js/kiosk/SearchDetailsLarge.js"></script>
<script src="js/kiosk/SearchDetails.js"></script>
<script src="js/kiosk/SearchModel.js"></script>
<script src="js/kiosk/Categories.js"></script>
<script src="js/kiosk/InfoPage.js"></script>
<script src="js/kiosk/Banner.js" ></script>
<!--<script src="js/kiosk/MainView.js"></script>
<script src="js/kiosk/SearchDetails.js"></script>
-->
<?php 
if(!isset($_GET['no-ss'])) echo '<link href="js/kiosk/als/AttractLoop.css" rel="stylesheet" /><script src="js/kiosk/als/AttractLoop.js"></script><script src="js/kiosk/ScreenSaver.js"></script>';
if(!isset($_GET['no-kiosk'])) echo '<script src="js/kiosk/Kiosk.js" ></script>';
?>





<script>
    $(document).ready(function(){
        $(document).triggerHandler('DOCUMENT_READY');

    })
</script>

</body>
</html>
