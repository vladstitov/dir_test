<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="description" content="Kiosk 1080">
    <meta name="author" content="Vlad">
	<title>Kiosk</title>
    <link href="css/reset.css" rel="stylesheet" />
    <link href="css/lightblue.css" rel="stylesheet" />
    <link href="css/kiosk1080.css" rel="stylesheet" />
    <link href="css/kiosk/mainview.css" rel="stylesheet" />
    <link href="css/font-awesome.css" rel="stylesheet" type="text/css"/>
    <!--
    <link href="css/KeyboardBlack.css" rel="stylesheet" type="text/css"/>
-->
    <script src="Scripts/jquery-2.1.0.min.js"></script>
    <script src="Scripts/svgjs.js"></script>
    <!--<script src="/Scripts/TweenMax.min.js"></script>
    <script src="/Scripts/easeljs-0.7.1.min.js"></script>-->
    <script type="text/javascript">

    </script>

    <!--<script src="js/kiosk/Kiosk.js"></script>-->

</head>
<body style="background-image: url('css/img/Directories%20Portrait%20White5.jpg')">
<div id="container">
    <section id="u-header" class="main-color">
        <div id="brand-logo" >
            <img src="data/images/logo.png" />
        </div>
        <div id="brand-name" >
                Business Directories
        </div>
        <div id="brand-more">
            <div id="Clock">
            </div>

        </div>
        <p id="brand-slogan">
                Company slogan goes here
        </p>
    </section>


    <section id="mainview">
        <div id="mainport" class="mainbg u-glow">
            <div class="view-port">
                <section id="list-header">
                    <div id="list-header-main">
                        Tenants and People Listing
                    </div>
                </section>
                <hr/>
                <section id="list-main">
                    <div id="list-main-main">
                        <div id="the-list">
                            <ul id="scroll-list">
                                <li class="Plastic031">
                                    <div class="icon"><span class="fa fa-briefcase"></span></div>
                                    <div class="more"><span class="fa fa-plus"></span> </div>
                                    <div class="name">Tenant Name 1 has letter in name</div>
                                    <div class="unit">1202</div>
                                    <div class="unittype">unit</div>
                                    <div class="keywords"></div>
                                    <div class="info"></div>
                                </li>
                                <li class="Plastic031">
                                    <div class="icon"><span class="fa fa-briefcase"></span></div>
                                    <div class="more"><span class="fa fa-plus"></span> </div>
                                    <div class="name">Tenant Name</div>
                                    <div class="unit">308</div>
                                    <div class="unittype">unit</div>
                                    <div class="keywords"></div>
                                    <div class="info"></div>

                                </li>
                                <li class="Plastic031">
                                    <div class="icon"><sapan class="fa fa-user"></sapan></div>
                                    <div class="more"> </div>
                                    <div class="name">Person name</div>
                                    <div class="unit">
                                       608
                                    </div>
                                    <div class="unittype">unit</div>
                                    <div class="keywords"></div>
                                    <div class="info">Smail infor available here</div>
                                </li>
                                <li class="Plastic031">
                                    <div class="icon"><span class="fa fa-briefcase"></span></div>
                                    <div class="more"><span class="fa fa-plus"></span> </div>
                                    <div class="name">Tenant Name 1 has letter in name</div>
                                    <div class="unit">743</div>
                                    <div class="unittype">unit</div>
                                    <div class="keywords"></div>
                                    <div class="info"></div>
                                </li>
                                <li  class="Plastic031">
                                    <div class="icon"><span class="fa fa-briefcase"></span></div>
                                    <div class="more"> </div>
                                    <div class="name">Name has keyword</div>
                                    <div class="unit">121</div>
                                    <div class="unittype">unit</div>
                                    <div class="keywords">word</div>
                                    <div class="info"></div>
                                </li>
                                <li class="Plastic031">
                                    <div class="icon"><span class="fa fa-briefcase"></span></div>
                                    <div class="more"><span class="fa fa-plus"></span> </div>
                                    <div class="name">Tenant Name 1 has keyword</div>
                                    <div class="unit">1002</div>
                                    <div class="unittype">unit</div>
                                    <div class="keywords">word</div>
                                    <div class="info"></div>
                                </li>
                                <li class="Plastic031">
                                    <div class="icon"><span class="fa fa-briefcase"></span></div>
                                    <div class="more"><span class="fa fa-plus"></span> </div>
                                    <div class="name">Tenant Name 1 has letter in name</div>
                                    <div class="unit">806</div>
                                    <div class="unittype">unit</div>
                                    <div class="keywords">word3</div>
                                    <div class="info"></div>
                                </li>
                                <li class="Plastic031">
                                    <div class="icon"><sapan class="fa fa-user"></sapan></div>
                                    <div class="more"><span class="fa fa-plus"></span> </div>
                                    <div class="name">Person Name has keyword</div>
                                    <div class="unit">451</div>
                                    <div class="unittype">unit</div>
                                    <div class="keywords">word2</div>
                                    <div class="info"></div>
                                </li>

                            </ul>
                        </div>
                    </div>

                </section>
                <hr/>
                <section id="list-footer">
                    <div id="list-footer-main">
                        <div class="more">( <span class="fa fa-plus"></span> More Info Available ) </div>
                        <div id="searchinput">
                            <input type="text" class="Plastic031" />
                            <div class="icon"><span class="fa fa-search"></span></div>
                        </div>

                    </div>
                </section>

            </div>
        </div>

    </section>
    <section id="sideview">
        <hr/>
        <div id="toolsview" class="mainbg">
            <div class="view-port">
                <section class="view2">
                    <div id="Keyboard" data-js="Keyboard">
                    </div>
                </section>
                <section class="view1">
                    <div id="Categories">
                        <ul>
                            <li>
                                <div><input type="checkbox" /></div>
                                <div class="icon fa fa-briefcase"></div>
                                <div class="name">Tenats</div>
                            </li>
                            <li>
                                <div><input type="checkbox" /></div>
                                <div class="icon fa fa-user"></div>
                                <div class="name">People</div>
                            </li>
                        </ul>
                    </div>
                </section>

                <section class="view3">
                    <div id="keywords">
                        <div id="kw-container">
                            <ul class="nano-content">
                                <li>kwyword     </li>
                                <li>kwyword     </li>
                                <li>kwyword     </li>
                                <li>kwyword     </li>
                                <li>kwyword     </li>
                                <li>kwyword     </li>
                                <li>kwyword     </li>
                                <li>kwyword     </li>
                                <li>kwyword     </li>
                                <li>kwyword     </li>
                                <li>kwyword     </li>
                                <li>kwyword     </li>
                                <li>kwyword     </li>
                                <li>kwyword     </li>
                                <li>kwyword     </li>
                                <li>kwyword     </li>
                                <li>kwyword     </li>
                                <li>kwyword     </li>
                                <li>kwyword     </li>
                                <li>kwyword     </li>
                                <li>kwyword     </li>
                                <li>kwyword     </li>
                                <li>kwyword     </li>
                                <li>kwyword     </li>
                            </ul>
                        </div>
                    </div>
                </section>
            </div>
        </div>
        <hr/>
    </section>
<section id="footer">
            Address
</section>
</div>

<div id="History" style="display:none;"></div>

<script src="js/kiosk/Registry.js"></script>
<script src="js/kiosk/Connector.js"></script>
<script src="js/kiosk/models.js"></script>

<link href="css/kiosk/Keyboard.css" rel="stylesheet" />
<script src="js/kiosk/KeyboardSimple.js" ></script>

<script src="js/kiosk/KeyboardView.js" ></script>
<script src="js/kiosk/SearchResult.js"></script>
<script src="js/kiosk/InfoPage.js"></script>
<script src="js/kiosk/Menu.js"></script>

<script src="js/kiosk/MainView.js"></script>
<script src="js/kiosk/Details.js"></script>
<script src="js/kiosk/ScreenSaver.js"></script>
<script src="js/kiosk/Banner.js" ></script>
<script src="js/kiosk/Kiosk.js" ></script>

</body>
</html>
