<?php
$sett=$_GET['settings'];

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <script src="libs/jquery-2.1.0.min.js"></script>
    <script src="libs/svgjs.js"></script>
    <title></title>
    <link href="libs/reset.css" rel="stylesheet" />
	<script>
	var u_settings = <?php echo file_get_contents('data/'.$sett); ?>
	</script>

</head>
<body>
<div id="AttractLoop">
    <div  class="cover" data-id="Body">
    </div>
    <link href="js/kiosk/als/AttractLoop.css" rel="stylesheet" />
    <script src="js/kiosk/als/AttractLoop.js"></script>

</div>
<script>
    $(document).ready(function(){
	
	var al = settings.attract_loop;
	
        var ts = new uplight.AttractLoop();
       

    })

</script>
</body>
</html>