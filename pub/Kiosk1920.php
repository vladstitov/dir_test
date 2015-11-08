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
    <link href="css/kiosk1920.css" rel="stylesheet" />
   
    <link href="js/libs/font-awesome.css" rel="stylesheet" type="text/css"/>

    <script src="js/libs/jquery-2.1.0.min.js"></script>
    <script src="js/libs/underscore-min.js"></script>
    <script src="js/libs/svgjs.js"></script>
    <script type="text/javascript">

    </script>

    <!--<script src="js/kiosk/Kiosk.js"></script>-->
<style>
    body{
        width: 1920px;
        height: 1080px;
        overflow: hidden;
    }
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
    .mainbg{
        background-color: rgba(255,255,255,0.75);
        border-radius: 20px;
    }
    #container{
        width: 1920px;
        height: 1080px;
        overflow: hidden;
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
                <div id="Clock" data-ctr="uplight.Clock">
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
                left: 0;
                right: 0;
                margin: auto;
                overflow: hidden;
               white-space: nowrap;
            }

           #mainport>section{
               display: inline-block;
               width:725px;
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
           #Pages .page>.content{
               height: 740px;
               overflow-y: auto;
               overflow-x: hidden;
           }
            #Pages>div{
                width:1480px;

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
        <div id="mainport" class="mainbg view-port-content">
            <section id="SearchResult" data-id="searchResult" data-ctr="uplight.SearchResult">
                <div class="col-sm-12">
                    <? include('htms/kiosk/ListHeader.php'); ?>
                </div>
                <hr style="margin-bottom: 0"/>
                <div  class="col-lg-12">
                    <? include('htms/kiosk/ListMain.php'); ?>
                </div>
                <hr style="margin-top: 0"/>
            </section>
               <section id="Pages"  data-ctr="uplight.InfoPagesModel">

                </section>
        </div>

    </section>


    <section id="sideview" class="view-port">
        <style>
            #sideview{
                position: absolute;
               width: 180px;
                bottom: 170px;
                height: 150px;
                right: 320px;
                text-align: center;
            }
            .btn-xxlarge{
                width: 100px;
                height: 100px;
                font-size: 50px;
                line-height: 50px;
                border-radius: 10px;
            }

        </style>
        <hr/>
        <!--<div id="toolsview" class="view-port-content" data-ctr="notSwitchView">-->
            <div data-ctr="uplight.ButtonSearch">

                <button  data-id="btnSearch" class="btn-danger btn-xxlarge">
                    <span class="fa fa-search" ></span>
                </button>
                <h3 class="text-center">
                    <?= isset($labels['btnSearch'])?$labels['btnSearch']:'&nbsp;'; ?>
                </h3>
            </div>


        <!--</div>-->
    </section>
    <section id="KeyboardView" class="text-center mainbg" data-ctr="uplight.KeyboardView">
        <h3 class="text-center">
            <?= isset($labels['keyboard'])?$labels['keyboard']:'&nbsp;'; ?>
        </h3>
        <div class="col-sm-10">

            <div id="searchinput">
                <style>
                    #KeyboardView{
                        position: absolute;
                        width:520px;
                        padding: 10px;
                        padding-bottom: 20px;
                        bottom: 50px;
                        right: 150px;
                    }
                    #KeyboardView.show{
                        transform: translateY(0);
                    }
                    #KeyboardView{
                        transition: transform 0.5s;
                        transform: translateY(500px);
                    }
                    #KeyboardView h3{
                        margin: 0;

                    }
                    #searchinput{
                        position: relative;
                    }
                    #searchinput .fa-times-circle{
                        position: absolute;
                        top: 25px;
                        right: 10px;
                        font-size: 30px;
                        color: #adadad;
                    }
                    #searchinput input{
                        border-radius: 30px;
                        font-size: 30px;
                        width: 200px;
                        border: none;
                        padding: 20px 40px 20px 20px;
                        margin-right: -20px;
                    }
                </style>
                <!-- <span class="fa fa-search"></span>-->
                <input type="text" class="Plastic031 pull-right" />
                <span class="fa fa-times-circle"  data-id="btnClear"></span>
            </div>

            <style>
                #searchinput .fa-times-circle{
                    top:10px;
                    right: 0;
                }
                #searchinput input {
                    border-radius: 10px;
                    font-size: 30px;
                    width: 400px;
                    border: none;
                    padding: 5px 5px 5px 5px;
                    margin-right: -20px;
                }
            </style>
        </div>
        <div class="col-sm-2">
            <button class="btn btn-danger" data-id="btnClose"><span class="fa fa-close"></span></button>
        </div>
        <div id="Keyboard" data-ctr="uplight.Keyboard" class="text-center">
        </div>
    </section>
        <section id="view3" class="mainbg">
            <style>
                #view3{
                    position: absolute;
                    top: 300px;
                    right: 215px;
                    padding: 20px;
                }
            </style>
            <div id="MainMenu" data-ctr="MainMenu">
                <style>
                    #MainMenu>.nano{
                        width: 400px;
                        height: 300px;
                        overflow-y: scroll;
                        overflow-x: hidden;
                    }
                    #MainMenu li.item {
                        border-radius: 20px;
                        margin: 12px 0 12px 0;
                        padding: 12px;
                        width: 98%;
                        font-size: 30px;
                    }
                </style>
                <h2 class="text-center">Menu</h2>
                <div data-id="list" class="nano">

                </div>

            </div>
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
        #AttractLoop{
            width: 1920px;
            height: 910px;
        }
        #AttractLoop .gallery>.x650x1024 {
            position: absolute;
            margin: auto;
            left: 0;
            right: 0;
            bottom: 0px;
            width: 650px;
            height: 1024px;
            overflow: hidden;
        }
        #Touchclip{
            position: absolute;
            left: 0;
            bottom: 0;
            width: 1920px;
            height: 120px;
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
<script src="js/kiosk/views.js"></script>

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
