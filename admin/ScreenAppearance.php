<?php
$listing= scandir('../css');
$css='';
foreach($listing as $file){
    if(substr($file,0,5)=='theme'){
        $css.=extreactCSS($file,'../css/')."\n\r";
    }

}
echo '<style type="text/css">'.$css.'</style>';

function extreactCSS($file,$dir){
    $theme ='.u-brand'.substr($file,5,-4);
    $css=file_get_contents($dir.$file);
    return $theme.strstr($css,'{');
}
?>


<link id="Theme"  rel="stylesheet" type="text/css"/>
<link    rel="stylesheet" type="text/css"/>
<style type="text/css">

#listDestinations{
	left:50px;
	top:200px;
	display:block;
	height:700px;		
	width: 700px;
	overflow-y: scroll;
	overflow-x: hidden;	
}
#listManu{
	left:1200px;
	top:200px;
	display:block;
	height:400px;		
	width: 500px;
	overflow-y: scroll;
	overflow-x: hidden;	
}
#imageLibraryHolder img{
   width:120px;
   height:80px;  
}
img .selected{
	background-color:#FFC;
}
#screenvp{
	-moz-transform: scale(0.5);
-ms-transform: scale(0.5);
-o-transform: scale(0.5);
-webkit-transform: scale(0.5);
transform: scale(0.5);
	border:1px #999 solid;
	box-shadow: 5px 5px 5px #888888;
	position:relative;
	top:-260px;
	left:-480px;	
	width:1920px;
	height:1080px;
}

#screenvp >*{
	position:absolute;
}


#screenvp li{
	padding:15px 15px 15px 25px;
	text-align:left;
	height: 35px;
	vertical-align: middle;
	margin-bottom: 30px;
	list-style-type: none;
	font-size: x-large;
	font-family: Verdana, Geneva, sans-serif;
	text-decoration: none;
	width: 95%;
   border-radius:5px;
	 border: 1px solid white;   
	/*text-align:center;*/  
	box-shadow: 1px 1px 3px #000000;
}
#bgEditor form{
	display:inline;
}

.tools{
	z-index:1000;
}
.tools>div{
	display:inline-block;
}
.current{
	border:thin #F00 solid;
}
#SearchButton {
    position: absolute;
    width: 120px;
    height: 120px;
    left: 1400px;
    top: 700px;
    background: rgb(169,3,41);
    background: -moz-linear-gradient(top, rgba(169,3,41,1) 0%, rgba(143,2,34,1) 44%, rgba(109,0,25,1) 100%);
    background: -webkit-gradient(linear, left top, left bottom, color-stop(0%,rgba(169,3,41,1)), color-stop(44%,rgba(143,2,34,1)), color-stop(100%,rgba(109,0,25,1)));
    background: -webkit-linear-gradient(top, rgba(169,3,41,1) 0%,rgba(143,2,34,1) 44%,rgba(109,0,25,1) 100%);
    background: -o-linear-gradient(top, rgba(169,3,41,1) 0%,rgba(143,2,34,1) 44%,rgba(109,0,25,1) 100%);
    background: -ms-linear-gradient(top, rgba(169,3,41,1) 0%,rgba(143,2,34,1) 44%,rgba(109,0,25,1) 100%);
    background: linear-gradient(to bottom, rgba(169,3,41,1) 0%,rgba(143,2,34,1) 44%,rgba(109,0,25,1) 100%);
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#a90329', endColorstr='#6d0019',GradientType=0 );
    border-radius: 10px;
    border: 5px solid rgb(143,2,34);
    display: table;
    text-align: center;
    line-height: 120px;
    vertical-align: middle;
    color: white;
    }

#bannerVP{
	width:1920px;
	height:200px;
}
#bannerVP>*{
	position:absolute;
}
#ScreenSaver{
	font-family:Arial, Helvetica, sans-serif;
	position:absolute;
	width:1920px;
	height:1080px;
	top:0;
	left:0;
}

#TouchClip{
	background-color:rgba(0,0,0,0.5);
	font-family:Arial, Helvetica, sans-serif;
	position:absolute;
	left:0;
	bottom:0;
	width:100%;
	height:150px;
	text-align:center;
	color:rgba(255,255,255,0.8);
	font-size:xx-large;
	
}
#screensaverPanel>div{
	display:inline-block;
	margin-left:10px;
	border:thin #FFF solid;
}
 #floatpanel{
		  position:relative;
		  left:0;
		 	
  }
  #floatpanel>div{
	   position:absolute;
	    left:-200px;;
		top:20px;
	   z-index:1000;
	   background-color:#FFF;
	 
	  border:#CCC thin solid;
	  border-radius:5px;
	  text-align:center;
   }
   
   .btnClose{
	   position:absolute;
	   top:10px;
	   right:10px;
   }
   #HeaderBanner {
	width: 100%;	
	height: 200px;
}
   #HeaderBanner>div:first-child{
	position:absolute;
	left:35%;
	right:35%;
	top:50px;
	text-align:center;
	font-size:36px;
	height:1.3em;
	padding:10px;	
	
}

 
</style>
<div id="ScreenAppearance" class="page">
	<div class="view" id="backgroundLibrary" style="display: none;" >
        <div class="tools" data-id="menu1">
          <a href="javascript:void(0)" class="uplight" title="Import a new image into library" data-id="btnAdd" > <img  src="css/icons/plus.png" />Add </a>
           <a href="javascript:void(0)" class="uplight"  data-id="btnDel" title="Delete image from  library" > <img src="css/icons/minus.png" />Delete</a>
        </div>
        
        <h5>Background Library</h5>          
        <ul id="imageLibraryHolder" class="uplight" style=" width:160px; height:515px;"></ul>                        
                   
    </div>
 
        <div id="screenEditor" class="view" style="width:970px; height:635px;">
            <div class="tools">                  
                   <div id="controls">  
                  <a href="javascript:void(0)" class="uplight"  data-id="btnEditBG" title="Edit Background"> <img src="css/icons/edit.png"  />Background</a> 
                   <a href="javascript:void(0)" class="uplight"  data-id="btnBanner" title="Edit Header"> <img src="css/icons/edit.png"  />Header</a> 
                  <a href="javascript:void(0)" class="uplight"  data-id="btnEditSS" title="Edit Screen saver"> <img src="css/icons/edit.png"  />Screen Saver</a> 
                   <a href="javascript:void(0)" class="uplight"  data-id="btnColor" title="Edit Color Theme"> <img src="css/icons/edit.png"  />Color Theme</a>
                       <a href="javascript:void(0)" class="uplight"  data-id="btnON_OFF" title="Edit ON OFF Screen"> <img src="css/icons/edit.png"  />ON - OFF</a>
                   </div>
                    <div id="divPanel"></div>
                    <!--<a href="javascript:void(0)" class="uplight"  data-id="btnClose" title="Close"> <img src="css/icons/close.png"  /></a>-->
            </div>
            
            <h5>Screen Appearance</h5>  
        <div id="screenvp" >                    
            <img  id="bgImage" width="100%" height="100%"/> 
            <div id="HeaderBanner" >
            	 <div data-id="title" class="u-brand"></div>
                 
            </div>
            <ul id="listDestinations"></ul>
            <ul id="listManu"></ul>
            <div id="SearchButton">Search</div>
            <iframe id="ScreenSaver">
            </iframe>     
        </div> 
                                           
       </div> 
       
          
