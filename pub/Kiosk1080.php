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
    <link href="css/kiosk.css" rel="stylesheet" />
    <link href="css/kiosk1080.css" rel="stylesheet" />
   
    <link href="js/libs/font-awesome.css" rel="stylesheet" type="text/css"/>

    <script src="js/libs/jquery-2.1.0.min.js"></script>
    <script src="js/libs/underscore-min.js"></script>
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


    <section id="mainview" class="view-port">
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
            <section id="SearchResult" data-ctr="uplight.SearchResult">
                <div class="col-sm-12">
                    <? include('htms/kiosk/ListHeader.php'); ?>
                </div>
                <hr style="margin-bottom: 0"/>
                <div  class="col-lg-12">
                    <? include('htms/kiosk/ListMain.php'); ?>
                </div>
                <hr style="margin-top: 0"/>
                <div  class="col-sm-12">
                    <div class="more col-sm-8" >
                        <p style="vertical-align: text-bottom; line-height: 140px">  <?=  isset($labels['list_footer'])?$labels['list_footer']:'( <span class="fa fa-plus"></span> More... More Info Available )'; ?></p>
                    </div>
                    <div class="col-sm-4">
                        <? include('htms/kiosk/SearchInput.php'); ?>
                    </div>
                </div>
            </section>
               <section id="Pages" data-ctr="uplight.InfoPagesModel">

                </section>
        </div>

    </section>


    <section id="sideview" class="view-port">
        <hr/>
        <div id="toolsview" class="mainbg view-port-content" data-ctr="uplight.LowPanelController">
            <section data-ctr="uplight.PagesMenu" class="row">
                <style>
                    #btnSearch{
                        font-size:100px;
                        padding:20px;
                        color:white;
                        background-color:red;
                    }

                    #MenuList{
                        height: 200px;
                        overflow: hidden;
                    }
                    #MenuList  li.item {
                        border-radius: 20px;
                        margin: 12px 0 12px 0;
                        padding: 12px;
                        width: 98%;
                        font-size: 30px;
                    }
                </style>

                <div class="col-sm-2"></div>
                <div class="col-sm-6">
                    <h3 class="text-center">
                        <?= isset($labels['infopages'])?$labels['infopages']:'&nbsp;'; ?>
                    </h3>
                    <div>
                        <div id="MenuList" class="nano" data-id="list">
                        </div>
                    </div>
                </div>
                <div class="col-sm-2">
                    <h3 class="text-center">
                        <?= isset($labels['btnSearch'])?$labels['btnSearch']:'&nbsp;'; ?>
                    </h3>
                    <div id="btnSearch" class="fa fa-search pull-right" >

                    </div>

                </div>
            </section>
        </div>
        <div class="col-sm-2"></div>
    </section>


    <section id="SearchView" class="row">
        <style>
            #sideview h3{
                color: #9d9d9d;
            }

            #SearchView h3>a{
                padding: 12px;
                border-radius: 12px;
            }
            #Categories{
                margin-left: 2em;
            }
            #kw-container{
                float: right;
                height:270px ;
                width: 150px;
                overflow-y: auto;
                margin-right: 50px;

            }
            #kw-container li>a{
                width: 100%;
                text-align: left;
                /* text-decoration: underline;*/
                /*  margin: 0.5em;*/
                /*  border-bottom: thin #f8f8f8 solid;*/

            }
        </style>
        <section class="col-sm-3">
            <div id="Categories">

                <h3>
                    <?= isset($labels['categories'])?$labels['categories']:'Categories'; ?>
                </h3>

            </div>
        </section>
        <section class="col-sm-6 text-center">
            <h3 class="text-center">
                <?= isset($labels['keyboard'])?$labels['keyboard']:'&nbsp;'; ?>
            </h3>
            <div id="Keyboard" data-js="Keyboard" class="text-center" data-ctr="uplight.Keyboard">
            </div>
            <hr/>
            <h3 class="text-center"><a data-id="btnShowMenu" class="Plastic031">
                <?= isset($labels['topages'])?$labels['topages']:'&nbsp;'; ?>
            </a></h3>
        </section>
        <section class="col-sm-3">
            <div  data-id="btnClose" class="btn pull-right Plastic031"><span class="fa fa-close"></span></div>
            <div id="keywords">
                <h3 class="text-center">
                    <?= isset($labels['keywords'])?$labels['keywords']:'Keywords'; ?>
                </h3>


                <div id="kw-container" class="nano">
                </div>

            </div>

        </section>


    </section>
        </div>
        <hr/>
    </section>
    <section id="footer">
        <?= isset($labels['footer'])?$labels['footer']:''; ?>
    </section>

    <?php
    include('htms/kiosk/DetailsLarge.htm');
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
<script src="js/kiosk/views.js"></script>
<script src="js/kiosk/utils/Relay.js"></script>
<script src="js/kiosk/utils/Timeout.js"></script>

<script src="js/kiosk/Banner.js" ></script>
<!--<script src="js/kiosk/MainView.js"></script>
<script src="js/kiosk/SearchDetails.js"></script>
-->
<?php 
if(!isset($settings->noss)) echo '<link href="css/AttractLoop.css" rel="stylesheet" /><script src="js/kiosk/als/AttractLoop.js"></script><script src="js/kiosk/als/ScreenSaver.js"></script>';
if(!isset($settings->nokiosk)) echo '<script src="js/kiosk/Kiosk.js" ></script>';
?>





<script>
    $(document).ready(function(){
        $(document).triggerHandler('DOCUMENT_READY');

    })
</script>

</body>
</html>
