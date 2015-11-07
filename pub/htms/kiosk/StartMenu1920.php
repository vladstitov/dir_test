<section data-ctr="PagesMenu" class="row">
    <style>
        #btnSearch{
            font-size:100px;
            padding:20px;
            color:white;
            background-color:red;
        }

        #MenuList{
            height: 200px;
            overflow: hidden;
        }
        #MenuList  li.item {
            border-radius: 20px;
            margin: 12px 0 12px 0;
            padding: 12px;
            width: 98%;
            font-size: 30px;
        }
    </style>

    <div class="col-sm-1"></div>
    <div class="col-sm-6">
        <h3 class="text-center">
            <?= isset($labels['infopages'])?$labels['infopages']:'&nbsp;'; ?>
        </h3>
        <div>
            <div id="MenuList" class="nano" data-id="list">
            </div>
        </div>
    </div>
    <div class="col-sm-2"></div>
    <div class="col-sm-2">
        <h3 class="text-center">
            <?= isset($labels['btnSearch'])?$labels['btnSearch']:'&nbsp;'; ?>
        </h3>
        <div id="btnSearch" class="fa fa-search pull-right" >
            <div>
            </div>

        </div>
    </div>
    <div class="col-sm-1"></div>
</section>