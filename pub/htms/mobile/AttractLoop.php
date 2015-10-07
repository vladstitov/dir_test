<?php
$sett='settings.json';
if(isset($_GET['settings']))$sett=$_GET['settings'];


?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <script src="js/libs/jquery-2.1.0.min.js"></script>
    <script src="js/libs/svgjs.js"></script>
    <title></title>
    <link href="js/lists/reset.css" rel="stylesheet" />
	<script>
	var u_settings = <?php echo file_get_contents('../data/'.$sett); ?>
	</script>

</head>
<body>
<div id="AttractLoop">
    <div  class="cover" data-id="Body">
    </div>
    <link href="js/kiosk/als/AttractLoop.css" rel="stylesheet" />
    <script src="js/kiosk/Registry.js"></script>
    <script src="js/kiosk/als/AttractLoop.js"></script>

</div>
<script>
    $(document).ready(function(){
        u_settings.props.forEach(function(vo){
            u_settings[vo.id] = vo.value;
        })
        var ts = new uplight.AttractLoop($('#AttractLoop'),u_settings.attract_loop);

    })

</script>
</body>
</html>