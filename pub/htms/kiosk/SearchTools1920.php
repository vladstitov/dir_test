<section id="SearchView" class="row">
    <style>
        #sideview h3{
            color: #9d9d9d;
        }

        #SearchView h3>a{
            padding: 12px;
            border-radius: 12px;
        }
        #Categories{
            margin-left: 2em;
        }
        #kw-container{
            float: right;
            height:270px ;
            width: 150px;
            overflow-y: auto;
            margin-right: 50px;

        }
        #kw-container li>a{
            width: 100%;
            text-align: left;
            /* text-decoration: underline;*/
            /*  margin: 0.5em;*/
            /*  border-bottom: thin #f8f8f8 solid;*/

        }
    </style>
   <!-- <section class="col-sm-3">
        <div id="Categories">

            <h3>
                <?= isset($labels['categories'])?$labels['categories']:'Categories'; ?>
            </h3>

        </div>
    </section>-->
    <section class="col-sm-12 text-center">
        <h3 class="text-center">
        <?= isset($labels['keyboard'])?$labels['keyboard']:'&nbsp;'; ?>
    </h3>

        <div class="col-sm-10">
        <? include('htms/kiosk/SearchInput.php'); ?>
            <style>
                #searchinput .fa-times-circle{
                    top:10px;
                    right: 0;
                }
                #searchinput input {
                    border-radius: 10px;
                    font-size: 30px;
                    width: 400px;
                    border: none;
                     padding: 5px 5px 5px 5px;
                    margin-right: -20px;
                }
            </style>
       </div>
        <div class="col-sm-2">
            <button class="btn btn-danger" data-id="btnClose">x

            </button>
        </div>
        <div id="Keyboard" data-js="Keyboard" class="text-center">
        </div>
    </section>
</section>