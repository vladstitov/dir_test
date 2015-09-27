﻿<?php
define('DATA','../data');
$strSetttings=file_get_contents(DATA."/settings.json");
$settings=json_decode($strSetttings);
$strLabels= file_get_contents(DATA."/".$settings->labels);
$labels=json_decode($strLabels);
foreach($labels as $label)$labels[$label->index]=$label->value;
$title='title';
?>
<!DOCTYPE html>
<html lang="en">
<head>
	<title>INTERACTIVE DIRECTORIES</title>
	<meta name="viewport" content="width=device-width, initial-scale=1"/>
    <script src="js/libs/jquery-2.1.0.min.js"></script>
    <link rel="stylesheet" href="js/libs/bootstrap.css" />
    <link rel="stylesheet" href="js/libs/font-awesome.css" />
    <link rel="stylesheet" href="css/lightblue.css" />








     <script type="text/javascript">
	 var scr;
	 <?php
	 $js=' var u_settings='.$strSetttings;
     $js.="\n\r".' var u_labels='.$strLabels;


	 echo $js;
	 ?>
	 </script>
    <style type="text/css">
        #FrontPage{
            background-image: url('<?= $labels['background']; ?>');
            width: 100%;
            height: 100%;
            background-size: 100% 100%;
        }

	</style>
            
    
</head>

<body>
<div id="Container" class="container">
    <style>
        #Header{
            height: 30px;
        }
        #Header #brand-logo>img{
            height: 50px;
        }



    </style>
    <section id="Header" class="row">
       <!-- <div class="col-sm-12" data-id="bgImage">
            <div class="col-sm-1">

            </div>
            <div class="col-sm11">
                <div id="brand-logo" >
                    <?= isset($labels['logo'])?'<img src="'.$labels['logo'].'" />':''; ?>
                </div>
                <h2 data-id="header"></h2>
            </div>
        </div>-->
    </section>
    <section id="Content" class="row">
        <div id="FrontPage">

        </div>


        <div data-id="container" >
            <?php include('js/mobile/DetailsLarge.htm'); ?>


            <section id="InfoPages" data-ctr="InfoPages" class="row">
                <style>
                    #InfoPages .pagecontent{
                        margin-left: 5px;
                    }
                </style>
                <div class="col-sm-12">
                    <h3 data-id="pageTitle"></h3>
                </div>
                <div class="col-sm-12">

                    <div data-id="content" class="pagecontent">

                    </div>
                </div>
            </section>

            <?php include('js/mobile/FilterPage.htm'); ?>

        </div>
    </section>

    <section id="Footer" class="row">
        <?= isset($labels['footer'])?$labels['footer']:''; ?>
    </section>

<?php include('NavigationBar.html');?>


</div>
<section id="ImageView">
    <style>
        #ImageView{
            position: fixed;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0,0,0,0.5);
            z-index: 1100;
            display: none;

        }
        #ImageView img{
            position: absolute;
            margin: auto;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            max-width: 100%;
            max-height: 100%;
        }

    </style>

    <img>


</section>

<script src="js/kiosk/Registry.js"></script>
<script src="js/kiosk/Connector.js"></script>
<script src="js/kiosk/search/models.js"></script>
<script src="js/mobile/InfoPage.js"></script>
<script src="js/mobile/FilterPage.js"></script>
<script src="js/mobile/Utils.js"></script>
<script src="js/mobile/Menu.js"></script>
<script src="js/kiosk/search/DetailsLarge.js"></script>
<script src="js/Mobile.js"></script>

</body>
</html>
