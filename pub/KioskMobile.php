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

	</style>
            
    
</head>

<body>
<div id="Container" class="container">
    <style>
        #Header{
            height: 50px;
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
        <div data-id="bgImage">

        </div>
        <div data-id="container" >




            <!--Details Page-->
            <section id="DetailsLarge" data-ctr="DetailsLarge" style="display: block"  >
                <style>
                    #DetailsLarge{

                    }
                    #DetailsLarge .nano {
                        overflow-x: auto;
                        overflow-y: hidden;
                        height: 100px;
                    }
                    #DetailsLarge .hlist {
                        white-space: nowrap;
                        height: 100px;
                    }
                    #DetailsLarge .hlist>a {
                        vertical-align: top;
                        position: relative;
                        width: 100px;
                        height: 100px;
                        display: inline-block;
                        margin: 0 5px 0 5px;
                    }
                    #DetailsLarge .hlist>a>img {
                        max-height: 100px;
                        max-width: 100px;
                        position: absolute;
                        margin: auto;
                        top: 0;
                        bottom: 0;
                        left: 0;
                        right: 0;
                    }
                    #DetailsLarge .shell{
                       width: 100%;
                        height: 466px;
                        position: relative;
                    }
                    #DetailsLarge .shell>img{
                       max-width: 100%;
                        max-height: 466px;
                        position: absolute;
                        margin: auto;
                        top: 0;

                        bottom: 0;
                        left: 0;
                        right: 0;
                    }
                    #DetailsLarge .details>.tmb>img{

                        height: 128px;
                    }

                </style>
                <div class="modal-dialog">
                    <div class="modal-content Plastic031 central">

                        <div class="modal-header">
                            <div class="fa fa-close pull-right" data-id="btnClose"></div>
                            <div class="row">
                                <div class="col-sm-9">
                                    <h4>Name</h4>
                                    <h2 data-id="name">
                                        Remove a portion
                                    </h2>
                                </div>
                                <div class="col-sm-3">
                                    <h4>unit</h4>
                                    <h2 data-id="unit"></h2>
                                </div>
                            </div>
                        </div>
                        <div class="modal-body content">
                            <div class="row details">
                                <div class="col-sm-8 more" data-id="more">

                                </div>
                                <div class="col-sm-4 tmb" data-id="tumb">

                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-12">
                                    <div class="shell">
                                        <img data-id="image" />
                                    </div>

                                </div>
                            </div>
                            <hr/>
                            <div class="row">
                                <div class="col-sm-12" >
                                    <div class="nano">
                                        <div  class="nano-content">
                                            <div data-id="gallery" class="hlist">

                                            </div>

                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button class="btn btn-default pull-right" data-id="btnClose">Close</button>
                        </div>
                    </div>

                </div>

            </section>




            <!-- Info Page-->
            <section data-ctr="InfoPages" class="row">
                <div class="col-sm-12" data-id="content">
                </div>
            </section>





            <!--Filter page-->
            <section  id="FilterPage"  data-ctr="FilterPage" class="row">

                    <style>
                        #FilterPage a:active{
                            background-color: khaki;
                        }

                        #FilterPage a.selected{
                            background-color: #c1e2b3;
                        }

                    </style>
                    <div class="col-sm-12">
                        <div class="col-sm-12">
                            <div data-id="tiFilter" >
                                <div style="position: absolute; right: 10px;">
                                    <span data-id="btnClear" id="FilterPageClose" class="btn fa fa-times-circle" style="font-size: 1.5em; color: #bbbbbb"></span>
                                </div>

                                <input type="text" data-id="filter" class="form-control">
                            </div>
                        </div>
                        <h2 data-id="catTitle"></h2>
                    </div>

                    <div class="col-lg-12">
                        <div data-id="list">

                        </div>
                    </div>



                </section>






        </div>
    </section>

    <section id="Footer" class="row">

    </section>

<?php include('NavigationBar.html');?>


</div>

<script src="js/kiosk/Registry.js"></script>
<script src="js/kiosk/Connector.js"></script>
<script src="js/kiosk/search/models.js"></script>
<script src="js/mobile/InfoPage.js"></script>
<script src="js/mobile/FilterPage.js"></script>
<script src="js/mobile/Menu.js"></script>
<script src="js/kiosk/search/DetailsLarge.js"></script>
<script src="js/Mobile.js"></script>

</body>
</html>
