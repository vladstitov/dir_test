<?php
session_start();
if(!isset($_SESSION['directories_user']) || $_SESSION['directories_user']!='admin'){
	 // header( 'Location:DirectoriesLogin.html' ) ;
	  echo file_get_contents('DirLogin.html');
	  exit;
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
 <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="Admin panel">
    <meta name="author" content="ulight Vlad">
    <link rel="shortcut icon" href="favicon.ico" type="image/x-icon">
    <link rel="icon" href="favicon.ico" type="image/x-icon">

    <link href="js/lists/reset.css" rel="stylesheet" type="text/css"/>


    <script type="text/javascript" src="js/libs/jquery-2.1.0.min.js"></script>

   <!-- <script type="text/javascript" src="js/libs/bootstrap.min.js"></script>-->


<title>Interactive Directories Admin</title>

    <style>
        .umsg{
            position: absolute;
            z-index: 2000;
            background-color: ivory;
            padding: 0.3em;
            border-radius: 7px;
            box-shadow: 0 0 5px gray;

        }

        .abs{
            position:absolute;
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
    <h4 >Interactive Directory Admin Panel  <a id="btnLogout" data-id="btnLogout" class="btn pull-right"><span class="fa fa-user-times"></span> LogOut</a></h4>

</div>
<hr/>
    <div id="error"></div>
    <div id="content" class="container">
    </div>
<!-------------------------pREVIEW kIOSK----------------------------------------------------------------------->
<?php
    include ('htms/admin/AdminMenu.htm');
    include ('htms/admin/AdminPreviewKiosk.htm');
    include ('htms/admin/AdminPreviewMobile.htm');
?>

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

<div id="cover" class="cover">

</div>
<hr/>
<!-- -->
<link href="js/libs/font-awesome.css" rel="stylesheet" type="text/css"/>
<link href="js/libs/bootstrap.min.css" rel="stylesheet" type="text/css"/>
<!---->

<script type="text/javascript" src="js/libs/underscore-min.js"></script>
<script type="text/javascript" src="js/libs/nicEdit.js"></script>
<script type="text/javascript" src="js/libs/Chart.js"></script>
<!---->

<script src="js/admin/com/Utils.js"></script>
<script type="text/javascript" src="js/admin/RegA.js"></script>
<script type="text/javascript" src="js/admin/net.js"></script>
<script type="text/javascript" src="js/admin/models.js"></script>
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

<script type="text/javascript" src="js/admin/screen/LabelsManager.js"></script>

<script type="text/javascript" src="js/admin/destinations/DestinationsList.js"></script>
<script type="text/javascript" src="js/admin/destinations/DetailsCategory.js"></script>
<script type="text/javascript" src="js/admin/destinations/DetailsForm.js"></script>
<script type="text/javascript" src="js/admin/destinations/DestinationsController.js"></script>
<script type="text/javascript" src="js/admin/destinations/DetailsImages.js"></script>

<script type="text/javascript" src="js/admin/impexp/ImportExport.js"></script>
<script type="text/javascript" src="js/admin/impexp/Statistics.js"></script>
<script type="text/javascript" src="js/admin/info/InfoPagesEditor.js"></script>
<script type="text/javascript" src="js/admin/info/FrontPageEditor.js"></script>

<script type="text/javascript" src="js/admin/views/Menu.js"></script>

<script type="text/javascript" src="js/admin/DirsAdmin.js"></script>


    </body>
<script>
    $(document).ready(function(){
        var admin =  new uplight.Admin();
    })
</script>
</html>
