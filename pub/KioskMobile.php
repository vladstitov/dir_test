<?php
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
    <link rel="stylesheet" href="css/mobile.css" />








     <script type="text/javascript">
	 var scr;
	 <?php
	 $js=' var u_settings='.$strSetttings;
     $js.="\n\r".' var u_labels='.$strLabels;


	 echo $js;
	 ?>
	 </script>
    <style type="text/css">
        .fixed{
            position: fixed;
            left: 0;
            top: 0;
        }
        #Navigation .fa-bars{
            width: 2em;
            height: 2em;
        }
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

        <div class="col-sm-12" data-id="bgImage">
            <div class="col-sm-2">
                <div data-id="btnBack">Back</div>
            </div>
            <div class="col-sm10">
                <div id="brand-logo" >
                    <?= isset($labels['logo'])?'<img src="'.$labels['logo'].'" />':''; ?>
                </div>
                <h2 data-id="header"></h2>
            </div>
        </div>
    </section>
    <section id="Content" class="row">
        <div data-id="bgImage">

        </div>
        <div data-id="container" >


                <section data-ctr="DetailsPage" class="row">
                    <div class="row">
                        <div class="col-sm-8" >
                            <h3 data-id="name"></h3>
                        </div>
                        <div class="col-sm-2">
                            <h3 data-id="unit"></h3>
                        </div>
                    </div>


                    <div class="col-sm-12" data-id="content">



                    </div>
                </section>



                <section data-ctr="InfoPages" class="row">
                    <div class="col-sm-12" data-id="content">

                    </div>
                </section>



                <section  data-ctr="FilterPage" class="row">

                    <div class="col-sm-2">

                    </div>
                    <div class="col-sm-8">
                        <div data-id="tiFilter">
                            <div style="position: absolute; right: 10px;">
                                <span data-id="btnClear" id="FilterPageClose" class="btn fa fa-times-circle" style="font-size: 1.5em; color: #bbbbbb"></span>
                            </div>

                            <input type="text" data-id="filter" class="form-control">
                        </div>
                        <h2 data-id="catTitle"></h2>

                    </div>
                    <div class="col-sm-2">

                    </div>
                    <div class="col-sm-12">
                        <div data-id="list">

                        </div>
                    </div>



                </section>

        </div>
    </section>
    <section id="Footer" class="row">

    </section>
    <section id="Static" class="fixed">


        <section id="Navigation" data-ctr="Menu">
            <style>
                #Navigation{
                    padding: 1em;
                    background-color: #b9def0;
                }
                #Navigation nav>a{
                    display: block;
                }

            </style>
            <div class="fa fa-bars" data-id="btnMenu"></div>
            <div data-id="content">
                <div>
                    <nav>
                        <a href="#SearchDirectories">Search Directories</a>
                    </nav>
                </div>
                <div>
                    <h5>Info Pages</h5>
                    <nav data-id="listP">

                    </nav>
                </div>

                <div>
                    <h5>Listing Categories</h5>
                    <nav data-id="listC">

                    </nav>
                </div>
            </div>

        </section>
    </section>
</div>

<script src="js/kiosk/Registry.js"></script>
<script src="js/kiosk/Connector.js"></script>
<script src="js/kiosk/search/models.js"></script>
<script src="js/mobile/InfoPage.js"></script>
<script src="js/mobile/FilterPage.js"></script>
<script src="js/mobile/Menu.js"></script>
<script src="js/mobile/DetailsPage.js"></script>
<script src="js/mobile/Main.js"></script>

</body>
</html>
