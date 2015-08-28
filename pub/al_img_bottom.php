<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <script src="libs/jquery-2.1.0.min.js"></script>
    <script src="libs/svgjs.js"></script>
    <title></title>
    <link href="libs/reset.css" rel="stylesheet" />
    <style>

        #AttractLoop{
            width: 1080px;
            height: 1750px;
        }
        .cover{
            width: 100%;
            height: 100%;
            background-color: rgba(0,0,0,0.5);
      }
        #Touchclip{
            position: absolute;
            left: 0;
            bottom: 0;
            width: 1080px;
            height: 200px;
        }

    </style>
</head>
<body>
<div id="AttractLoop">
    <div class="cover">

        <div id="ImagesInCenter">
            <div>

            </div>

        </div>
    </div>
    <script src="js/kiosk/als/TouchClip.js"></script>
    <script src="js/kiosk/als/ImagesCenter.js"></script>

</div>
<script>
    $(document).ready(function(){
        var ts = new uplight.TouchClip();
        $('.cover').append(ts.view);
        ts.start();

    })

</script>
</body>
</html>