<!--<form id="formImageUpload" enctype="multipart/form-data"  >                      
                                <input data-id="myFile" name="file" type="file" title="Choose file on local filesystem" />
                                <input data-id="btnUpload" type="button" value="Upload" title="Upload image on server" />
                                  <progress ></progress>
  </form>-->
  <div id="screensaverPanel">

   			<a href="javascript:void(0)" class="uplight"  data-id="btnSave" title="Save changes on server"> <img data-id="btnSave" src="css/icons/save.png"  />Save</a> 
            <div>Delay: <b data-id="delay"></b>sec.<img  data-id="btnUpdown" class="uplight" src="css/icons/updown.png" /></div> 
            <input type="radio" data-id="btnMessage" name="mymode"/>Messages 
            <input type="radio" data-id=btnRSS name="mymode"/> RSS: <span data-id="lblRSS"></span> 
           <a href="javascript:void(0)" class="uplight"  data-id="btnEdit" title="Edit Content"> <img data-id="btnEdit" src="css/icons/edit.png"  /><span data-id="btnEdit"></span> </a>
            <a href="javascript:void(0)" class="uplight"  data-id="btnClose" title="Close"> <img  data-id="btnClose" src="css/icons/close.png"  /></a>
           <div id="floatpanel"></div> 
  </div>
  
  
  
   <div id="msgsEditor" class="myPanel">
  <h3 class="uplight">Edit Messages</h3>
   
     <a href="javascript:void(0)" class="btnClose"  data-id="btnCloseMsg" title="Close"> <img data-id="btnCloseMsg" src="css/icons/close.png"  /></a>
              <div class="content" style="text-align:left;">
              <a href="javascript:void(0)" class="uplight"  data-id="btnSaveMsgs" title="Save changes on server"> <img data-id="btnSaveMsgs" src="css/icons/save.png"  />Save</a>
   <textarea rows="20" cols="80"></textarea>
   </div>
  </div>



  <div id="rssEditor" class="myPanel">
  <h3 class="uplight">Edit RSS feed</h3>
               <a href="javascript:void(0)" class="btnClose"  data-id="btnCloseRss" title="Close"> <img data-id="btnCloseRss" src="css/icons/close.png"  /></a>
              <div class="content">
             <select style="width:150px;" data-id="selRSS"></select>  
               <table style="text-align:left;" id="rssValues" width="100%" border="0" cellspacing="5" cellpadding="5">
                 <tr>
                   <td>Name</td>
                   <td><input data-id="tiName" type="text" placeholder="RSS name" /></td>
                 </tr>
                 <tr>
                   <td>URL</td>
                   <td><input style="width:250px;" data-id="tiURL" type="text"  placeholder="RSS URL"/></td>
                 </tr>
                  <tr>
                   <td></td>
                   <td> </td>
                 </tr>
               </table> 
             
                <a href="javascript:void(0)" class="uplight" title="Click Add, Fill in form, Click save after" data-id="btnAddRSS" > <img data-id="btnAddRSS" src="css/icons/plus.png" />Add </a>
                      
                       <a href="javascript:void(0)" class="uplight"  data-id="btnDelRSS" title="Delete RSS, Click save after" > <img data-id="btnDelRSS" src="css/icons/minus.png" />Delete</a>  
                         <a href="javascript:void(0)" class="uplight"  data-id="btnSaveRSS" title="Save changes on server"> <img data-id="btnSaveRSS" src="css/icons/save.png"  />Save</a>
  </div>
 </div>   
  
</div>
 <script type="text/javascript" src="js/admin/screen/BackgroundManager.js"></script>
 <script type="text/javascript" src="js/admin/screen/ScreenSaverManager.js"></script>
  <script type="text/javascript" src="js/admin/screen/ColorTheme.js"></script>
  <script type="text/javascript" src="js/admin/screen/HeaderEditor.js"></script>
<script type="text/javascript" src="js/admin/screen/ONOFFScreen.js"></script>

  <script type="text/javascript" src="js/admin/screen/ScreenAppearance.js"></script>

 
 <!------------------End of Background Manager ----->