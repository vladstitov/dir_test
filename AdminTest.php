<?php
session_start();
if(!isset($_SESSION['directories_user']) || $_SESSION['directories_user']!='admin'){
	 // header( 'Location:DirectoriesLogin.html' ) ;
	  echo file_get_contents('DirectoriesLogin.html');
	  exit;
}
?>
<!DOCTYPE html>
<html>
<head>
 <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="Admin panel">
    <meta name="author" content="ulight Vlad">
    <link href="libs/reset.css" rel="stylesheet" type="text/css"/>

    <link href="libs/font-awesome.css" rel="stylesheet" type="text/css"/>

<script type="text/javascript" src="libs/jquery-2.1.0.min.js"></script>
    <script type="text/javascript" src="libs/underscore-min.js"></script>

    <script type="text/javascript" src="libs/nicEdit.js"></script>
    <script type="text/javascript" src="libs/Chart.js"></script>

    <link href="libs/bootstrap.min.css" rel="stylesheet" type="text/css"/>
    <script type="text/javascript" src="libs/bootstrap.min.js"></script>

<script type="text/javascript" src="js/admin/RegA.js"></script>
<script type="text/javascript" src="js/admin/net.js"></script>  
<script type="text/javascript" src="js/admin/models.js"></script>
<title>Interactive Directories Admin</title>

    <style>
        .umsg{
            position: absolute;
            z-index: 1000;
            background-color: ivory;
            padding: 0.3em;
            border-radius: 7px;
            box-shadow: 0 0 5px gray;

        }
        #menubar{
            position: absolute;
            left:0.5em;
            top: 2em;
        }
        #menubar section{
          margin: 0 1em 0 1em;
        }
        #menubar section:last-child{
            margin-bottom: 1em;
        }
        #menubar .navbar-link{
            display: block;
        }
        #menubar .fa-bars{
           font-size: 2em;

        }
        .cover{
            background-color: rgba(0,0,0,0.5);
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
            left: 0;
            display: none;
        }

       /* #Preview{
            position: absolute;
            width: 100%;
            height: 100%;
        }*/
       /* #Preview>div{
            width: 560px;
            height: 970px;
            margin: auto;
            left: 0;
            right: 0;
        }*/

        /*    colors      */
        #menubar{
            background-color: white;
            /*border-radius: 1em;*/
        }
        #adminHeader{
            text-align: center;
        }
        .item.selected{
            background-color:khaki !important;
        }

        #Message{
            position: relative;
            z-index: 100;

        }
        #Message>div{
            background-color:#FFEFD5;
            padding: 0.5em;
            font-size: 0.7em;
            border-radius: 5px;
            position: absolute;

        }
        .border{
            border: 1px solid #ccc;
            border-radius: 4px;
        }
        .inline{
            display: inline-block;
        }
        .disabled{
            opacity: 0.5;
        }

    </style>
</head>
<body>


<div id="adminHeader" >
    <h4 >Interactive Directory Admin Panel  <a class="btn pull-right">LogOut</a></h4>

</div>
<hr/>
<?php

/*
$xml = simplexml_load_file('admin/Menu.html');

$result = $xml->xpath('//li');

foreach($result as $node){
$str =(string) $node;;
$node[0]='';
$a = $node->addChild('a',$str);
$a->addAttribute('href','#Menu-'.urlencode ($str));
}
echo $xml->asXML();
*/
include ('admin/Menu.html');
?>


<div id="error"></div>
		<div id="content" class="container">

 <!------------------------------------------------------------------------------------------------>
	  </div>
<div id="Preview" class="view">
    <style>
        #Preview .table-bordered{
            padding: 0.5em;
            width: 560px;
            height: 1020px;
            margin: auto;
            left: 0;
            right: 0;
            text-align: center;
            overflow: hidden;

        }

        #Preview iframe{
             -ms-zoom: 0.5;
              -moz-transform: scale(0.5);
              -moz-transform-origin: 0 0;
              -o-transform: scale(0.5);
              -o-transform-origin: 0 0;
              -webkit-transform: scale(0.5);
              -webkit-transform-origin: 0 0;
            width: 1080px;
            height: 1920px;

        }

    </style>
    <div class="table-bordered">
        <a data-id="btnFullView"  class="btn pull-right"><span class="fa fa-external-link"></span><span> Open full view</span></a>
        <h4>Kiosk view</h4>
        <div class="viewport">
            <iframe src="" scrolling="no" frameborder="0">


        </iframe>
        </div>
    </div>
</div>
	  <!------ End of Content---->
			 
		 <!--start Alert -->

		<div id="myAlert" style="display:none;">
			<div id="alertContainer">
				<h3 id="alertTitle">Alert</h3>
			<div id="alert_msg">Do you vant to save Background on server?  </div>
			<div id="alertbuttons">
				<button data-id="yes">Yes</button>
				<button >Cancel</button>
			</div>
		  </div> 
		</div>
<div id="menubar" class="opened table-bordered"></div>
<div id="cover" class="cover">

</div>
<hr/>
<script type="text/javascript" src="js/admin/com/GalleryAdmin.js"></script>
<script type="text/javascript" src="js/admin/screen/SettingsEdit.js"></script>
<script type="text/javascript" src="js/admin/screen/RestartKiosk.js"></script>
<script type="text/javascript" src="js/admin/screen/AttractLoopEdit.js"></script>

<script type="text/javascript" src="js/admin/categories/CategoryForm.js"></script>
<script type="text/javascript" src="js/admin/categories/CategoryListing.js"></script>
<script type="text/javascript" src="js/admin/categories/CategoryList.js"></script>
<script type="text/javascript" src="js/admin/categories/CategoryInListing.js"></script>
<script type="text/javascript" src="js/admin/categories/CategoriesList.js"></script>
<script type="text/javascript" src="js/admin/categories/CategoryNotListing.js"></script>
<script type="text/javascript" src="js/admin/categories/CategoriesManager.js"></script>

<script type="text/javascript" src="js/admin/labels/LabelsManager.js"></script>

<script type="text/javascript" src="js/admin/details/DetailsList.js"></script>
<script type="text/javascript" src="js/admin/details/DetailsCategory.js"></script>
<script type="text/javascript" src="js/admin/details/DetailsForm.js"></script>
<script type="text/javascript" src="js/admin/details/DetailsEditor.js"></script>
<script type="text/javascript" src="js/admin/details/DetailsImages.js"></script>

<script type="text/javascript" src="js/admin/impexp/ImportExport.js"></script>
<script type="text/javascript" src="js/admin/impexp/Statistics.js"></script>



<script type="text/javascript" src="js/admin/Menu.js"></script>

<script type="text/javascript" src="js/admin/DirsAdmin.js"></script>


    </body>
<script>
    $(document).ready(function(){
        var admin =  new uplight.Admin();
    })
</script>
</html>
