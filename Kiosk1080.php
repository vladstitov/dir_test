<?php
session_start();
$kiosk_id=0;
$file_name='data/kiosks.json';
$kiosks =  json_decode(file_get_contents($file_name));
if(isset($_GET['kiosk'])) $kiosk_id=$_GET['kiosk'];
/*
$res=0;
foreach($kiosks as $kiosk) if($kiosk->id==$kiosk_id){
		$kiosk->status='loaded';
		$kiosk->S_time = time();
		$res = file_put_contents($file_name,json_encode($kiosks));
		break;
}
	
if($res===0) exit;
*/

$settings = json_decode(file_get_contents('data/settings.json'));




$s= array();
foreach($settings as $val) $s[$val->id]=$val->value;
//
$l=file_get_contents('data/labels.json');
$labels = json_decode($l);
?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <script>
        var u_settings = <?php echo json_encode($s); ?>;
        var kiosk_id='<?php echo $kiosk_id; ?>';
        var u_labels = <?php echo $l; ?>;
    </script>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="Kiosk 1080">
    <meta name="author" content="Vlad">
	<title>Kiosk</title>
    <link href="css/reset.css" rel="stylesheet" />
    <link href="css/lightblue.css" rel="stylesheet" />
    <link href="css/kiosk1080.css" rel="stylesheet" />
   <link href="css/kiosk/mainview.css" rel="stylesheet" />
    <link href="css/font-awesome.css" rel="stylesheet" type="text/css"/>
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

</head>
<body style="background-image: url('<?= $labels->background; ?>')">
<div id="container">
    <section id="u-header" class="main-color">
        <div id="brand-logo" >
            <img src="<?= $labels->logo; ?>" />
        </div>
        <div id="brand-name" >
               <?= $labels->header; ?>
        </div>
        <div id="brand-more">
            <div id="Clock">
            </div>

        </div>
        <p id="brand-slogan">
            <?= $labels->slogan; ?>
        </p>
    </section>


    <section id="mainview" data-ctr="SearchResult">
        <div id="mainport" class="mainbg u-glow">
            <div class="view-port">
                <section id="list-header">
                    <div id="list-header-main">
                        <?= $labels->list_header; ?>
                    </div>
                </section>
                <hr/>
                <section id="list-main" class="nano">
                        <div id="the-list" class="nanp-content">
                        </div>
                </section>
                <hr/>
                <section id="list-footer">
                    <div id="list-footer-main">
                        <div class="more">
                            <?= ($labels->list_footer!='default')?$labels->list_footer:'( <span class="fa fa-plus"></span> More... More Info Available )'; ?>

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
                        <h3>Categories</h3>

                    </div>
                </section>

                <section class="view3">
                    <div id="keywords">
                        <h3>Keywords</h3>

                        <div id="kw-container" class="nano">
                        </div>

                    </div>
                </section>
            </div>
        </div>
        <hr/>
    </section>
<section id="footer">
    <?= $labels->footer; ?>
</section>
    <section id="cover">

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
<!--<script src="js/kiosk/MainView.js"></script>
<script src="js/kiosk/SearchDetails.js"></script>
-->
<script src="js/kiosk/ScreenSaver.js"></script>

<script src="js/kiosk/Banner.js" ></script>
<script src="js/kiosk/Kiosk.js" ></script>

</body>
</html>
