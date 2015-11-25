<?php
session_start();
define('DATA','../data');
$kiosk_id=0;
$sett_file= 'settings.json';
if(isset($_GET['kiosk'])) {
		$kiosks = json_decode(file_get_contents(DATA.'/devices.json'));
		$kiosk_id=(int)$_GET['kiosk'];
		foreach($kiosks as $kiosk) if($kiosk->id==$kiosk_id) break;
		if($kiosk->id==$kiosk_id){
			if(isset($kiosk->settings) && $kiosk->settings) $sett_file = $kiosk->settings;
		}		
}

if(isset($_GET['settings'])) $sett_file=$_GET['settings'].'.json';
$settings = json_decode(file_get_contents(DATA.'/'.$sett_file));
foreach($_GET as $key=>$val) $settings->$key=$val;

//overwrite settings with get
$theme = isset($settings->theme)?$settings->theme:'css/themeWhite.css';



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
    <link rel="shortcut icon" href="favicon.ico" type="image/x-icon">
	<title>Kiosk</title>
    <link href="css/reset.css" rel="stylesheet" />
    <link href="css/bootstrap.css" rel="stylesheet" />
    <link href="css/kiosk.css" rel="stylesheet" />
    <link href="css/kiosk1080.css" rel="stylesheet" />
    <link href="<?= $theme; ?>" rel="stylesheet" />
   
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
        <?= isset($labels['bg_1080'])?'background-image:url("'.$labels['bg_1080'].'");':'' ?>
    }
    body{
        width: 1080px;
        height: 1920px;
        overflow: hidden;
    }


</style>
</head>
<body>
<div id="Templates" class="hidden"> </div>
<div id="History" class="hidden"></div>

<div id="container">
    <section id="u-header" class="banner-color view-port">

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
           #Pages .page>.header{
               font-size: large;
               margin-bottom: 1em;
           }



        </style>
        <div id="mainport" class="mainbg u-glow view-port-content">
            <section id="SearchResult" data-ctr="uplight.SearchResult">
                <div class="col-sm-12">
                    <div id="list-header" >
                        <div id="list-header-main" >
                            <h4 data-id="header">  <?= isset($labels['list-header'])?$labels['list-header']:''; ?></h4>
                        </div>
                    </div>
                </div>
                <hr style="margin-bottom: 0"/>
                <div  class="col-lg-12">
                    <div id="list-main">
                        <div class="nano-content" data-id="list">
                        </div>
                    </div>
                </div>
                <hr style="margin-top: 0"/>
                <div  class="col-sm-12">
                    <div class="more col-sm-8" >
                        <p style="vertical-align: text-bottom; line-height: 140px">  <?=  isset($labels['list_footer'])?$labels['list_footer']:'( <span class="fa fa-plus"></span> More... More Info Available )'; ?></p>
                    </div>
                    <div class="col-sm-4">
                        <div id="searchinput" data-ctr="uplight.SearchInput">
                            <style>
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
                                #searchinput #textInput{
                                    border-radius: 30px;
                                    font-size: 30px;
                                    width: 400px;
                                    height: 82px;
                                    border: none;
                                    padding: 20px 40px 20px 20px;
                                    margin-right: -20px;
                                }
                            </style>
                            <!-- <span class="fa fa-search"></span>-->
                            <div id="textInput" data-id="input" class="input-text pull-right" ></div>
                            <span class="fa fa-times-circle"  data-id="btnClear"></span>
                        </div>
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
                    }

                    #MenuList{
                        height: 230px;
                        overflow-y:auto;

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
            #Categories>.list{
                height: 250px;
                overflow-y: auto;
                overflow-x: hidden;
                width: 220px;
                margin-left: -10px;
            }
            #Categories ul>li{
                font-size: 16px;
                width: 100%;
                text-align: left;
                /*  line-height:25px;*/
            }

            #Categories li .icon{
                display: inline-block;
                width: 16px;
                height: 16px;

            }

            #Categories li>.check{
                display:inline-block;
                width: 20px;
                color:#9d9d9d;
            }

        </style>
        <section class="col-sm-3">
            <div id="Categories" data-ctr="uplight.CategoriesCheck">

                <h3>
                    <?= isset($labels['categories'])?$labels['categories']:'Categories'; ?>
                </h3>
                <div class="list">

                </div>

            </div>
        </section>
        <section class="col-sm-6 text-center">
            <h3 class="text-center">
                <?= isset($labels['keyboard'])?$labels['keyboard']:'&nbsp;'; ?>
            </h3>
            <div id="Keyboard"  class="text-center" data-ctr="uplight.Keyboard">
            </div>
            <hr/>
            <h3 class="text-center">
                <a id="btnShowMenu" class="brand-color">
                <?= isset($labels['topages'])?$labels['topages']:'&nbsp;'; ?>
                </a>
            </h3>
        </section>
        <section class="col-sm-3">
            <div  data-id="btnClose" class="btn pull-right btn-close"><span class="fa fa-close"></span></div>
            <div id="keywords" data-ctr="uplight.Keywords">
                <h3 class="text-center">
                    <?= isset($labels['keywords'])?$labels['keywords']:'Keywords'; ?>
                </h3>


                <div id="kw-container" class="nano" data-id="list">
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

    <style>
        #DetailsLarge>.modal-dialog{
            width: 730px;
            top:380px;
            margin-top: 0;

        }
        #DetailsLarge .modal-content{
            height: 1100px;
        }
    </style>
    <?php
    include('htms/kiosk/DetailsLarge.htm');
    ?>

</div> <!--End of container-->

<section id="AttractLoop" data-ctr="uplight.AttractLoop">
    <div  class="cover" data-id="cover">
    </div>

    <link href="css/AttractLoop.css" rel="stylesheet" />
    <link href="css/AL_1080.css" rel="stylesheet" />
    <script src="js/kiosk/als/AttractLoop.js"></script>
    <script src="js/kiosk/als/ScreenSaver.js"></script>
    <script src="js/kiosk/als/TouchClip.js"></script>
    <script src="js/kiosk/als/Gallery.js"></script>
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

<script src="js/kiosk/Kiosk.js" ></script>

</body>
</html>
