<!--Main Navigation -->


<section id="Navigation" data-ctr="Menu"   class="" >

    <div id="Menu"   class="navbar-fixed-top">



        <style>

          /*  #Navigation.navbar{
              background-color: rgba(27, 73, 255, 0.34);
            }*/
          #Navigation{
              width: 0;
              height: 0;
          }

            #Navigation nav>a{
                display: block;
            }
            #Navigation #Menu{
                background-color: white;

                display: inline-block;
                width: 250px;
                top: 50px;
              /*  position: absolute;*/
                box-shadow: 5px 5px 5px #666;
                -webkit-transition: left 0.7s;
                transition: left 0.7s;
                left: 0;
            }

          #Navigation #Menu .content{
              padding: 1em;


          }
          #Navigation #Menu.closed{
              left:-270px;
          }



        </style>
       <!-- <div id="buttonMenu" class="pull-right">
            <div  data-id="btnMenu"><span class="fa fa-bars">&nbsp;</span></div>
        </div>-->
        <a href="#menuclose" class="btn fa fa-close pull-right" data-id="btnClose"></a>
        <div class="content" data-id="content">
            <div>
                <nav>
                    <a href="#SearchDirectories">Search Directories</a>
                </nav>
            </div>
            <div>
                <h5>Info Pages</h5>
                <nav data-id="listP" class="list-group">

                </nav>
            </div>

            <div>
                <h5>Listing Categories</h5>
                <nav data-id="listC" class="list-group">

                </nav>
            </div>
        </div>

        <button class="btn btn-default pull-right" style="margin: 0.5em; margin-top: -20px;" data-id="btnClose">Close</button>

    </div>
    <style>
        #Banner{
            width: 100%;

        }
        #Banner .btn-primary{
            margin-right: 15px;
        }
        #Banner button{
            font-size: 1.5em;
        }
        #Banner .logo{
            max-height: 40px;
            margin: 5px;
        }
        #Banner .slider{
            height: 30px;
            overflow-y: hidden;
        }
        #Banner .slider .item{
            height: 30px;
           line-height: 30px;
        }

    </style>
    <table id="Banner" class="main-color navbar-fixed-top">
        <tr>
            <td >
                <?= isset($labels['logo'])?'<a href="#logo" ><img class="logo"  align="middle" src="'.$labels['logo'].'" /></a>':''; ?>
            </td>
            <td class="text-center" >
                <div class="slider" data-id="SearchSlider" >
                    <div class="slider-content">
                        <a data-id="header" class="item" href="#gmap">
                            <?= isset($labels['header'])?'<span class="header" >'.$labels['header'].' </span>':''; ?>
                        </a>

                            <div class="item">
                                <input type="text" size="3" data-id="tiSearch" />
                                <a data-id="btnSearchClose"><span class="fa fa-close"></span> Close</a>
                            </div>


                    </div>
                </div>
            </td>
            <td >


                <button type="button" class="btn-primary  pull-right" data-id="btnMenu">
                    <span class="fa fa-bars">&nbsp;</span>
                </button>
                <button type="button" class="btn-success pull-right" data-id="btnSearch">
                    <span class="fa fa-search">&nbsp;</span>
                </button>

            </td>
        </tr>

    </table>
</section>
